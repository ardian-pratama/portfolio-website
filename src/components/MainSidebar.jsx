import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useRef } from 'react';
import useClickOutside from '../hooks/useClickOutside.jsx';

export default function MainSidebar({ state, toggle }) {
  const ref = useRef(null);
  useClickOutside(ref, () => toggle(false));

  return (
    <nav
      ref={ref}
      className={`absolute inset-y-0 left-0 flex w-64 flex-col rounded-br-xl rounded-tr-xl bg-primary-foreground transition-all duration-500 z-10 ${
        state ? 'translate-x-0 border shadow' : '-translate-x-full'
      }`}
    >
      <div className='flex h-16 items-center justify-end px-4'>
        <Button size='icon' onClick={toggle}>
          <X />
        </Button>
      </div>
      <div className='p-4'>
        <p className='text-justify'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
          corporis non asperiores velit, iure exercitationem doloremque
          consequatur, laboriosam earum eum.
        </p>
      </div>
    </nav>
  );
}
