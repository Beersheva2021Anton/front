import CourseType from "../models/course-type";
import CoursesService from "./courses-service";
import courseData from "../config/course-data.json"
import { Observable } from "rxjs";
import { AUTH_TOKEN } from "./courses-service-rest";

export default class College {

    constructor(private coursesService: CoursesService) { }

    validateCourse(course: CourseType): string {
        let res: string[] = [];
        if (course.id < courseData.minId || course.id > courseData.maxId) {
            res.push(`Incorrect id: ${course.id}`);
        }
        if (courseData.courseNames.indexOf(course.name) === -1) {
            res.push(`Incorrect name: ${course.name}`);
        }
        if (course.hoursNum < courseData.minHours || course.hoursNum > courseData.maxHours) {
            res.push(`Incorrect hours number: ${course.hoursNum}`);
        }
        if (course.cost < courseData.minCost || course.cost > courseData.maxCost) {
            res.push(`Incorrect cost: ${course.cost}`);
        }
        if (courseData.lecturers.indexOf(course.lecturer) === -1) {
            res.push(`Incorrect lecturer: ${course.lecturer}`);
        }
        if (courseData.types.indexOf(course.type) === -1) {
            res.push(`Incorrect type: ${course.type}`);
        }
        const year = course.startAt.getFullYear();
        if (year < courseData.minYear || year > courseData.maxYear) {
            res.push(`Incorrect year in date: ${year}`);
        }
        if (course.dayEvening.length === 0 ||
            course.dayEvening.length > courseData.timing.length) {
            res.push(`Incorrect set: [${course.dayEvening.join(', ')}]`);
        }
        course.dayEvening.forEach(t => {
            if (!courseData.timing.includes(t)) {
                res.push(`Incorrect value of timing: ${t}`);
            }
        })
        return res.join('\r\n');
    }

    async addCourse(course: CourseType): Promise<CourseType> {
        let validationRes = this.validateCourse(course);
        if (validationRes) {
            console.log(validationRes);
            throw new Error(validationRes);
        }
        return this.coursesService.add(course)
            .then(c => {
                this.getAllCourses();
                return c;
            });
    }

    async removeCourse(id: number): Promise<CourseType> {
        let isExists = await this.coursesService.exists(id);
        if (isExists) {
            return this.coursesService.remove(id);
        } else {
            throw new Error(`Course with id: ${id} does not exist`);
        }
    }

    async updateCourse(id: number, course: CourseType): Promise<CourseType> { // returns old course
        let isExists = await this.coursesService.exists(id);
        if (isExists) {
            return this.coursesService.update(id, course);
        } else {
            throw new Error(`Course with id: ${id} does not exist`);
        }
    }

    async getCourse(id: number): Promise<CourseType> {
        let isExists = await this.coursesService.exists(id);
        if (isExists) {
            return this.coursesService.get(id) as Promise<CourseType>;
        } else {
            throw new Error(`Course with id: ${id} does not exist`);
        }
    }

    getAllCourses(): Promise<CourseType[]> {
        return this.coursesService.get() as Promise<CourseType[]>;
    }

    publishCourses(pollingInterval: number): Observable<CourseType[]> {
        return new Observable<CourseType[]>(subscriber => {
            const interval = setInterval(() => {
                try {
                    if (!!localStorage.getItem(AUTH_TOKEN)) {
                        this.getAllCourses().then(arr => subscriber.next(arr));
                    }
                } catch(err) {
                    subscriber.error(err);
                }
            }, pollingInterval);
            return () => clearInterval(interval);
        })
    }
}