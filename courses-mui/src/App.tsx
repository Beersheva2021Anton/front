import { createTheme, ThemeProvider } from '@mui/material';
import { FC, ReactNode, useContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import { PATH_COURSES, routes } from './config/routes-config';
import { StoreType } from './models/store-type';
import CoursesContext from './store/context';

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

  const [store, setStore] = useState<StoreType>({count: 0});
  store.increase = increaseCount;
  store.decrease = decreaseCount;

  function increaseCount() {
    store.count++;
    setStore({...store});
  }

  function decreaseCount() {
    store.count--;
    setStore({...store});
  }

  function getRoutes(): ReactNode[] {
    return routes.map(r => <Route key={r.path} path={r.path} element={r.element} />);
  }

  return <CoursesContext.Provider value={store}>
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
