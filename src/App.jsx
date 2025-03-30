import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { router } from './routes/index.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
