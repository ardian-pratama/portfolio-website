import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

export default function BlogCreatePreview({ value }) {
  const { user } = useAuth();

  return (
    <div className='flex flex-col gap-4 rounded-md border p-4 shadow'>
      <h2 className='text-center font-agbalumo text-xl font-bold text-primary'>
        Pratinjau Blog
      </h2>
      {value.watch('thumbnail') && (
        <img
          src={URL.createObjectURL(value.watch('thumbnail'))}
          className='aspect-video rounded-md bg-primary-foreground object-contain'
        />
      )}
      <div className='flex flex-col gap-2'>
        <div className='flex flex-wrap justify-end gap-2'>
          {value.watch('tags').map((tag, index) => (
            <Badge key={index} variant='outline'>
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className='text-base font-bold text-primary'>
          {value.watch('title')}
        </h3>
        <p>{value.watch('description')}</p>
        <div className='flex items-center gap-2'>
          <Avatar className='h-7 w-7'>
            <AvatarImage
              src={user.image.src}
              alt={user.image.alt}
              className='object-cover'
            />
            <AvatarFallback />
          </Avatar>
          <p className='font-bold text-primary'>{user.name}</p>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        {value.watch('contents').map((content, index) => (
          <p key={index}>{content}</p>
        ))}
      </div>
      {value.watch('images').length > 0 && (
        <Carousel
          className='mx-auto w-full max-w-sm'
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {value.watch('images').map((image, index) => (
              <CarouselItem key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  className='aspect-video object-contain bg-primary-foreground
                  rounded-md'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
      {value.watch('links').length > 0 && (
        <div className='flex flex-col gap-2'>
          <h3 className='text-base font-bold text-primary'>Tautan</h3>
          <div className='flex flex-col'>
            {value.watch('links').map((link, index) => (
              <Link
                key={index}
                to={link}
                className={buttonVariants({
                  className: 'flex w-fit items-center !p-0 !text-blue-500',
                  variant: 'link',
                })}
              >
                <LinkIcon className='h-4 w-4' /> {link}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
