import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardFooter from '../components/DashboardFooter.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import DashboardSidebar from '../components/DashboardSidebar.jsx';
import useAuth from '../hooks/useAuth.jsx';
import useToggle from '../hooks/useToggle.jsx';

export default function DashboardLayout() {
  const [sidebar, toggleSidebar] = useToggle(false);
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user?.roles?.includes('admin')) {
    return (
      <div className='flex min-h-dvh items-center justify-center'>
        <p className='text-primary'>
          Kamu tidak memiliki izin untuk mengakses halaman ini
        </p>
      </div>
    );
  }

  return (
    <div className='flex min-h-dvh flex-col overflow-x-hidden bg-primary-foreground'>
      <DashboardHeader toggle={toggleSidebar} />
      <DashboardSidebar state={sidebar} toggle={toggleSidebar} />
      <main className='mx-4 mt-20 flex flex-1 flex-col gap-4 rounded-bl-xl rounded-br-xl border-x border-b bg-background p-4 md:ml-64'>
        <Outlet />
      </main>
      <DashboardFooter />
    </div>
  );
}
