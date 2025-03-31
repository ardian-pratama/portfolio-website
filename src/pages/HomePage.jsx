import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';

export default function HomePage() {
  return (
    <section className='grid md:grid-cols-2 gap-4'>
      <div className='flex flex-col gap-4 my-auto'>
        <div className='flex flex-col'>
          <h1 className='text-6xl font-bold text-primary font-agbalumo'>
            Ardian
          </h1>
          <h1 className='ml-10 text-6xl font-bold text-primary font-agbalumo'>
            Pratama
          </h1>
          <TypeAnimation
            sequence={['Mahasiswa Pendidikan Matematika', 1000, '', 500]}
            wrapper='h2'
            speed={50}
            className='mt-2 text-blue-500 text-2xl font-bold font-agbalumo'
            repeat={Infinity}
          />
        </div>
        <p>
          Halo, saya Ardian Pratama seorang mahasiswa Pendidikan Matematika di
          Universitas Riau. Saya tertarik pada bagaimana teknologi dapat
          membantu memahami konsep matematika secara lebih interaktif dan
          aplikatif.
        </p>
      </div>
      <div className='flex items-center justify-center'>
        <img
          src='/images/hero-image.png'
          alt='Ardian Pratama'
          className=''
        />
      </div>
    </section>
  );
}
