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

import DashboardLayout from '../layouts/DashboardLayout.jsx';
import DashboardPage from '../pages/dashboard/DashboardPage.jsx';
import BlogCreate from '../pages/dashboard/blog/BlogCreate.jsx';

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
    path: '/dasbor',
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: 'blog',
        children: [
          {
            path: 'membuat',
            Component: BlogCreate,
          },
        ],
      },
    ],
  },
  {
    path: '/akun',
    Component: AuthLayout,
    children: [
      {
        path: 'masuk',
        Component: SignInPage,
      },
      {
        path: 'daftar',
        Component: SignUpPage,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
