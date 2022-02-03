import { Observable } from "rxjs";
import { authService } from "../config/service-config";
import CourseType from "../models/course-type";
import CoursesService from "./courses-service";

export const AUTH_TOKEN = "auth_token";
const pollingInterval: number = 2000;

function getHeaders(): { Authorization: string, "Content-Type": string } {
    return {
        Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN),
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

export default class CoursesServiceRest implements CoursesService {

    constructor(private url: string) { }

    getUrlId(id: number): string {
        return `${this.url}/${id}`;
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
        return new Observable<CourseType[]>(subscriber => {
            const interval = setInterval(() => {
                if (!!localStorage.getItem(AUTH_TOKEN)) {
                    this.get()
                        .then(arr => subscriber.next(arr as CourseType[]))
                        .catch(err => subscriber.error(err));
                }
            }, pollingInterval);
            return () => clearInterval(interval);
        })
    }
}