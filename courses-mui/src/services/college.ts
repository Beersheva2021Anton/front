import CourseType from "../models/course-type";
import CoursesService from "./courses-service";
import { Observable } from "rxjs";
import courseData from "../config/course-data.json";
import { getRandomInteger } from "../utils/random";
import IntervalType from "../models/interval-type";
import _, { Dictionary } from "lodash";

export default class College {

    constructor(private coursesService: CoursesService) { }

    async addCourse(course: CourseType): Promise<CourseType> {
        course.id = await this.generateUniqueId();
        return this.coursesService.add(course);
    }

    private async generateUniqueId(): Promise<number> {
        while(true) {
            const id = getRandomInteger(courseData.minId, courseData.maxId);
            const isExist = await this.coursesService.exists(id);
            if (!isExist) {
                return id;
            }
        }
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

    publishCourses(): Observable<CourseType[]> {
        return this.coursesService.publish();
    }

    async getStatisticsByHours(interval: number): Promise<IntervalType[]> {
        const courses = await this.getAllCourses();
        const dictCount = _.countBy(courses, c => {
            return Math.floor(c.hoursNum/interval) * interval;
        })
        return this.getInterval(dictCount, interval);
    }

    async getStatisticsByCost(interval: number): Promise<IntervalType[]> {
        const courses = await this.getAllCourses();
        const dictCount = _.countBy(courses, c => {
            return Math.floor(c.cost/interval) * interval;
        })
        return this.getInterval(dictCount, interval);
    }

    private getInterval(dict: Dictionary<number>, interval: number): IntervalType[] {
        let res: IntervalType[] = [];
        for (let key in dict) {
            const min = +key;
            const max = +key + interval - 1;
            const count = dict[key];
            res.push({ min: min, max: max, count: count});
        }
        return res;
    }
}