import { PayloadAction } from "@reduxjs/toolkit";
import { nonAuthorizedUser, UserData } from "../models/common/user-data";
import CourseType from "../models/course-type";
import { SET_COURSES, SET_USER_DATA } from "./actions";

export const coursesReducer = (courses: CourseType[] = [], action: PayloadAction<CourseType[]>) => {
    return action.type === SET_COURSES ? action.payload : courses;
}

export const userDataReducer = (userData: UserData = nonAuthorizedUser, action: PayloadAction<UserData>) => {
    return action.type === SET_USER_DATA ? action.payload : userData;
}