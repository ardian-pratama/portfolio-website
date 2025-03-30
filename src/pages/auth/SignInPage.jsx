import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import useToggle from '../../hooks/useToggle.jsx';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters' })
    .max(50, { message: 'Password must not exceed 50 characters' }),
});

export default function SignInPage() {
  const [password, togglePassword] = useToggle(true);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className='flex max-w-xs flex-col gap-4 p-6'>
      <h1 className='text-center text-2xl font-bold text-primary'>
        Sign in to your account
      </h1>
      <p className='text-justify'>
        Enter your email below to sign in to your account.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 text-sm'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-primary'>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} className='text-sm' />
                </FormControl>
                <FormMessage className='font-normal text-red-500' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel className='text-primary'>Password</FormLabel>
                  <Link
                    to='/auth/forgot-password'
                    className='text-blue-500 underline underline-offset-1'
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={password ? 'password' : 'text'}
                      className='pr-[38px] text-sm'
                      {...field}
                    />
                    {password ? (
                      <Eye
                        className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2'
                        onClick={togglePassword}
                      />
                    ) : (
                      <EyeOff
                        className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2'
                        onClick={togglePassword}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage className='font-normal text-red-500' />
              </FormItem>
            )}
          />
          <Button type='submit'>Sign In</Button>
        </form>
      </Form>
      <p className='text-center'>
        Don't have an account?{' '}
        <Link
          to='/auth/sign-up'
          className='text-blue-500 underline underline-offset-1'
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
