import { buttonVariants } from '@/components/ui/button';
import { Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogDetailFooter({ links }) {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-base font-bold text-primary'>Tautan</h2>
      <div className='flex flex-col'>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className={buttonVariants({
              className: 'flex w-fit items-center !p-0 !text-blue-500',
              variant: 'link',
            })}
          >
            <LinkIcon className='h-4 w-4' /> {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
