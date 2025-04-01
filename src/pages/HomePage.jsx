import { buttonVariants } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { Suspense } from 'react';
import { Await, Link, defer, useLoaderData } from 'react-router-dom';
import AboutSection from '../components/AboutSection.jsx';
import BlogCard from '../components/BlogCard.jsx';
import HeroSection from '../components/HeroSection.jsx';
import { getAllBlogs } from '../services/blog.js';

export const loader = async () => {
  const blogs = await getAllBlogs();

  return defer({ blogs });
};

export default function HomePage() {
  const { blogs } = useLoaderData();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <section id='blog' className='flex flex-col gap-4 pt-20'>
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
        <Link to='/blog' className={buttonVariants({ className: 'self-end' })}>
          lihat selengkapnya
          <MoveRight className='ml-2' />
        </Link>
      </section>
    </>
  );
}
