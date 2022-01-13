import { Box, createTheme, List, ListItem, ThemeProvider } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import { PATH_COURSES, routes } from './config/routes-config';
import courseData from './config/course-data.json';
import { getRandomElement, getRandomInteger, getRandomDate } from './utils/random';
import CourseType from './models/course-type';
import CoursesStore from './models/courses-store';
import CoursesContext, { defaultCourses } from './store/context';
import CoursesServiceRest from './services/courses-service-rest';
import CoursesService from './services/courses-service';
import College from './services/college';
import PublisherNumbers from './publisher-numbers';

const theme = createTheme();
const service: CoursesService = new CoursesServiceRest(courseData.serverURL);
const college: College = new College(service);

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

  return { id: id, name: courseName, lecturer: lecturerName, hoursNum: hours, cost: cost, 
    type: type, startAt: startDate, dayEvening: timing};
}

const publisher = new PublisherNumbers();

const App: FC = () => {
  
  const [numbers, setNumbers] = useState<number[]>([]);
  useEffect(() => {
    const subscription = publisher.getNumbers().subscribe ({
      next(arr: number[]) {
        setNumbers(arr);
      },
      error(err) {
        console.log(err);
      },
      complete(){
        console.log('Complete');
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  console.log('After subscribe')

  function getItems() {
    return numbers.map((n, index) => <ListItem key={index}>{n}</ListItem>);
  }  
  return <Box>
    <List>
      {getItems()}
    </List>
  </Box>;
}

export default App;