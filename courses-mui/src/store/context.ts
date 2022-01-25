import { createContext } from "react";
import { nonAuthorizedUser } from "../models/common/user-data";
import CoursesStore from "../models/courses-store";
import { college } from "../config/service-config";
import CourseType from "../models/course-type";

export const defaultCourses: CoursesStore = { 
    list:[], 
    userData: nonAuthorizedUser,
    add: addCourse,
    get: getCourse,
    remove: removeCourse,
    update: updateCourse
};
const CoursesContext = createContext<CoursesStore>(defaultCourses);
export default CoursesContext;

function removeCourse(id: number): Promise<CourseType> {
    return college.removeCourse(id);
}

function addCourse(course: CourseType): Promise<CourseType> {
    return college.addCourse(course);
}

function getCourse(id: number): Promise<CourseType> {
    return college.getCourse(id);
}

function updateCourse(id: number, course: CourseType): Promise<CourseType> {
    return college.updateCourse(id, course);
}