import { applyMiddleware, combineReducers, createStore } from "redux";
import { UserData } from "../models/common/user-data";
import CourseType from "../models/course-type";
import { coursesReducer, errCodeReducer, userDataReducer } from "./reducers";
import thunk from "redux-thunk";
import ErrorType from "../models/common/error-types";

type StoreType = {
    courses: CourseType[],
    userData: UserData,
    errCode: ErrorType
}

const reducers = combineReducers<StoreType>({
    courses: coursesReducer, 
    userData: userDataReducer,
    errCode: errCodeReducer
})

export const store = createStore(reducers, applyMiddleware(thunk));

// Selectors in accordance with state
export const coursesSelector = (state: StoreType): CourseType[] => state.courses;
export const userDataSelector = (state: StoreType): UserData => state.userData;
export const errCodeSelector = (state: StoreType): ErrorType => state.errCode;