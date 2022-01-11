import CourseType from "./course-type";

type CoursesStore = {
    list: CourseType[];
    add?: () => void;
    remove?: (id: number) => void;
}

export default CoursesStore;