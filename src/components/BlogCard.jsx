import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { formatTimestamp } from '../lib/utils.js';

export default function BlogCard({
  blog_id,
  thumbnail,
  title,
  tags,
  description,
  created_at,
}) {
  return (
    <div className='flex flex-col gap-2 rounded-md border p-4 shadow'>
      <img
        src={thumbnail.src}
        alt={title}
        className='aspect-video rounded-md object-contain'
      />
      <div className='flex flex-wrap justify-end gap-2'>
        {tags.map((tag, index) => (
          <Badge key={index} variant='outline'>
            {tag}
          </Badge>
        ))}
      </div>
      <h3 className='text-base font-bold text-primary'>{title}</h3>
      <div className='flex flex-col'>
        <p className='line-clamp-3'>{description}</p>
        <Link to={`/blog/${blog_id}`} className='text-blue-500'>
          Selengkapnya
        </Link>
        <p className='self-end text-xs'>
          {formatTimestamp(created_at)}
        </p>
      </div>
    </div>
  );
}

export const BlogCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className='flex flex-col gap-2 rounded-md border p-4 shadow'
        >
          <Skeleton className='aspect-video w-full animate-pulse rounded-md' />
          <div className='flex items-center justify-end gap-2'>
            <Skeleton className='h-5 w-24 rounded-md' />
            <Skeleton className='h-5 w-24 rounded-md' />
          </div>
          <Skeleton className='h-6 w-32 rounded-md' />
          <Skeleton className='h-20 w-full rounded-md' />
        </div>
      ))}
    </>
  );
};
