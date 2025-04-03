import { Suspense, useEffect } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import BlogCard, { BlogCardSkeleton } from '../../components/BlogCard.jsx';
import { readAllBlogs } from '../../services/blog.js';

export const loader = () => {
  return defer({ blog: readAllBlogs() });
};

export default function BlogPage() {
  const { blog } = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='flex flex-col gap-4 pt-20'>
      <h2 className='font-agbalumo text-2xl font-bold text-primary'>Blog</h2>
      <p>
        Berbagi pengalaman, pemikiran, dan perjalanan dalam menjalani hidup
        serta mengeksplorasi berbagai hal menarik di sekitar.
      </p>
      <div className='grid gap-4 md:grid-cols-2'>
        <Suspense fallback={<BlogCardSkeleton />}>
          <Await resolve={blog}>
            {(blogData) =>
              blogData.map((blog, index) => (
                <BlogCard
                  key={index}
                  blog_id={blog.id}
                  thumbnail={blog.thumbnail}
                  title={blog.title}
                  tags={blog.tags}
                  description={blog.description}
                  created_at={blog.created_at}
                />
              ))
            }
          </Await>
        </Suspense>
      </div>
    </section>
  );
}
