import { cn } from '@/lib/utils';

export default function AboutSectionCard({ icon, title, content, end }) {
  return (
    <div className='relative flex gap-4 px-4 pb-5'>
      <div className='flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
        {icon}
      </div>
      <div className='flex max-w-sm flex-col gap-2 rounded-md border border-l-2 border-l-primary p-4 shadow'>
        <h3 className='text-base font-bold text-primary'>{title}</h3>
        {content}
      </div>
      <div
        className={cn(
          `absolute inset-y-0 left-9 -z-10 border border-primary ${end && 'hidden'}`
        )}
      />
    </div>
  );
}
