import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

import AuthLayout from '../layouts/AuthLayout.jsx';
import SignInPage from '../pages/auth/SignInPage.jsx';
import SignUpPage from '../pages/auth/SignUpPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      {
        path: 'sign-in',
        Component: SignInPage,
      },
      {
        path: 'sign-up',
        Component: SignUpPage,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
