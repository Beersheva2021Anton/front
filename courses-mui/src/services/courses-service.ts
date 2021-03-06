import { Observable } from "rxjs";
import CourseType from "../models/course-type";

interface CoursesService {
    add(course: CourseType): Promise<CourseType>;
    remove(id: number): Promise<CourseType>;
    exists(id: number): Promise<boolean>;
    get(id?: number): Promise<CourseType | CourseType[]>;
    update(id: number, course: CourseType): Promise<CourseType>;
    publish(): Observable<CourseType[]>;
}

export default CoursesService;