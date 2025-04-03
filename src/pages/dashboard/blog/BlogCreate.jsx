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
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, SendHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import BlogCreatePreview from '../../../components/BlogCreatePreview.jsx';
import InputImage from '../../../components/InputImage.jsx';
import { writeBlog } from '../../../services/blog.js';
import { toast } from 'sonner';
import useAuth from '../../../hooks/useAuth.jsx';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Judul tidak boleh kosong' }),
  description: z.string().min(1, { message: 'Deskripsi tidak boleh kosong' }),
  thumbnail: z
    .instanceof(File, { message: 'Tipe file tidak valid' })
    .nullable(),
  tags: z.array(z.string().min(1, { message: 'Tag tidak boleh kosong' })),
  contents: z.array(
    z.string().min(1, { message: 'Konten tidak boleh kosong' })
  ),
  images: z.array(
    z.instanceof(File, { message: 'Tipe file tidak valid' }).nullable(),
    { message: 'Tambahkan setidaknya satu gambar' }
  ),
  links: z
    .array(z.string().url({ message: 'Masukkan URL yang valid' }))
    .optional(),
});

export default function BlogCreate() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    tag: '',
    content: '',
    link: '',
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      thumbnail: null,
      tags: [],
      contents: [],
      images: [],
      links: [],
    },
  });
  const { user } = useAuth();

  const onSubmit = async values => {
    setLoading(true);
    try {
      await writeBlog({...values, user: {
          name: user.name,
          image: user.image,
        }});
      toast.message('Berhasil', {
        description: 'Blog telah berhasil dipublikasikan.',
      });
      form.reset();
    } catch (error) {
      toast.message('Gagal', {
        description:
          'Terjadi kesalahan saat menyimpan blog. Silahkan coba lagi.',
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='grid gap-10 md:grid-cols-2 md:gap-4'>
      <div className='flex flex-col gap-4'>
        <h1 className='font-agbalumo text-2xl font-bold text-primary'>
          Membuat Blog
        </h1>
        <p>Halaman ini digunakan untuk membuat blog dengan berbagai konten.</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4 text-sm'
          >
            <FormField
              control={form.control}
              name='thumbnail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-foreground'>
                    Gambar Sampul
                  </FormLabel>
                  <FormControl>
                    <InputImage
                      value={field.value}
                      onChange={file => field.onChange(file)}
                      className='aspect-video object-contain'
                      multiple={false}
                    />
                  </FormControl>
                  <FormMessage className='font-normal text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-primary'>Judul</FormLabel>
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
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-primary'>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value}
                      onChange={e => field.onChange(e.target.value)}
                      className='text-sm'
                    />
                  </FormControl>
                  <FormMessage className='font-normal text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-primary'>Tag</FormLabel>
                  <FormControl>
                    <div className='flex flex-col gap-4'>
                      {field.value.length > 0 && (
                        <div className='flex flex-wrap gap-2'>
                          {field.value.map((tag, index) => (
                            <div
                              key={index}
                              className='flex items-center gap-4 rounded-md border bg-primary-foreground p-2'
                            >
                              {tag}
                              <Trash2
                                className='h-4 w-4 text-red-500'
                                onClick={() =>
                                  form.setValue(
                                    'tags',
                                    field.value.filter((_, i) => i !== index)
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className='flex items-center gap-4'>
                        <Input
                          {...field}
                          className='text-sm'
                          value={input.tag}
                          onChange={e =>
                            setInput(prev => ({
                              ...prev,
                              tag: e.target.value,
                            }))
                          }
                        />
                        <Button
                          type='button'
                          size='icon'
                          className='aspect-square'
                          disabled={!input.tag.trim()}
                          onClick={() => {
                            form.setValue('tags', [...field.value, input.tag]);
                            setInput(prev => ({ ...prev, tag: '' }));
                          }}
                        >
                          <SendHorizontal />
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className='font-normal text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='contents'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-primary'>Konten</FormLabel>
                  <FormControl>
                    <div className='flex flex-col gap-4'>
                      {field.value.length > 0 && (
                        <div className='flex flex-col gap-2'>
                          {field.value.map((content, index) => (
                            <div
                              key={index}
                              className='flex items-center gap-4 rounded-md border bg-primary-foreground p-2'
                            >
                              {content}
                              <Trash2
                                className='mb-auto ml-auto h-4 w-4 shrink-0 text-red-500'
                                onClick={() =>
                                  form.setValue(
                                    'contents',
                                    field.value.filter(data => data !== content)
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className='flex gap-4'>
                        <Textarea
                          {...field}
                          className='text-sm'
                          value={input.content}
                          onChange={e =>
                            setInput(prev => ({
                              ...prev,
                              content: e.target.value,
                            }))
                          }
                        />
                        <Button
                          type='button'
                          size='icon'
                          className='aspect-square'
                          disabled={!input.content.trim()}
                          onClick={() => {
                            form.setValue('contents', [
                              ...field.value,
                              input.content,
                            ]);
                            setInput(prev => ({ ...prev, content: '' }));
                          }}
                        >
                          <SendHorizontal />
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className='font-normal text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-foreground'>Gambar</FormLabel>
                  <FormControl>
                    <InputImage
                      value={field.value}
                      onChange={file => field.onChange(file)}
                      className='aspect-video object-contain'
                      multiple={true}
                    />
                  </FormControl>
                  <FormMessage className='font-normal text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='links'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-primary'>Tautan</FormLabel>
                  <FormControl>
                    <div className='flex flex-col gap-4'>
                      {field.value.length > 0 && (
                        <div className='flex flex-col gap-2'>
                          {field.value.map((link, index) => (
                            <div
                              key={index}
                              className='flex items-center gap-4 rounded-md border bg-primary-foreground p-2'
                            >
                              {link}
                              <Trash2
                                className='mb-auto ml-auto h-4 w-4 shrink-0 text-red-500'
                                onClick={() =>
                                  form.setValue(
                                    'links',
                                    field.value.filter(data => data !== link)
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className='flex gap-4'>
                        <Input
                          {...field}
                          className='text-sm'
                          value={input.link}
                          onChange={e =>
                            setInput(prev => ({
                              ...prev,
                              link: e.target.value,
                            }))
                          }
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              form.setValue('links', [
                                ...field.value,
                                input.link,
                              ]);
                              setInput(prev => ({ ...prev, link: '' }));
                            }
                          }}
                        />
                        <Button
                          type='button'
                          size='icon'
                          className='aspect-square'
                          disabled={!input.link.trim()}
                          onClick={() => {
                            form.setValue('links', [
                              ...field.value,
                              input.link,
                            ]);
                            setInput(prev => ({ ...prev, link: '' }));
                          }}
                        >
                          <SendHorizontal />
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className='font-normal text-red-500' />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={loading}
              className='md:col-span-2'
            >
              {loading ? (
                <LoaderCircle className='animate-spin' />
              ) : (
                'Buat Blog'
              )}
            </Button>
          </form>
        </Form>
      </div>
      <BlogCreatePreview value={form} />
    </section>
  );
}
