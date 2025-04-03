import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout.jsx';
import HomePage, { loader as loaderHomePage } from '../pages/HomePage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import BlogDetailPage, {
  loader as loaderBlogDetailPage,
} from '../pages/blog/BlogDetailPage.jsx';
import BlogPage, { loader as loaderBlogPage } from '../pages/blog/BlogPage.jsx';

import AuthLayout from '../layouts/AuthLayout.jsx';
import SignInPage from '../pages/auth/SignInPage.jsx';
import SignUpPage from '../pages/auth/SignUpPage.jsx';

import DashboardLayout from '../layouts/DashboardLayout.jsx';
import DashboardPage from '../pages/dashboard/DashboardPage.jsx';
import BlogCreate from '../pages/dashboard/blog/BlogCreate.jsx';
import BlogManage, {
  loader as loaderBlogManage,
} from '../pages/dashboard/blog/BlogManage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: loaderHomePage,
      },
      {
        path: 'blog',
        children: [
          {
            index: true,
            Component: BlogPage,
            loader: loaderBlogPage,
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
          {
            path: 'mengelola',
            Component: BlogManage,
            loader: loaderBlogManage,
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
