import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MoveLeft } from 'lucide-react';
import { Suspense, useEffect } from 'react';
import { Await, defer, Link, useLoaderData } from 'react-router-dom';
import BlogComment from '../../components/BlogComment.jsx';
import BlogDetailCarousel from '../../components/BlogDetailCarousel.jsx';
import BlogDetailFooter from '../../components/BlogDetailFooter.jsx';
import BlogDetailHeader from '../../components/BlogDetailHeader.jsx';
import BlogDetailMain from '../../components/BlogDetailMain.jsx';
import { readBlogById } from '../../services/blog.js';

export const loader = ({ params }) => {
  return defer({
    blog: readBlogById(params.id),
  });
};

export default function BlogDetailPage() {
  const { blog } = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='flex flex-col gap-4 pt-20'>
      <Link to='/blog' className={buttonVariants({ className: 'w-fit' })}>
        <MoveLeft className='mr-2' />
        Kembali
      </Link>
      <Suspense fallback={<BlogDetailPageSkeleton />}>
        <Await resolve={blog}>
          {(blogsData) => {
            if (blogsData) {
              return (
                <>
                  <BlogDetailHeader
                    thumbnail={blogsData.thumbnail}
                    title={blogsData.title}
                    tags={blogsData.tags}
                    description={blogsData.description}
                    user={blogsData.user}
                    created_at={blogsData.created_at}
                  />
                  <BlogDetailMain contents={blogsData.contents} />
                  <BlogDetailCarousel images={blogsData.images} />
                  <BlogDetailFooter links={blogsData.links} />
                  <BlogComment blog_id={blogsData.id} />
                </>
              );
            }

            return (
              <div className='flex grow items-center justify-center'>
                <p className='text-primary'>Blog tidak ditemukan</p>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}

const BlogDetailPageSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid gap-4 md:grid-cols-2'>
        <Skeleton className='aspect-video w-full rounded-md' />
        <div className='my-auto flex flex-col gap-2'>
          <div className='flex items-center justify-end gap-2'>
            <Skeleton className='h-5 w-24 rounded-md' />
            <Skeleton className='h-5 w-24 rounded-md' />
          </div>
          <Skeleton className='h-6 w-32 rounded-md' />
          <Skeleton className='h-20 w-full rounded-md' />
          <div className='flex items-center gap-2'>
            <Skeleton className='h-7 w-7 rounded-full' />
            <Skeleton className='h-5 w-32 rounded-md' />
          </div>
          <Skeleton className='h-4 w-32 self-end rounded-md' />
        </div>
      </div>
      <Skeleton className='mt-10 h-32 w-full rounded-md' />
      <Skeleton className='mx-auto aspect-video w-full max-w-sm' />
      <div className='flex flex-col gap-4'>
        <Skeleton className='h-6 w-24 rounded-md' />
        <div className='flex flex-col gap-1'>
          <Skeleton className='h-5 w-32 rounded-md' />
          <Skeleton className='h-5 w-32 rounded-md' />
          <Skeleton className='h-5 w-32 rounded-md' />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <Skeleton className='h-6 w-24 rounded-md' />
        <Skeleton className='h-24 w-full rounded-md' />
      </div>
    </div>
  );
};
