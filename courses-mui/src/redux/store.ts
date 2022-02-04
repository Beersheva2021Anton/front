import { combineReducers, createStore } from "redux";
import { UserData } from "../models/common/user-data";
import CourseType from "../models/course-type";
import { coursesReducer, userDataReducer } from "./reducers";

type StoreType = {
    courses: CourseType[],
    userData: UserData
}

const reducers = combineReducers<StoreType>({
    courses: coursesReducer, 
    userData: userDataReducer
})

export const store = createStore(reducers);

// Selectors in accordance with state
export const coursesSelector = (state: StoreType): CourseType[] => state.courses;
export const userDataSelector = (state: StoreType): UserData => state.userData;