import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import ThemeButton from './ThemeButton.jsx';

export default function MainHeader({ toggle }) {
  return (
    <header className='fixed inset-x-0'>
      <div className='container mx-auto flex h-16 items-center justify-end gap-2 bg-background px-4'>
        <Button size='icon' onClick={toggle} className='mr-auto'>
          <Menu />
        </Button>
        <ThemeButton />
        <Avatar>
          <AvatarImage
            src='https://github.com/shadcn.png'
            className='object-cover'
          />
          <AvatarFallback />
        </Avatar>
      </div>
    </header>
  );
}
