import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import ProfileDropdownMenu from './ProfileDropdownMenu.jsx';
import ThemeButton from './ThemeButton.jsx';

export default function DashboardHeader({ toggle }) {
  return (
    <header className='fixed inset-x-0 z-20 bg-primary-foreground'>
      <div className='mx-4 mt-4 flex h-16 items-center justify-end gap-2 rounded-tl-xl rounded-tr-xl border bg-background px-4 md:ml-64'>
        <Button size='icon' className='mr-auto md:hidden' onClick={toggle}>
          <Menu />
        </Button>
        <ThemeButton />
        <ProfileDropdownMenu />
      </div>
    </header>
  );
}
