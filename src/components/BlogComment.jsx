import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import useAuth from '../hooks/useAuth.jsx';
import { formatTimestamp } from '../lib/utils.js';
import {
  deleteBlogComment,
  readBlogComments,
  writeBlogComment,
} from '../services/blogComment.js';

const FormSchema = z.object({
  comment: z.string().min(1, {
    message: 'Komentar tidak boleh kosong',
  }),
});

export default function BlogComment({ blog_id }) {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: '',
    },
  });
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = readBlogComments(blog_id, data => {
      setComments(data);
    });

    return () => unsubscribe();
  }, [blog_id]);

  const onSubmit = async value => {
    setLoading(true);
    try {
      if (!user) {
        return toast.message('Hei, tunggu dulu!', {
          description: 'Masuk dulu ya sebelum menulis komentar.',
        });
      }

      await writeBlogComment({
        blog_id,
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
        comment: value.comment,
      });
      toast.message('Berhasil', {
        description: 'Komentar Anda berhasil diposting.',
      });
      form.reset();
    } catch {
      toast.message('Gagal', {
        description: 'Gagal memposting komentar. Silakan coba lagi.',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (blog_id, id) => {
    setDeleteLoading(true);
    try {
      await deleteBlogComment(blog_id, id);
      toast.message('Berhasil', {
        description: 'Komentar Anda berhasil dihapus.',
      });
    } catch {
      toast.message('Gagal', {
        description: 'Gagal menghapus komentar. Silakan coba lagi.',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-base font-bold text-primary'>
        Komentar{' '}
        <span className='text-base font-normal text-muted-foreground'>
          ({comments.length} komentar)
        </span>
      </h2>
      <div className='flex flex-col gap-4 rounded-md border p-4 shadow'>
        {comments.map((comment, index) => {
          if (comment.user.id === user?.id) {
            return (
              <OwnComment
                key={index}
                comment={comment}
                blog_id={blog_id}
                event={deleteComment}
                loading={deleteLoading}
              />
            );
          }

          return (
            <OtherComment
              key={index}
              user={comment.user}
              comment={comment}
            />
          );
        })}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='comment'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-2'>
                    <FormControl className='flex-1'>
                      <Input
                        {...field}
                        className='text-sm'
                      />
                    </FormControl>
                    <Button type='submit'>
                      {loading ? (
                        <LoaderCircle className='animate-spin' />
                      ) : (
                        'Kirim'
                      )}
                    </Button>
                  </div>
                  <FormMessage className='font-normal text-red-500' />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}

const OwnComment = ({ comment, blog_id, event, loading }) => {
  return (
    <div className='flex w-fit flex-col gap-2 self-end'>
      <div className='flex flex-col gap-2'>
        <p className='rounded-md border bg-primary p-4 text-primary-foreground shadow'>
          {comment.comment}
        </p>
        <p className='self-end text-xs'>
          {formatTimestamp(comment.created_at)}
        </p>
      </div>
      <div className='flex gap-2 self-end'>
        <Button
          size='icon'
          variant='outline'
          className='text-red-500 focus:text-red-500'
          disabled={loading}
          onClick={() => event(blog_id, comment.id)}
        >
          {loading ? <LoaderCircle className='animate-spin' /> : <Trash2 />}
        </Button>
      </div>
    </div>
  );
};

const OtherComment = ({ user, comment }) => {
  return (
    <div className='flex w-fit flex-col gap-2'>
      <div className='flex w-fit gap-2'>
        <Avatar className='h-7 w-7'>
          <AvatarImage
            src={user.image.src}
            alt={user.image.alt}
            className='object-cover'
          />
          <AvatarFallback />
        </Avatar>
        <div className='flex flex-col rounded-md border p-4 shadow'>
          <p className='font-bold text-primary'>{user.name}</p>
          <p>{comment.comment}</p>
        </div>
      </div>
      <p className='self-end text-xs'>{formatTimestamp(comment.created_at)}</p>
    </div>
  );
};
