import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatTimestamp } from '../lib/utils.js';

export default function BlogDetailHeader({
  thumbnail,
  title,
  tags,
  description,
  user,
  created_at,
}) {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <img
        src={thumbnail}
        alt={title}
        className='aspect-video rounded-md object-contain'
      />
      <div className='my-auto flex flex-col gap-2'>
        <div className='flex flex-wrap justify-end gap-2'>
          {tags.map((tag, index) => (
            <Badge key={index} variant='outline'>
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className='text-base font-bold text-primary'>{title}</h1>
        <p>{description}</p>
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
        <p className='self-end text-xs'>
          {formatTimestamp(created_at.seconds)}
        </p>
      </div>
    </div>
  );
}
