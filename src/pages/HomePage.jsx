import { buttonVariants } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { Suspense } from 'react';
import { Await, Link, defer, useLoaderData } from 'react-router-dom';
import AboutSection from '../components/AboutSection.jsx';
import BlogCard, { BlogCardSkeleton } from '../components/BlogCard.jsx';
import HeroSection from '../components/HeroSection.jsx';
import { readLatestBlogWithLimit } from '../services/blog.js';

export const loader = () => {
  return defer({ blog: readLatestBlogWithLimit(5) });
};

export default function HomePage() {
  const { blog } = useLoaderData();

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
        <Link to='/blog' className={buttonVariants({ className: 'self-end' })}>
          lihat selengkapnya
          <MoveRight className='ml-2' />
        </Link>
      </section>
    </>
  );
}
