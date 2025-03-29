import MainFooter from '../components/MainFooter.jsx';
import MainHeader from '../components/MainHeader.jsx';
import MainSidebar from '../components/MainSidebar.jsx';
import useToggle from '../hooks/useToggle.jsx';

export default function MainLayout() {
  const [sidebar, toggleSidebar] = useToggle(false);

  return (
    <div className='container relative mx-auto flex min-h-dvh flex-col overflow-x-hidden'>
      <MainHeader toggle={toggleSidebar} />
      <MainSidebar state={sidebar} toggle={toggleSidebar} />
      <main className='mt-16 flex-1 p-4'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
          voluptatum aspernatur, accusamus error necessitatibus labore fuga
          quisquam explicabo illo dolores!
        </p>
      </main>
      <MainFooter />
    </div>
  );
}
