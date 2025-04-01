import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { formatTimestamp } from '../lib/utils.js';

export default function BlogCard({ data }) {
  return (
    <div className='flex flex-col gap-2 rounded-md border p-4 shadow'>
      <img
        src={data.thumbnail}
        alt={data.title}
        className='aspect-video rounded-md object-contain'
      />
      <div className='flex flex-wrap justify-end gap-2'>
        {data.tags.map((tag, index) => (
          <Badge key={index} variant='outline'>
            {tag}
          </Badge>
        ))}
      </div>
      <h3 className='text-base font-bold text-primary'>{data.title}</h3>
      <div className='flex flex-col'>
        <p className='line-clamp-3'>{data.description}</p>
        <Link to={`/blog/${data.slug}`} className='text-blue-500'>
          Selengkapnya
        </Link>
        <p className='self-end text-xs'>
          {formatTimestamp(data.created_at.seconds)}
        </p>
      </div>
    </div>
  );
}
