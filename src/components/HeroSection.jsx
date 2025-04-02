import { TypeAnimation } from 'react-type-animation';

export default function HeroSection() {
  return (
    <section id='beranda' className='grid gap-4 pt-20 md:grid-cols-2'>
      <div className='my-auto flex flex-col gap-4'>
        <div className='flex flex-col'>
          <h1 className='font-agbalumo text-6xl font-bold text-primary'>
            Ardian
          </h1>
          <h1 className='ml-10 font-agbalumo text-6xl font-bold text-primary'>
            Pratama
          </h1>
          <TypeAnimation
            sequence={['Mahasiswa Pendidikan Matematika', 1000, '', 500]}
            wrapper='h2'
            speed={50}
            className='mt-2 font-agbalumo text-2xl font-bold text-blue-500'
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
        <img src='/images/hero-image.png' alt='Ardian Pratama' />
      </div>
    </section>
  );
}
