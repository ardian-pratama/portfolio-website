import { Button, buttonVariants } from '@/components/ui/button';
import { BookUser, House, NotebookText, X } from 'lucide-react';
import { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import useClickOutside from '../hooks/useClickOutside.jsx';

export default function MainSidebar({ state, toggle }) {
  const ref = useRef(null);
  const location = useLocation();
  useClickOutside(ref, () => toggle(false));

  return (
    <nav
      ref={ref}
      className={`fixed inset-y-0 left-0 z-10 flex w-64 flex-col rounded-br-xl rounded-tr-xl bg-primary-foreground transition-all duration-500 ${
        state ? 'translate-x-0 border shadow' : '-translate-x-full'
      }`}
    >
      <div className='flex h-16 items-center justify-end px-4'>
        <Button size='icon' onClick={toggle}>
          <X />
        </Button>
      </div>
      <div className='flex flex-col gap-2 p-4' onClick={toggle}>
        <NavHashLink
          to='/#home'
          className={buttonVariants({
            variant:
              location.hash === '#home' ||
              (location.pathname === '/' && location.hash === '')
                ? 'default'
                : 'ghost',
            className: '!justify-start',
          })}
          smooth
        >
          <House className='mr-2' /> Home
        </NavHashLink>
        <NavHashLink
          to='/#tentang-saya'
          className={buttonVariants({
            variant: location.hash === '#tentang-saya' ? 'default' : 'ghost',
            className: '!justify-start',
          })}
          smooth
        >
          <BookUser className='mr-2' /> Tentang Saya
        </NavHashLink>
        <NavLink
          to='/blog'
          className={({ isActive }) =>
            buttonVariants({
              variant: isActive ? 'default' : 'ghost',
              className: '!justify-start',
            })
          }
        >
          <NotebookText className='mr-2' /> Blog
        </NavLink>
      </div>
    </nav>
  );
}
