import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import {
  BookUser,
  GraduationCap,
  Handshake,
  Award,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  return (
    <>
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
      <section className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold font-agbalumo text-primary'>
          Tentang Saya
        </h2>
        <div className='flex flex-col'>
          <div className='relative px-4 pb-5 flex gap-4'>
            <div className='rounded-full bg-primary text-primary-foreground flex justify-center items-center h-10 w-10 aspect-square'>
              <BookUser className='w-5 h-5' />
            </div>
            <div className='p-4 border border-l-2 border-l-primary rounded-md shadow max-w-sm flex flex-col gap-2'>
              <h3 className='text-primary text-base font-bold'>Biodata</h3>
              <p>
                Saya Ardian Pratama, lahir di Pekanbaru pada 8 Mei 2005. Saya
                beragama Islam dan berjenis kelamin laki-laki. Saat ini, saya
                berdomisili di Kota Pekanbaru, Provinsi Riau, Indonesia.
              </p>
            </div>
            <div className='absolute inset-y-0 left-9 -z-10 border border-primary' />
          </div>
          <div className='relative px-4 pb-5 flex gap-4'>
            <div className='rounded-full bg-primary text-primary-foreground flex justify-center items-center h-10 w-10 aspect-square'>
              <GraduationCap className='w-5 h-5' />
            </div>
            <div className='p-4 border border-l-2 border-l-primary rounded-md shadow max-w-sm flex flex-col gap-2'>
              <h3 className='text-primary text-base font-bold'>Pendidikan</h3>
              <div className='flex gap-2 items-center'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>MDTA Ubudiyah</p>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>SD Negeri 147 Pekanbaru</p>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>SMP Negeri 23 Pekanbaru</p>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>SMA Negeri 12 Pekanbaru</p>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>S1 Pendidikan Matematika Universitas Riau</p>
              </div>
            </div>
            <div className='absolute inset-y-0 left-9 -z-10 border border-primary' />
          </div>
          <div className='relative px-4 pb-5 flex gap-4'>
            <div className='rounded-full bg-primary text-primary-foreground flex justify-center items-center h-10 w-10 aspect-square'>
              <Handshake className='w-5 h-5' />
            </div>
            <div className='p-4 border border-l-2 border-l-primary rounded-md shadow max-w-sm flex flex-col gap-2'>
              <h3 className='text-primary text-base font-bold'>
                Pengalaman Organisasi
              </h3>
              <div className='flex gap-2 items-center'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>Protokoler HIMAPENTIKA FKIP UNRI</p>
              </div>
            </div>
            <div className='absolute inset-y-0 left-9 -z-10 border border-primary' />
          </div>
          <div className='relative px-4 pb-5 flex gap-4'>
            <div className='rounded-full bg-primary text-primary-foreground flex justify-center items-center h-10 w-10 aspect-square'>
              <Award className='w-5 h-5' />
            </div>
            <div className='p-4 border border-l-2 border-l-primary rounded-md shadow max-w-sm flex flex-col gap-2'>
              <h3 className='text-primary text-base font-bold'>Keterampilan</h3>
              <p>Produktivitas dan Pengelolaan Dokumen</p>
              <div className='flex gap-2 items-center ml-2'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>Microsoft Word</p>
              </div>
              <div className='flex gap-2 items-center ml-2'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>Microsoft PowerPoint</p>
              </div>
              <div className='flex gap-2 items-center ml-2'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>Microsoft Excel</p>
              </div>
              <div className='flex gap-2 items-center ml-2'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>Google Sheets</p>
              </div>
              <p>Pengembangan dan desain web</p>
              <div className='flex gap-2 items-center ml-2'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>HTML</p>
              </div>
              <div className='flex gap-2 items-center ml-2'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>CSS</p>
              </div>
              <div className='flex gap-2 items-center ml-2'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>Tailwind CSS</p>
              </div>
              <div className='flex gap-2 items-center ml-2'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>Javascript</p>
              </div>
              <div className='flex gap-2 items-center ml-2'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>Node.js</p>
              </div>
              <div className='flex gap-2 items-center ml-2'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>React</p>
              </div>
              <div className='flex gap-2 items-center ml-2'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>MongoDB</p>
              </div>
              <div className='flex gap-2 items-center ml-2'>
                <div className='rounded-full h-2 w-2 bg-blue-500' />
                <p>Express.js</p>
              </div>
            </div>
            <div className='absolute inset-y-0 left-9 -z-10 border border-primary' />
          </div>
          <div className='relative px-4 pb-5 flex gap-4'>
            <div className='rounded-full bg-primary text-primary-foreground flex justify-center items-center h-10 w-10 aspect-square'>
              <Sparkles className='w-5 h-5' />
            </div>
            <div className='p-4 border border-l-2 border-l-primary rounded-md shadow max-w-sm flex flex-col gap-2'>
              <h3 className='text-primary text-base font-bold'>Hobi</h3>
              <p>Mencoba hal baru yang membawa dampak positif.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
