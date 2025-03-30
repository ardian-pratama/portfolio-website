import { TypeAnimation } from 'react-type-animation';

export default function HomePage() {
  return (
    <section className='grid gap-4 md:grid-cols-2'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <h1 className='font-agbalumo text-6xl font-bold text-primary'>
            Ardian
          </h1>
          <h1 className='ml-8 font-agbalumo text-6xl font-bold text-primary'>
            Pratama
          </h1>
          <TypeAnimation
            sequence={[
              'Mahasiswa Pendidikan Matematika',
              1000,
              'Protokoler HIMAPENTIKA FKIP UNRI',
              1000,
              'Junior Web Developer',
              1000,
            ]}
            wrapper='h2'
            speed={50}
            className='mt-2 font-agbalumo text-2xl font-bold text-blue-500'
            repeat={Infinity}
          />
        </div>
        <p>
          Perkenalkan, nama saya{' '}
          <strong className='text-primary'>Ardian Pratama</strong>. Saya adalah
          seorang mahasiswa{' '}
          <strong className='text-primary'>Pendidikan Matematika</strong> yang
          memiliki ketertarikan besar terhadap teknologi, khususnya dalam bidang{' '}
          <em>Web Development</em>.
        </p>
        <p>
          Selain itu, saya juga senang mengeksplorasi berbagai inovasi{' '}
          <em>digital</em> dan terus belajar untuk mengembangkan keterampilan
          saya di dunia pemrograman.
        </p>
      </div>
      <div className='flex items-center justify-center'>
        <img src='/images/hero-image.png' alt='Ardian Pratama' className='' />
      </div>
    </section>
  );
}
