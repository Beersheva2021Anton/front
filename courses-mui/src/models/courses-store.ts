import CourseType from "./course-type";

type CoursesStore = {
    add?: (course: CourseType) => void;
    get?: (id: number) => Promise<CourseType>;
    remove?: (id: number) => void;
    update?: (id: number, course: CourseType) => void;
}

export default CoursesStore;