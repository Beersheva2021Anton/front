import { createTheme, ThemeProvider } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import { routes } from './config/routes-config';
import courseData from './config/course-data.json';
import { getRandomElement, getRandomInteger, getRandomDate } from './utils/random';
import CourseType from './models/course-type';
import CoursesStore from './models/courses-store';
import CoursesContext, { defaultCourses } from './store/context';
import { Subscription } from 'rxjs';
import { college, authService } from './config/service-config';
import { UserData } from './models/common/user-data';
import { RouteType } from "./models/common/route-type";

const theme = createTheme();

// theme.typography.body1 = {
//   fontSize: '1.2rem',
//   '@media (min-width:568px)': {
//     fontSize: '2rem'
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '2.4rem',
//   },
// };

function getRandomCourse(): CourseType {
  let id = getRandomInteger(courseData.minId, courseData.maxId);
  let courseName = getRandomElement(courseData.courseNames);
  let lecturerName = getRandomElement(courseData.lecturers);
  let hours = getRandomInteger(courseData.minHours, courseData.maxHours);
  let cost = getRandomInteger(courseData.minCost, courseData.maxCost);
  let type = getRandomElement(courseData.types);
  let timingInd = getRandomInteger(0, courseData.timing.length);
  let timing = timingInd < courseData.timing.length ?
    [courseData.timing[timingInd]] : courseData.timing;
  let startDate = getRandomDate(courseData.minYear, courseData.maxYear);

  return {
    id: id, name: courseName, lecturer: lecturerName, hoursNum: hours, cost: cost,
    type: type, startAt: startDate, dayEvening: timing
  };
}

const App: FC = () => {

  const [currentList, setCurrentList] = useState<CoursesStore>(defaultCourses);
  const [relevantRoutes, setRelevantRoutes] = useState<RouteType[]>(getRelevantRoutes());
  currentList.add = addCourse;
  currentList.remove = removeCourse;

  useEffect(() => {
    college.getAllCourses().then(arr => updateContext(arr));
    const coursesDataSubscr = getCoursesData();
    const userDataSubscr = getUserData();
    return () => {
      coursesDataSubscr.unsubscribe();
      userDataSubscr.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setRelevantRoutes(getRelevantRoutes());
  }, [currentList.userData]);

  function getCoursesData(): Subscription {
    return college.publishCourses().subscribe({
      next(courses: CourseType[]) {
        updateContext(courses);
      },
      error(err) {
        console.log(err);
      }
    })
  }

  function getUserData(): Subscription {
    return authService.getUserData().subscribe({
      next(data: UserData) {
        currentList.userData = data;
        setCurrentList({...currentList});
      },
      error(err) {
        console.log(err);
      }
    })
  }

  function updateContext(courses: CourseType[]): void {
    currentList.list = courses;
    setCurrentList({ ...currentList });
  }

  async function addCourse() {
    let course = getRandomCourse();
    await college.addCourse(course);
    college.getAllCourses().then(arr => updateContext(arr));
  }

  async function removeCourse(id: number) {
    await college.removeCourse(id);
    college.getAllCourses().then(arr => updateContext(arr));
  }

  function getRoutes(): ReactNode[] {
    return getRelevantRoutes().map(r => 
      <Route key={r.path} path={r.path} element={r.element} />);
  }

  function getRelevantRoutes(): RouteType[] {
    let componentsToRender: RouteType[] = [];
    if (!currentList.userData.userName){
      componentsToRender = routes.filter(r => !r.authenticated);
    } else {
      if (currentList.userData.isAdmin) {
        componentsToRender = routes.filter(r => !!r.authenticated);
      } else {
        componentsToRender = routes.filter(r => !!r.authenticated && !r.adminOnly);
      }
    }
    return componentsToRender;
  }

  return <CoursesContext.Provider value={currentList}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavigatorResponsive items={relevantRoutes} />
        <Routes>
          {getRoutes()}
          <Route path='*' element={<Navigate to={relevantRoutes[0].path} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </CoursesContext.Provider>
}

export default App;