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
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import useToggle from '../../hooks/useToggle.jsx';
import {
  signIn,
  signInWithGithub,
  signInWithGoogle,
} from '../../services/auth.js';

const formSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid' }),
  password: z
    .string()
    .min(6, { message: 'Kata sandi harus memiliki minimal 6 karakter' })
    .max(50, { message: 'Kata sandi tidak boleh lebih dari 50 karakter' }),
});

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [password, togglePassword] = useToggle(true);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async values => {
    setLoading(true);
    try {
      await signIn(values);
      toast.message('Berhasil', {
        description: 'Anda berhasil masuk.',
      });
      form.reset();
    } catch {
      toast.message('Gagal', {
        description:
          'Gagal masuk. Silakan periksa kredensial Anda dan coba lagi.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex max-w-xs flex-col gap-4 p-6'>
      <h1 className='text-center text-2xl font-bold text-primary'>
        Masuk ke akun Anda
      </h1>
      <p className='text-justify'>
        Masukkan email Anda di bawah ini untuk masuk ke akun Anda.
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
                <FormLabel className='text-primary'>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='text-sm'
                  />
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
                    Lupa kata sandi?
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
          <Button
            type='submit'
            disabled={loading}
          >
            {loading ? <LoaderCircle className='animate-spin' /> : 'Masuk'}
          </Button>
        </form>
      </Form>
      <p className='text-center'>Atau lanjutkan dengan</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={signInWithGoogle}>
          <FcGoogle />
        </Button>
        <Button onClick={signInWithGithub}>
          <BsGithub />
        </Button>
      </div>
      <p className='text-center'>
        Belum punya akun?{' '}
        <Link
          to='/akun/daftar'
          className='text-blue-500 underline underline-offset-1'
        >
          Daftar
        </Link>
      </p>
    </div>
  );
}
