import CourseType from "./course-type";

type CoursesStore = {
    list: CourseType[];
    add?: (course?: CourseType) => void;
    remove?: (id: number) => void;
    update?: (id: number, course: CourseType) => void;
}

export default CoursesStore;