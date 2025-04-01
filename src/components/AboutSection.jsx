import {
  Award,
  BookUser,
  GraduationCap,
  Handshake,
  Sparkles,
} from 'lucide-react';
import AboutSectionCard from './AboutSectionCard.jsx';

const aboutCards = [
  {
    icon: <BookUser className='h-5 w-5' />,
    title: 'Biodata',
    content: (
      <p>
        Saya Ardian Pratama, lahir di Pekanbaru pada 8 Mei 2005. Saya beragama
        Islam dan berjenis kelamin laki-laki. Saat ini, saya berdomisili di Kota
        Pekanbaru, Provinsi Riau, Indonesia.
      </p>
    ),
  },
  {
    icon: <GraduationCap className='h-5 w-5' />,
    title: 'Pendidikan',
    content: (
      <>
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
      </>
    ),
  },
  {
    icon: <Handshake className='h-5 w-5' />,
    title: 'Pengalaman Organisasi',
    content: (
      <div className='flex items-center gap-2'>
        <div className='h-2 w-2 rounded-full bg-blue-500' />
        <p>Protokoler HIMAPENTIKA FKIP UNRI</p>
      </div>
    ),
  },
  {
    icon: <Award className='h-5 w-5' />,
    title: 'Keterampilan',
    content: (
      <>
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
      </>
    ),
  },
  {
    icon: <Sparkles className='h-5 w-5' />,
    title: 'Hobi',
    content: <p>Mencoba hal baru yang membawa dampak positif.</p>,
    end: true,
  },
];

export default function AboutSection() {
  return (
    <section id='tentang-saya' className='flex flex-col gap-4 pt-20'>
      <h2 className='font-agbalumo text-2xl font-bold text-primary'>
        Tentang Saya
      </h2>
      <p>Berbagai informasi tentang saya</p>
      <div className='flex flex-col'>
        {aboutCards.map((card, index) => (
          <AboutSectionCard
            key={index}
            icon={card.icon}
            title={card.title}
            content={card.content}
            end={card.end}
          />
        ))}
      </div>
    </section>
  );
}
