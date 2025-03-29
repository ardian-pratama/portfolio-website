import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.jsx';

export default function App() {
  const theme = useSelector((state) => state.theme.value);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.className = theme;
  }, [theme]);

  return <RouterProvider router={router} />;
}
