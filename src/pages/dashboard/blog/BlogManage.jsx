import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Autoplay from 'embla-carousel-autoplay';
import {
  Eye,
  Link as LinkIcon,
  PencilLine,
  Search,
  Trash2,
} from 'lucide-react';
import { Suspense, useState } from 'react';
import { Await, Link, defer, useLoaderData } from 'react-router-dom';
import { formatTimestamp } from '../../../lib/utils.js';
import { readAllBlogs } from '../../../services/blog.js';

export const loader = () => {
  return defer({ blog: readAllBlogs() });
};

const columns = [
  {
    accessorKey: 'thumbnail',
    header: 'Gambar Sampul',
    cell: ({ row }) => (
      <img
        src={row.getValue('thumbnail')?.src}
        alt={row.getValue('thumbnail')?.alt}
        className='aspect-video min-w-[200px] rounded-md bg-primary-foreground object-contain'
      />
    ),
  },
  {
    accessorKey: 'user',
    header: 'Penulis',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Avatar className='h-7 w-7'>
          <AvatarImage
            src={row.getValue('user').image.src}
            alt={row.getValue('user').image.alt}
            className='object-cover'
          />
          <AvatarFallback />
        </Avatar>
        <p className='whitespace-nowrap text-primary'>
          {row.getValue('user').name}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Judul',
    cell: ({ row }) => (
      <p className='whitespace-nowrap'>{row.getValue('title')}</p>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
    cell: ({ row }) => (
      <p className='w-[320px]'>{row.getValue('description')}</p>
    ),
  },
  {
    accessorKey: 'contents',
    header: 'Konten',
    cell: ({ row }) => (
      <div className='flex flex-col gap-1'>
        {row.getValue('contents').map((content, index) => (
          <p key={index} className='w-[448px]'>
            {content}
          </p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'images',
    header: 'Gambar',
    cell: ({ row }) => (
      <Carousel
        className='w-[200px]'
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {row.getValue('images').map((image, index) => (
            <CarouselItem key={index}>
              <img
                src={image.src}
                alt={image.alt}
                className='aspect-video rounded-md bg-primary-foreground object-contain'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
  },
  {
    accessorKey: 'tags',
    header: 'Tag',
    cell: ({ row }) => (
      <div className='flex min-w-[320px] flex-wrap gap-1'>
        {row.getValue('tags').map((tag, index) => (
          <Badge key={index} variant='outline'>
            {tag}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'links',
    header: 'Tautan',
    cell: ({ row }) => (
      <div className='flex max-w-[320px] flex-col gap-1'>
        {row.getValue('links').map((link, index) => (
          <Link
            key={index}
            to={link}
            className={buttonVariants({
              variant: 'link',
              className: '!text-blue-500',
            })}
          >
            <LinkIcon className='h-4 w-4 shrink-0' />
            <span className='truncate'>{link}</span>
          </Link>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Dibuat Pada',
    cell: ({ row }) => (
      <p className='whitespace-nowrap'>
        {formatTimestamp(row.getValue('created_at'))}
      </p>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'updated_at',
    header: 'Diperbarui Pada',
    cell: ({ row }) => (
      <p className='whitespace-nowrap'>
        {formatTimestamp(row.getValue('updated_at'))}
      </p>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'id',
    header: 'Tindakan',
    cell: ({ row }) => (
      <div className='flex gap-1'>
        <Link
          to={`/blog/${row.getValue('id')}`}
          className={buttonVariants({
            size: 'icon',
            className: '!bg-blue-500 !text-white hover:!bg-blue-500',
          })}
        >
          <Eye />
        </Link>
        <Button size='icon' className='bg-red-500 text-white hover:bg-red-500'>
          <Trash2 />
        </Button>
        <Link
          to={`/dasbor/blog/mengedit/${row.getValue('id')}`}
          className={buttonVariants({
            size: 'icon',
            className: '!bg-green-500 !text-white hover:!bg-green-500',
          })}
        >
          <PencilLine />
        </Link>
      </div>
    ),
    enableGlobalFilter: false,
  },
];

export default function BlogManage() {
  const { blog } = useLoaderData();

  return (
    <section className='flex flex-col gap-4'>
      <h1 className='font-agbalumo text-2xl font-bold text-primary'>
        Mengelola Blog
      </h1>
      <p>
        Halaman ini digunakan untuk mengelola blog yang telah dibuat, termasuk
        mengedit dan menghapus konten.
      </p>
      <Suspense fallback={<DataTabelSkeleton />}>
        <Await resolve={blog}>
          {(blogData) => (
            <div>
              <DataTable data={blogData} />
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
}

const DataTable = ({ data }) => {
  const [globalFilter, setGlobalFilter] = useState([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
  });

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between gap-2'>
        <p className='shrink-0 rounded-md bg-primary p-2 text-secondary'>
          {table.getFilteredRowModel().rows.length ?? data.length} data
          ditemukan
        </p>
        <div className='relative w-full'>
          <Input
            className='ml-auto max-w-xs pr-8 text-sm'
            value={globalFilter ?? ''}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
          />
          <Search className='absolute right-0 top-0 m-2 h-4 w-4' />
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='whitespace-nowrap text-center font-bold text-primary'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='align-top'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  Blog tidak ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const DataTabelSkeleton = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between gap-2'>
        <Skeleton className='h-8 w-24 rounded-md' />
        <Skeleton className='h-8 w-full max-w-xs rounded-md' />
      </div>
      <Skeleton className='h-[50dvh] w-full rounded-md' />
    </div>
  );
};
