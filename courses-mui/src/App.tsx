import { createTheme, ThemeProvider } from '@mui/material';
import { FC, ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import { PATH_COURSES, routes } from './config/routes-config';

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

const App: FC = () => {

  function getRoutes(): ReactNode[] {
    return routes.map(r => <Route key={r.path} path={r.path} element={r.element} />);
  }
  
  return <ThemeProvider theme={theme}>
    <BrowserRouter>
      <NavigatorResponsive items={routes} />
      <Routes>
        {getRoutes()}
        <Route path='/' element={<Navigate to={PATH_COURSES} />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
}

export default App;
