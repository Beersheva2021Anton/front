import { createContext } from "react";
import { nonAuthorizedUser } from "../models/common/user-data";
import CoursesStore from "../models/courses-store";

export const defaultCourses: CoursesStore = { list:[], userData: nonAuthorizedUser };
const CoursesContext = createContext<CoursesStore>(defaultCourses);
export default CoursesContext;