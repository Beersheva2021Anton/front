import { createContext } from "react";
import CoursesStore from "../models/courses-store";

export const defaultCourses: CoursesStore = {list:[]};
const CoursesContext = createContext<CoursesStore>(defaultCourses);
export default CoursesContext;