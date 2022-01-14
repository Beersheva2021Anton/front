import CourseType from "../models/course-type";
import Observable from "rxjs";

interface CoursesService {
    add(course: CourseType): Promise<CourseType>;
    remove(id: number): Promise<CourseType>;
    exists(id: number): Promise<boolean>;
    get(id?: number): Promise<CourseType[]> | Promise<CourseType>;
    update(id: number, course: CourseType): Promise<CourseType>;
}

export default CoursesService;