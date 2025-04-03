import { Button, buttonVariants } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  BookUser,
  Database,
  DatabaseBackup,
  DatabaseZap,
  House,
  LayoutDashboard,
  NotebookText,
  UserRound,
  UserRoundCog,
  X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import useClickOutside from '../hooks/useClickOutside.jsx';
import useMediaQuery from '../hooks/useMediaQuery.jsx';

const pageMenus = [
  {
    icon: <BookUser className='mr-2' />,
    title: 'Pengguna',
    lists: [
      {
        to: '/dasbor/pengguna',
        icon: <UserRound className='mr-2' />,
        title: 'Data Pengguna',
      },
      {
        to: '/dasbor/pengguna/mengelola',
        icon: <UserRoundCog className='mr-2' />,
        title: 'Mengelola Pengguna',
      },
    ],
  },
  {
    icon: <NotebookText className='mr-2' />,
    title: 'Blog',
    lists: [
      {
        to: '/dasbor/blog',
        icon: <Database className='mr-2' />,
        title: 'Data Blog',
        end: true,
      },
      {
        to: '/dasbor/blog/mengelola',
        icon: <DatabaseBackup className='mr-2' />,
        title: 'Mengelola Blog',
      },
      {
        to: '/dasbor/blog/membuat',
        icon: <DatabaseZap className='mr-2' />,
        title: 'Membuat Blog',
      },
    ],
  },
];

export default function DashboardSidebar({ state, toggle }) {
  const ref = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useClickOutside(ref, () => {
    if (isMobile) {
      toggle(false);
    }
  });

  return (
    <nav
      ref={ref}
      className={`fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-primary-foreground transition-all duration-500 md:transition-none ${
        state
          ? 'translate-x-0 border shadow md:translate-x-0'
          : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className='mt-4 flex h-16 items-center justify-end px-4'>
        <Button size='icon' className='md:hidden' onClick={toggle}>
          <X />
        </Button>
      </div>
      <div className='flex flex-col gap-2 p-4'>
        <p className='font-bold text-primary'>Menu Utama</p>
        <div className='flex flex-col gap-2' onClick={toggle}>
          <NavHashLink
            to='/#beranda'
            className={buttonVariants({
              variant:
                location.hash === '#beranda' ||
                (location.pathname === '/' && location.hash === '')
                  ? 'default'
                  : 'ghost',
              className: '!justify-start',
            })}
            smooth
          >
            <House className='mr-2' /> Beranda
          </NavHashLink>
          <NavLink
            to='/dasbor'
            className={({ isActive }) =>
              buttonVariants({
                variant: isActive ? 'default' : 'ghost',
                className: '!justify-start',
              })
            }
            end
          >
            <LayoutDashboard className='mr-2' /> Dasbor
          </NavLink>
        </div>
        <p className='font-bold text-primary'>Menu Halaman</p>
        {pageMenus.map((menu, index) => (
          <ListPageMenu
            key={index}
            icon={menu.icon}
            title={menu.title}
            lists={menu.lists}
          />
        ))}
      </div>
    </nav>
  );
}

const ListPageMenu = ({ icon, title, lists }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-full'>
      <CollapsibleTrigger asChild>
        <Button
          variant={isOpen ? 'secondary' : 'ghost'}
          className='w-full justify-start'
        >
          {icon} {title}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className='ml-[20px] flex flex-col gap-2 border-l-2 p-2'>
          {lists.map((list, index) => (
            <NavLink
              key={index}
              to={list.to}
              className={({ isActive }) =>
                buttonVariants({
                  variant: isActive ? 'default' : 'ghost',
                  className: '!justify-start',
                })
              }
              end={list.end}
            >
              {list.icon} <p className='truncate'>{list.title}</p>
            </NavLink>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
