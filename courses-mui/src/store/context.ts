import { StoreType } from "../models/store-type";
import { createContext } from "react";

const CoursesContext = createContext<StoreType>({count: 0});
export default CoursesContext;