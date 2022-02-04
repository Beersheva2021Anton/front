import {PayloadAction} from '@reduxjs/toolkit';
import { UserData } from '../models/common/user-data';
import CourseType from "../models/course-type";

export const SET_COURSES = 'set_courses';
export const SET_USER_DATA = 'set_user_data';
export const setCourses: (courses: CourseType[]) => PayloadAction<CourseType[]> = courses => ({
    payload: courses, type: SET_COURSES
})
export const setUserData: (userData: UserData) => PayloadAction<UserData> = userData => ({
    payload: userData, type: SET_USER_DATA
})