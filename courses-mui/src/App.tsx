import { createTheme, ThemeProvider } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import { PATH_COURSES, routes } from './config/routes-config';
import courseData from './config/course-data.json';
import { getRandomElement, getRandomInteger, getRandomDate } from './utils/random';
import CourseType from './models/course-type';
import CoursesStore from './models/courses-store';
import CoursesContext, { defaultCourses } from './store/context';

const theme = createTheme();

theme.typography.body1 = {
  fontSize: '1.2rem',
  '@media (min-width:568px)': {
    fontSize: '2rem'
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

function getRandomCourse(): CourseType {
  let id = getRandomInteger(100000, 999999);
  let courseName = getRandomElement(courseData.courseNames);
  let lecturerName = getRandomElement(courseData.lecturers);
  let hours = getRandomInteger(courseData.minHours, courseData.maxHours);
  let cost = getRandomInteger(courseData.minCost, courseData.maxCost);
  let type = getRandomElement(courseData.types);
  let timingInd = getRandomInteger(0, courseData.timing.length);
  let timing = timingInd < courseData.timing.length ?
    [courseData.timing[timingInd]] : courseData.timing;
  let startDate = getRandomDate(courseData.minYear, courseData.maxYear);

  return { id: id, name: courseName, lecturer: lecturerName, hoursNum: hours, cost: cost, 
    type: type, startAt: startDate, dayEvening: timing};
}

const App: FC = () => {

  const [currentList, setCurrentList] = useState<CoursesStore>(defaultCourses);
  currentList.add = addCourse;
  currentList.remove = removeCourse;

  function addCourse() {
    let course = getRandomCourse();
    currentList.list.push(course);
    setCurrentList({...currentList});
  }
  
  function removeCourse(id: number) {
    let ind = currentList.list.findIndex(c => c.id === id);
    currentList.list.splice(ind, 1);
    setCurrentList({...currentList});
  }

  function getRoutes(): ReactNode[] {
    return routes.map(r => <Route key={r.path} path={r.path} element={r.element} />);
  }

  return <CoursesContext.Provider value={currentList}>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <NavigatorResponsive items={routes} />
      <Routes>
        {getRoutes()}
        <Route path='/' element={<Navigate to={PATH_COURSES} />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  </CoursesContext.Provider>
}

export default App;
