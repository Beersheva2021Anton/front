import AddCourse from "../components/pages/add-course";
import Courses from "../components/pages/courses";
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

export const routes: RouteType[] = [
    { path: PATH_COURSES, element: <Courses/>, label: 'Courses' },
    { path: PATH_ADD_COURSE, element: <AddCourse/>, label: 'Add New Course' },      
    { path: PATH_STAT_HOURS, element: <StatisticsHours/>, label: 'Hours Statistics' },
    { path: PATH_STAT_COST, element: <StatisticsCost/>, label: 'Cost Statistics' },
    { path: PATH_LOGIN, element: <Login/>, label: 'Sign In' },
    { path: PATH_LOGOUT, element: <Logout/>, label: 'Sign Out' }
]
