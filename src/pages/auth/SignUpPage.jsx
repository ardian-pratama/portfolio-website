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
import InputImage from '../../components/InputImage.jsx';
import useToggle from '../../hooks/useToggle.jsx';
import {
  signInWithGithub,
  signInWithGoogle,
  signUp,
} from '../../services/auth.js';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nama harus memiliki minimal 2 karakter' })
    .max(50, { message: 'Nama tidak boleh lebih dari 50 karakter' }),
  email: z.string().email({ message: 'Format email tidak valid' }),
  password: z
    .string()
    .min(6, { message: 'Kata sandi harus memiliki minimal 6 karakter' })
    .max(50, { message: 'Kata sandi tidak boleh lebih dari 50 karakter' }),
  image: z.instanceof(File, { message: 'Tipe file tidak valid' }).nullable(),
});

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [password, togglePassword] = useToggle(true);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      image: null,
    },
  });

  const onSubmit = async values => {
    setLoading(true);
    try {
      await signUp(values);
      toast.message('Berhasil', {
        description:
          'Akun Anda telah berhasil dibuat. Anda sekarang dapat masuk.',
      });
      form.reset();
    } catch {
      toast.message('Gagal', {
        description:
          'Terjadi kesalahan saat membuat akun Anda. Silakan coba lagi.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex max-w-xs flex-col gap-4 p-6'>
      <h1 className='text-center text-2xl font-bold text-primary'>
        Buat akun baru
      </h1>
      <p className='text-justify'>
        Masukkan detail Anda di bawah ini untuk mendaftar akun baru.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 text-sm'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-primary'>Nama</FormLabel>
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
                <FormLabel className='text-primary'>Password</FormLabel>
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
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-foreground'>Gambar</FormLabel>
                <FormControl>
                  <InputImage
                    value={form.watch('image')}
                    setValue={file => field.onChange(file)}
                  />
                </FormControl>
                <FormMessage className='font-normal text-red-500' />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={loading}
          >
            {loading ? <LoaderCircle className='animate-spin' /> : 'Daftar'}
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
        Sudah memiliki akun?{' '}
        <Link
          to='/akun/masuk'
          className='text-blue-500 underline underline-offset-1'
        >
          Masuk
        </Link>
      </p>
    </div>
  );
}
