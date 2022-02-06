import {PayloadAction} from '@reduxjs/toolkit';
import { college } from '../config/service-config';
import ErrorType from '../models/common/error-types';
import { UserData } from '../models/common/user-data';
import CourseType from "../models/course-type";

export const SET_COURSES = 'set_courses';
export const SET_USER_DATA = 'set_user_data';
export const SET_ERR_CODE = 'set_error_code';

export const setCourses: (courses: CourseType[]) => PayloadAction<CourseType[]> = courses => ({
    payload: courses, type: SET_COURSES
})
export const setUserData: (userData: UserData) => PayloadAction<UserData> = userData => ({
    payload: userData, type: SET_USER_DATA
})
export const setErrCode: (error: ErrorType) => PayloadAction<ErrorType> = error => ({
    payload: error, type: SET_ERR_CODE
})
export const addCourseAction = function(course: CourseType): (dispatch: any) => void {
    return async dispatch => {
        try {
            await college.addCourse(course);
            dispatch(setErrCode(ErrorType.NO_ERROR));
        } catch (err) {
            dispatch(setErrCode(err as ErrorType));
        }        
    }
}
export const removeCourseAction = function(id: number): (dispatch: any) => void {
    return async dispatch => {
        try {
            await college.removeCourse(id);
            dispatch(setErrCode(ErrorType.NO_ERROR));
        } catch (err) {
            dispatch(setErrCode(err as ErrorType));
        }        
    }
}
export const updateCourseAction = function(id: number, course: CourseType): (dispatch: any) => void {
    return async dispatch => {
        try {
            await college.updateCourse(id, course);
            dispatch(setErrCode(ErrorType.NO_ERROR));
        } catch (err) {
            dispatch(setErrCode(err as ErrorType));
        }        
    }
}