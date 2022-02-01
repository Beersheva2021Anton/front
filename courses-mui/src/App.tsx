import { createTheme, ThemeProvider } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import { devRoutes, routes } from './config/routes-config';
import CourseType from './models/course-type';
import CoursesStore from './models/courses-store';
import CoursesContext, { defaultCourses } from './store/context';
import { Subscription } from 'rxjs';
import { college, authService } from './config/service-config';
import { nonAuthorizedUser, UserData } from './models/common/user-data';
import { RouteType } from "./models/common/route-type";
import Alert from './components/common/alert';

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

  const [currentList, setCurrentList] = useState<CoursesStore>(defaultCourses);
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
    };
  }, []);

  useEffect(() => {
    setRelevantComponents(getRelevantComponents());
  }, [currentList]);

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

  function getRoutes(): ReactNode[] {
    return getRelevantComponents().map(r => 
      <Route key={r.path} path={r.path} element={r.element} />);
    }

  function getRelevantComponents(): RouteType[] {
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
        <NavigatorResponsive items={relevantComponents} />
        <Routes>
          {getRoutes()}
          <Route path='*' element={<Navigate to={relevantComponents[0].path} />} />
        </Routes>
        {currentList.userData !== nonAuthorizedUser && <Alert isVisible={showAlertFl} 
          title='Server is unavailable' 
          message='Please, contact the administrator' />}
      </BrowserRouter>
    </ThemeProvider>
  </CoursesContext.Provider>
}

export default App;