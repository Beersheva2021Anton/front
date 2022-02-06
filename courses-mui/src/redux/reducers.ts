import { PayloadAction } from "@reduxjs/toolkit";
import ErrorType from "../models/common/error-types";
import { nonAuthorizedUser, UserData } from "../models/common/user-data";
import CourseType from "../models/course-type";
import { SET_COURSES, SET_ERR_CODE, SET_USER_DATA } from "./actions";

export const coursesReducer =
    (courses: CourseType[] = [], action: PayloadAction<CourseType[]>): CourseType[] => {
        return action.type === SET_COURSES ? action.payload : courses;
    }

export const userDataReducer =
    (userData: UserData = nonAuthorizedUser, action: PayloadAction<UserData>): UserData => {
        return action.type === SET_USER_DATA ? action.payload : userData;
    }

export const errCodeReducer =
    (errCode: ErrorType = ErrorType.NO_ERROR, action: PayloadAction<ErrorType>): ErrorType => {
        return action.type === SET_ERR_CODE ? action.payload : errCode;
    }