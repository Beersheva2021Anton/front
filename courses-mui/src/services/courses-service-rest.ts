import CourseType from "../models/course-type";
import CoursesService from "./courses-service";

export const AUTH_TOKEN = "auth_token";

function getHeaders(): { Authorization: string, "Content-Type": string } {
    return { Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN),
        "Content-Type": "application/json" };
}

export default class CoursesServiceRest implements CoursesService {

    constructor(private url: string) {}

    getUrlId(id: number): string {
        return `${this.url}/${id}`;
    }

    add(course: CourseType): Promise<CourseType> {
        (course as any).userId = 1;
        try {
            return fetch(this.url, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(course)
            }).then(r => r.json()) as Promise<CourseType>;
        } catch {
            throw new Error('Server is unavailable');
        }
    }

    async remove(id: number): Promise<CourseType> {
        try {
            const oldCourse = await this.get(id);
            await fetch(this.getUrlId(id), {
                method: "DELETE",
                headers: getHeaders()
            });
            return oldCourse as CourseType;
        } catch {
            throw new Error('Server is unavailable');
        }
    }

    exists(id: number): Promise<boolean> {
        try {
            return fetch(this.getUrlId(id), {
                headers: getHeaders()
            })
                .then(r => r.ok) as Promise<boolean>;
        } catch {
            throw new Error('Server is unavailable');
        }
    }

    get(id?: number): Promise<CourseType[]> | Promise<CourseType> {
        try {
            return id === undefined 
                ? fetch(this.url, {
                    headers: getHeaders()
                }).then(r => r.json()) as Promise<CourseType[]>
                : fetch(this.getUrlId(id), {
                    headers: getHeaders()
                })
                    .then(r => r.json()) as Promise<CourseType>;
        } catch {
            throw new Error('Server is unavailable');
        }
    }

    async update(id: number, course: CourseType): Promise<CourseType> {
        try {
            const oldCourse = await this.get(id);
            await fetch(this.getUrlId(id), {
                method: "PUT",
                headers: getHeaders(),
                body: JSON.stringify(course)
            });
            return oldCourse as CourseType;
        } catch {
            throw new Error('Server is unavailable');
        }
    }    
}