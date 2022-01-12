import CourseType from "../models/course-type";
import CoursesService from "./courses-service";

export default class CoursesServiceRest implements CoursesService {

    constructor(private url: string) {}

    getUrlId(id: number): string {
        return `${this.url}/${encodeURIComponent(id)}`;
    }

    add(course: CourseType): Promise<CourseType> {
        try {
            return fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(course)
            }).then(r => r.json()) as Promise<CourseType>;
        } catch {
            throw new Error('Server is unavailable');
        }
    }

    remove(id: number): Promise<CourseType> {
        try {
            return fetch(this.getUrlId(id), {
                method: "DELETE"
            }).then(r => r.json()) as Promise<CourseType>;
        } catch {
            throw new Error('Server is unavailable');
        }
    }

    exists(id: number): Promise<boolean> {
        try {
            return fetch(this.getUrlId(id)).then(r => r.ok) as Promise<boolean>;
        } catch {
            throw new Error('Server is unavailable');
        }
    }

    get(id?: number): Promise<CourseType[]> | Promise<CourseType> {
        try {
            return id === undefined 
                ? fetch(this.url).then(r => r.json()) as Promise<CourseType[]>
                : fetch(this.getUrlId(id)).then(r => r.json()) as Promise<CourseType>;
        } catch {
            throw new Error('Server is unavailable');
        }
    }

    update(id: number, course: CourseType): Promise<CourseType> {
        try {
            return fetch(this.getUrlId(id), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(course)
            }).then(r => r.json()) as Promise<CourseType>;
        } catch {
            throw new Error('Server is unavailable');
        }
    }    
}