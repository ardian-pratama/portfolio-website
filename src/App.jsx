import { Toaster } from '@/components/ui/sonner';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';
import ThemeProvider from './context/ThemeContext.jsx';
import { router } from './routes/index.jsx';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster position='top-right' expand={false} />
      </ThemeProvider>
    </AuthProvider>
  );
}
