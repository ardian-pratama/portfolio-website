import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout.jsx';
import HomePage, { loader as homePageLoader } from '../pages/HomePage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import BlogDetailPage, {
  loader as loaderBlogDetailPage,
} from '../pages/blog/BlogDetailPage.jsx';
import BlogPage, { loader as blogPageLoader } from '../pages/blog/BlogPage.jsx';

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
        loader: homePageLoader,
      },
      {
        path: 'blog',
        children: [
          {
            index: true,
            Component: BlogPage,
            loader: blogPageLoader,
          },
          {
            path: ':id',
            Component: BlogDetailPage,
            loader: loaderBlogDetailPage,
          },
        ],
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
