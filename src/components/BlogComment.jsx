import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PencilLine, Trash2 } from 'lucide-react';

export default function BlogComment() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-base font-bold text-primary'>
        Komentar{' '}
        <span className='text-base font-normal text-muted-foreground'>
          (3 komentar)
        </span>
      </h2>
      <div className='flex flex-col gap-4 rounded-md border p-4 shadow'>
        <div className='flex w-fit gap-2 rounded-md border p-4 shadow'>
          <Avatar className='h-7 w-7'>
            <AvatarImage
              src='/images/hero-image.png'
              alt='Ardian Pratama'
              className='object-cover'
            />
            <AvatarFallback />
          </Avatar>
          <div className='flex flex-col'>
            <p className='font-bold text-primary'>Ardian Pratama</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
              veniam rerum, autem iure nesciunt quibusdam?
            </p>
          </div>
        </div>
        <div className='flex w-fit flex-col gap-2 self-end'>
          <p className='rounded-md border bg-primary p-4 text-primary-foreground shadow'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
            veniam rerum, autem iure nesciunt quibusdam?
          </p>
          <div className='flex gap-2 self-end'>
            <Button
              size='icon'
              variant='outline'
              className='text-red-500 focus:text-red-500'
            >
              <Trash2 />
            </Button>
            <Button size='icon' variant='outline'>
              <PencilLine />
            </Button>
          </div>
        </div>
        <div className='flex w-fit gap-2 rounded-md border p-4 shadow'>
          <Avatar className='h-7 w-7'>
            <AvatarImage
              src='/images/hero-image.png'
              alt='Ardian Pratama'
              className='object-cover'
            />
            <AvatarFallback />
          </Avatar>
          <div className='flex flex-col'>
            <p className='font-bold text-primary'>Ardian Pratama</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
