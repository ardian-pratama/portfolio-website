import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function BlogCard() {
  return (
    <div className='flex flex-col gap-2 rounded-md border p-4 shadow'>
      <img
        src='/images/hero-image.png'
        alt=''
        className='aspect-video rounded-md object-contain'
      />
      <div className='flex flex-wrap justify-end gap-2'>
        <Badge variant='outline'>Badge</Badge>
        <Badge variant='outline'>Badge</Badge>
        <Badge variant='outline'>Badge</Badge>
      </div>
      <h3 className='text-base font-bold text-primary'>Lorem ipsum dolor</h3>
      <div className='flex flex-col'>
        <p className='line-clamp-3'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, maxime.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          ab, voluptatum. Corporis perspiciatis soluta voluptate deserunt et
          fugiat nobis! Dicta!
        </p>
        <Link to='/blog/123' className='text-blue-500'>
          Selengkapnya
        </Link>
        <p className='self-end text-xs'>3 jam yang lalu</p>
      </div>
    </div>
  );
}
