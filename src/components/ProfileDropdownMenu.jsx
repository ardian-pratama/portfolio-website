import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CircleUserRound, LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth.jsx';
import { logOut } from '../services/auth.js';

export default function ProfileDropdownMenu() {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                src={user.image.url}
                alt={user.name}
                className='object-cover'
              />
              <AvatarFallback />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='end'>
            <DropdownMenuItem>
              <div className='flex items-center justify-between gap-2'>
                <Avatar className='shrink-0 rounded-md'>
                  <AvatarImage
                    src={user.image.url}
                    alt={user.name}
                    className='rounded-md object-cover'
                  />
                  <AvatarFallback />
                </Avatar>
                <div className='flex w-40 grow flex-col'>
                  <strong className='truncate text-primary'>{user.name}</strong>
                  <span className='truncate'>{user.email}</span>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <CircleUserRound className='mr-1' /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-red-500 focus:text-red-500'
              onClick={logOut}
            >
              <LogOut className='mr-1' /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
