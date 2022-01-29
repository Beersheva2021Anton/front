import AddCourse from "../components/pages/add-course";
import Courses from "../components/pages/courses";
import CourseGenerator from "../components/pages/generate-courses";
import Login from "../components/pages/login";
import Logout from "../components/pages/logout";
import StatisticsCost from "../components/pages/stat-cost";
import StatisticsHours from "../components/pages/stat-hours";
import { RouteType } from "../models/common/route-type";

export const PATH_COURSES = "/courses";
export const PATH_LOGIN = "/login";
export const PATH_LOGOUT = "/logout";
export const PATH_ADD_COURSE = "/courses/add";
export const PATH_STAT_HOURS = "/courses/statistics/hours";
export const PATH_STAT_COST = "/courses/statistics/cost";
export const PATH_GENERATE_COURSES = "/courses/generate";

export const routes: RouteType[] = [
    { path: PATH_COURSES, element: <Courses/>, label: 'Courses', authenticated: true },
    { path: PATH_ADD_COURSE, element: <AddCourse/>, label: 'Add New Course', authenticated: true, adminOnly: true },      
    { path: PATH_STAT_HOURS, element: <StatisticsHours/>, label: 'Hours Statistics', authenticated: true },
    { path: PATH_STAT_COST, element: <StatisticsCost/>, label: 'Cost Statistics', authenticated: true },
    { path: PATH_LOGIN, element: <Login/>, label: 'Sign In' },
    { path: PATH_LOGOUT, element: <Logout/>, label: 'Sign Out', authenticated: true }    
]

export const devRoutes: RouteType[] = [
    { path: PATH_GENERATE_COURSES, element: <CourseGenerator/>, label: 'Generate Courses', authenticated: true, adminOnly: true }
]
