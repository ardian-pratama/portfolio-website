import {
  Award,
  BookUser,
  GraduationCap,
  Handshake,
  Sparkles,
} from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

export default function HomePage() {
  return (
    <>
      <section id='home' className='grid gap-4 pt-20 md:grid-cols-2'>
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
      <section id='tentang-saya' className='flex flex-col gap-4 pt-20'>
        <h2 className='font-agbalumo text-2xl font-bold text-primary'>
          Tentang Saya
        </h2>
        <div className='flex flex-col'>
          <div className='relative flex gap-4 px-4 pb-5'>
            <div className='flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              <BookUser className='h-5 w-5' />
            </div>
            <div className='flex max-w-sm flex-col gap-2 rounded-md border border-l-2 border-l-primary p-4 shadow'>
              <h3 className='text-base font-bold text-primary'>Biodata</h3>
              <p>
                Saya Ardian Pratama, lahir di Pekanbaru pada 8 Mei 2005. Saya
                beragama Islam dan berjenis kelamin laki-laki. Saat ini, saya
                berdomisili di Kota Pekanbaru, Provinsi Riau, Indonesia.
              </p>
            </div>
            <div className='absolute inset-y-0 left-9 -z-10 border border-primary' />
          </div>
          <div className='relative flex gap-4 px-4 pb-5'>
            <div className='flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              <GraduationCap className='h-5 w-5' />
            </div>
            <div className='flex max-w-sm flex-col gap-2 rounded-md border border-l-2 border-l-primary p-4 shadow'>
              <h3 className='text-base font-bold text-primary'>Pendidikan</h3>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>MDTA Ubudiyah</p>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>SD Negeri 147 Pekanbaru</p>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>SMP Negeri 23 Pekanbaru</p>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>SMA Negeri 12 Pekanbaru</p>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>S1 Pendidikan Matematika Universitas Riau</p>
              </div>
            </div>
            <div className='absolute inset-y-0 left-9 -z-10 border border-primary' />
          </div>
          <div className='relative flex gap-4 px-4 pb-5'>
            <div className='flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              <Handshake className='h-5 w-5' />
            </div>
            <div className='flex max-w-sm flex-col gap-2 rounded-md border border-l-2 border-l-primary p-4 shadow'>
              <h3 className='text-base font-bold text-primary'>
                Pengalaman Organisasi
              </h3>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>Protokoler HIMAPENTIKA FKIP UNRI</p>
              </div>
            </div>
            <div className='absolute inset-y-0 left-9 -z-10 border border-primary' />
          </div>
          <div className='relative flex gap-4 px-4 pb-5'>
            <div className='flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              <Award className='h-5 w-5' />
            </div>
            <div className='flex max-w-sm flex-col gap-2 rounded-md border border-l-2 border-l-primary p-4 shadow'>
              <h3 className='text-base font-bold text-primary'>Keterampilan</h3>
              <p>Produktivitas dan Pengelolaan Dokumen</p>
              <div className='ml-2 flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>Microsoft Word</p>
              </div>
              <div className='ml-2 flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>Microsoft PowerPoint</p>
              </div>
              <div className='ml-2 flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>Microsoft Excel</p>
              </div>
              <div className='ml-2 flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>Google Sheets</p>
              </div>
              <p>Pengembangan dan desain web</p>
              <div className='ml-2 flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>HTML</p>
              </div>
              <div className='ml-2 flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>CSS</p>
              </div>
              <div className='ml-2 flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>Tailwind CSS</p>
              </div>
              <div className='ml-2 flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>Javascript</p>
              </div>
              <div className='ml-2 flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>Node.js</p>
              </div>
              <div className='ml-2 flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>React</p>
              </div>
              <div className='ml-2 flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>MongoDB</p>
              </div>
              <div className='ml-2 flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <p>Express.js</p>
              </div>
            </div>
            <div className='absolute inset-y-0 left-9 -z-10 border border-primary' />
          </div>
          <div className='relative flex gap-4 px-4 pb-5'>
            <div className='flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              <Sparkles className='h-5 w-5' />
            </div>
            <div className='flex max-w-sm flex-col gap-2 rounded-md border border-l-2 border-l-primary p-4 shadow'>
              <h3 className='text-base font-bold text-primary'>Hobi</h3>
              <p>Mencoba hal baru yang membawa dampak positif.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
