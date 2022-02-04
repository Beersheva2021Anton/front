import { createTheme, ThemeProvider } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import { devRoutes, routes } from './config/routes-config';
import CourseType from './models/course-type';
import CoursesContext, { defaultCourses } from './store/context';
import { Subscription } from 'rxjs';
import { college, authService } from './config/service-config';
import { nonAuthorizedUser, UserData } from './models/common/user-data';
import { RouteType } from "./models/common/route-type";
import Alert from './components/common/alert';
import {useDispatch, useSelector} from 'react-redux';
import { coursesSelector, userDataSelector } from './redux/store';
import { setCourses, setUserData } from './redux/actions';

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

const App: FC = () => {

  const userData: UserData = useSelector(userDataSelector);
  const coursesList: CourseType[] = useSelector(coursesSelector);
  const dispatch = useDispatch();
  const [relevantComponents, setRelevantComponents] = 
    useState<RouteType[]>(getRelevantComponents());
  const [showAlertFl, setShowAlertFl] = useState<boolean>(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      routes.splice(2, 0, devRoutes[0]);
    }
    college.getAllCourses().then(arr => updateContext(arr));
    const coursesDataSubscr = getCoursesData();
    const userDataSubscr = getUserData();
    return () => {
      coursesDataSubscr.unsubscribe();
      userDataSubscr.unsubscribe();
      if (process.env.NODE_ENV === 'development') {
        routes.splice(2, 1);
      }
    };
  }, []);

  useEffect(() => {
    setRelevantComponents(getRelevantComponents());
  }, [coursesList, userData]);

  function getCoursesData(): Subscription {
    return college.publishCourses().subscribe({
      next(courses: CourseType[]) {
        setShowAlertFl(false);
        updateContext(courses);
      },
      error(err) {
        console.log(err);
        err.message !== 'NOT_AUTHORIZED' && setShowAlertFl(true);
        setTimeout(getCoursesData, 3000);
      }
    })
  }

  function getUserData(): Subscription {
    return authService.getUserData().subscribe({
      next(data: UserData) {
        dispatch(setUserData(data));
      },
      error(err) {        
        console.log(err);     
      }
    })
  }

  function updateContext(courses: CourseType[]): void {
    dispatch(setCourses(courses));
  }

  function getRoutes(): ReactNode[] {
    return getRelevantComponents().map(r => 
      <Route key={r.path} path={r.path} element={r.element} />);
    }

  function getRelevantComponents(): RouteType[] {
    let componentsToRender: RouteType[] = [];    
    if (!userData.userName){
      componentsToRender = routes.filter(r => !r.authenticated);
    } else {
      if (userData.isAdmin) {
        componentsToRender = routes.filter(r => !!r.authenticated);
      } else {
        componentsToRender = routes.filter(r => !!r.authenticated && !r.adminOnly);
      }
    }
    return componentsToRender;
  }

  return <CoursesContext.Provider value={defaultCourses}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavigatorResponsive items={relevantComponents} />
        <Routes>
          {getRoutes()}
          <Route path='*' element={<Navigate to={relevantComponents[0].path} />} />
        </Routes>
        {userData !== nonAuthorizedUser && <Alert isVisible={showAlertFl} 
          title='Server is unavailable' 
          message='Please, contact the administrator' />}
      </BrowserRouter>
    </ThemeProvider>
  </CoursesContext.Provider>
}

export default App;