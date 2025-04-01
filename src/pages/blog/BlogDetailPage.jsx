import { buttonVariants } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import { Fragment, Suspense, useEffect } from 'react';
import { Await, defer, Link, useLoaderData } from 'react-router-dom';
import BlogComment from '../../components/BlogComment.jsx';
import BlogDetailCarousel from '../../components/BlogDetailCarousel.jsx';
import BlogDetailFooter from '../../components/BlogDetailFooter.jsx';
import BlogDetailHeader from '../../components/BlogDetailHeader.jsx';
import BlogDetailMain from '../../components/BlogDetailMain.jsx';
import { getBlog } from '../../services/blog.js';

export const loader = async ({ params }) => {
  const blog = await getBlog(params.slug);

  console.log(blog);
  return defer({ blog });
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
      <Suspense fallback={<p>loading...</p>}>
        <Await resolve={blog}>
          {(blogsData) =>
            blogsData.map((blog, index) => (
              <Fragment key={index}>
                <BlogDetailHeader
                  thumbnail={blog.thumbnail}
                  title={blog.title}
                  tags={blog.tags}
                  description={blog.description}
                  author={blog.author}
                  created_at={blog.created_at}
                />
                <BlogDetailMain contents={blog.contents} />
                <BlogDetailCarousel images={blog.images} />
                <BlogDetailFooter links={blog.links} />
              </Fragment>
            ))
          }
        </Await>
      </Suspense>
      <BlogComment />
    </section>
  );
}
