import { buttonVariants } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AboutSection from '../components/AboutSection.jsx';
import BlogCard from '../components/BlogCard.jsx';
import HeroSection from '../components/HeroSection.jsx';

export default function HomePage() {
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
          <BlogCard />
        </div>
        <Link to='/blog' className={buttonVariants({ className: 'self-end' })}>
          lihat selengkapnya
          <MoveRight className='ml-2' />
        </Link>
      </section>
    </>
  );
}
