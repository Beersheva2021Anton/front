import { CompatClient, Stomp } from "@stomp/stompjs";
import { Observable, Observer } from "rxjs";
import SockJS from "sockjs-client";
import { authService } from "../config/service-config";
import CourseType from "../models/course-type";
import CoursesService from "./courses-service";

function getHeaders(): { Authorization?: string, "Content-Type": string } {
    return {
        "Content-Type": "application/json"
    };
}

async function getResponse(url: string, method?: string, body?: string): Promise<Response> {
    const response = await fetch(url, {
        method: method ? method : 'GET',
        headers: getHeaders(),
        body: body
    });
    if (response.status === 401 || response.status === 403) {
        authService.logout();
        throw new Error('NOT_AUTHORIZED');
    }
    return response;
}

export default class CoursesServiceRestJava implements CoursesService {

    constructor(private url: string, private webSocketUrl: string) { }

    stompClient: CompatClient | undefined;
    coursesCache: Map<number, CourseType> = new Map();

    getUrlId(id: number): string {
        return `${this.url}/${id}`;
    }

    private fetchData(observer: Observer<CourseType[]>) {
        this.get().then(data => {
            (data as CourseType[]).forEach(course => this.coursesCache.set(course.id!, course));
            observer.next(Array.from(this.coursesCache.values()));
        }).catch(err => observer.error(err));
    }

    private connect(observer: Observer<CourseType[]>) {
        const webSocket = new SockJS(`${this.webSocketUrl}/websocket-courses`);
        this.stompClient = Stomp.over(webSocket);
        this.stompClient.connect({}, (frame: any) => {
            this.stompClient!.subscribe("/topic/courses", async message => {
                const messagingObj = JSON.parse(message.body);
                if (messagingObj.action === "added" || messagingObj.action === "updated") {
                    const course = await this.get(messagingObj.id) as CourseType;
                    this.coursesCache.set(course.id!, course);
                } else if (messagingObj.action === "removed") {
                    this.coursesCache.delete(messagingObj.id);
                }
                observer.next(Array.from(this.coursesCache.values()));
            });
        }, (err: any) => observer.error(err), () => observer.error("disconnect"));
    }

    private disconnect() {
        this.stompClient?.disconnect();
    }

    add(course: CourseType): Promise<CourseType> {
        (course as any).userId = 1; // depends on json-server-auth
        return getResponse(this.url, 'POST', JSON.stringify(course))
            .then(r => r.json()) as Promise<CourseType>;
    }

    async remove(id: number): Promise<CourseType> {
        const oldCourse = await this.get(id);
        await getResponse(this.getUrlId(id), 'DELETE');
        return oldCourse as CourseType;
    }

    exists(id: number): Promise<boolean> {
        return getResponse(this.getUrlId(id))
            .then(r => r.ok) as Promise<boolean>;
    }

    get(id?: number): Promise<CourseType | CourseType[]> {
        return id === undefined
            ? getResponse(this.url)
                .then(r => r.json()) as Promise<CourseType[]>
            : getResponse(this.getUrlId(id))
                .then(r => r.json()) as Promise<CourseType>;
    }

    async update(id: number, course: CourseType): Promise<CourseType> {
        const oldCourse = await this.get(id);
        await getResponse(this.getUrlId(id), 'PUT', JSON.stringify(course));
        return oldCourse as CourseType;
    }

    publish(): Observable<CourseType[]> {
        return new Observable<CourseType[]>(observer => {
            this.fetchData(observer);
            this.connect(observer);
            return () => this.disconnect();
        })
    }
}