import { Suspense, useEffect } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import BlogCard from '../../components/BlogCard.jsx';
import { getAllBlogs } from '../../services/blog.js';

export const loader = async () => {
  const blogs = await getAllBlogs();

  return defer({ blogs });
};

export default function BlogPage() {
  const { blogs } = useLoaderData();

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
        <Suspense fallback={<p>loading...</p>}>
          <Await resolve={blogs}>
            {(blogsData) =>
              blogsData.map((blog, index) => (
                <BlogCard key={index} data={blog} />
              ))
            }
          </Await>
        </Suspense>
      </div>
    </section>
  );
}
