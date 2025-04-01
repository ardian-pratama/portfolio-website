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
import { Link as LinkIcon, MoveLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogComment from '../../components/BlogComment.jsx';

export default function BlogDetailPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='flex flex-col gap-4 pt-20'>
      <Link to='/blog' className={buttonVariants({ className: 'w-fit' })}>
        <MoveLeft className='mr-2' />
        Kembali
      </Link>
      <div className='grid gap-4 md:grid-cols-2'>
        <img
          src='/images/hero-image.png'
          alt='Ardian Pratama'
          className='aspect-video rounded-md object-contain'
        />
        <div className='my-auto flex flex-col gap-2'>
          <div className='flex flex-wrap justify-end gap-2'>
            <Badge variant='outline'>Badge</Badge>
            <Badge variant='outline'>Badge</Badge>
            <Badge variant='outline'>Badge</Badge>
          </div>
          <h1 className='text-base font-bold text-primary'>
            Lorem ipsum dolor
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            laudantium!
          </p>
          <div className='flex items-center gap-2'>
            <Avatar className='h-7 w-7'>
              <AvatarImage
                src='/images/hero-image.png'
                alt='Ardian Pratama'
                className='object-cover'
              />
              <AvatarFallback />
            </Avatar>
            <p className='font-bold text-primary'>Ardian Pratama</p>
          </div>
          <p className='self-end text-xs'>3 jam yang lalu</p>
        </div>
      </div>
      <div className='mt-10'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          corrupti, inventore esse aliquam, hic ipsa. Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. Et, rerum porro quod alias? Nulla,
          odio sit voluptates quis aliquid quam eligendi officiis aspernatur
          repellendus itaque, nihil deleniti, consectetur libero totam porro.
          Quae quidem nesciunt, ullam praesentium est debitis atque minus.
        </p>
      </div>
      <Carousel
        className='mx-auto w-full max-w-sm'
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem>
            <img
              src='/images/hero-image.png'
              alt='Ardian Pratama'
              className='aspect-video object-contain'
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src='/images/hero-image.png'
              alt='Ardian Pratama'
              className='aspect-video object-contain'
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className='flex flex-col gap-4'>
        <h2 className='text-base font-bold text-primary'>Tautan</h2>
      </div>
      <Link
        className={buttonVariants({
          className: 'flex w-fit items-center !p-0 !text-blue-500',
          variant: 'link',
        })}
      >
        <LinkIcon className='h-4 w-4' /> Lorem ipsum dolor.
      </Link>
      <BlogComment />
    </section>
  );
}
