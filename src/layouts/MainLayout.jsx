import { Outlet } from 'react-router-dom';
import MainFooter from '../components/MainFooter.jsx';
import MainHeader from '../components/MainHeader.jsx';
import MainSidebar from '../components/MainSidebar.jsx';
import useToggle from '../hooks/useToggle.jsx';

export default function MainLayout() {
  const [sidebar, toggleSidebar] = useToggle(false);

  return (
    <div className='container mx-auto flex min-h-dvh flex-col overflow-x-hidden'>
      <MainHeader toggle={toggleSidebar} />
      <MainSidebar state={sidebar} toggle={toggleSidebar} />
      <main className='flex flex-1 flex-col p-4'>
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
}
