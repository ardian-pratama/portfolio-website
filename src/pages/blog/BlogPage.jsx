import { useEffect } from 'react';
import BlogCard from '../../components/BlogCard.jsx';

export default function BlogPage() {
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
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </section>
  );
}
