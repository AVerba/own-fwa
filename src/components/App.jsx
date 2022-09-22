import { Loader } from './Loader';
import { Header } from './Header/Header';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PrivateRoute from '../Routes/PrivateRoute';
import '../CSS/normilize.css';
import '../CSS/fonts.css';
import PublicRoute from '../Routes/PublicRoute';
import { useSelector } from 'react-redux';
import { authSelectors } from '../redux/operation';
import axios from 'axios';

const HomeView = lazy(() => import('../views/HomeView/HomeView'));
const MainView = lazy(() => import('../views/MainView/MainView'));
const ReportView = lazy(() => import('../views/ReportView/ReportView'));
const GoogleView = lazy(() => import('../views/GoogleView/GoogleView'));
const NotFoundView = lazy(() => import('../views/NotFoundView/NotFoundView'));

export const App = () => {
  const authToken = useSelector(authSelectors.getToken);
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute
                component={
                  <Suspense fallback={<Loader />}>
                    <HomeView />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/expense"
            element={
              <PrivateRoute
                component={
                  <Suspense fallback={<Loader />}>
                    <MainView />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/income"
            element={
              <PrivateRoute
                component={
                  <Suspense fallback={<Loader />}>
                    <MainView />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute
                component={
                  <Suspense fallback={<Loader />}>
                    <ReportView />
                  </Suspense>
                }
              />
            }
          />
          <Route path="/google-redirect" element={<GoogleView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </>
  );
};
