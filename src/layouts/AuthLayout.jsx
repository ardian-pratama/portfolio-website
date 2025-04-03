import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

export default function AuthLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className='flex min-h-dvh flex-col items-center justify-center gap-6 bg-primary-foreground p-8 md:p-16'>
      <div className='grid overflow-hidden rounded-md border bg-background shadow md:grid-cols-2'>
        <Outlet />
        <div className='hidden max-w-xs items-center justify-center bg-blue-500 p-4 md:flex'>
          <img src='/auth-image.svg' alt='Auth image' />
        </div>
      </div>
      <p className='text-justify'>
        Dengan melanjutkan, kamu setuju dengan{' '}
        <Link
          to='/auth/terms-of-service'
          className='text-blue-500 underline underline-offset-1'
        >
          Syarat dan Ketentuan
        </Link>{' '}
        dan{' '}
        <Link
          to='/auth/privacy-policy'
          className='text-blue-500 underline underline-offset-1'
        >
          Kebijakan Privasi
        </Link>{' '}
        kami.
      </p>
    </div>
  );
}
