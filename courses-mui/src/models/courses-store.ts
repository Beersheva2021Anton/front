import { UserData } from "./common/user-data";
import CourseType from "./course-type";

type CoursesStore = {
    list: CourseType[];
    add?: (course: CourseType) => void;
    get?: (id: number) => Promise<CourseType>;
    remove?: (id: number) => void;
    update?: (id: number, course: CourseType) => void;
    userData: UserData
}

export default CoursesStore;