import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Folder, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function InputImage({ value, setValue }) {
  const [imagePreview, setImagePreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue(file);
      setImagePreview({ url: URL.createObjectURL(file), name: file.name });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className='flex flex-col gap-3 rounded-md border p-3'
    >
      <Input {...getInputProps()} className='hidden' />
      <div className='flex min-h-24 items-center justify-center rounded-md border-2 border-dashed p-3'>
        {imagePreview && value ? (
          <img
            src={imagePreview.url}
            alt='Preview image'
            className='aspect-square object-cover'
          />
        ) : (
          <Folder className='text-3xl' />
        )}
      </div>
      {imagePreview && value && (
        <div className='flex items-center gap-3'>
          <span className='line-clamp-1 grow rounded-md bg-primary p-2 text-primary-foreground'>
            {imagePreview.name}
          </span>
          <Button
            type='button'
            size='icon'
            className='z-10 shrink-0'
            onClick={(event) => {
              event.stopPropagation();
              setImagePreview(null);
              setValue(null);
            }}
          >
            <Trash2 />
          </Button>
        </div>
      )}
      <p className='text-center'>
        Drag & drop an imagePreview or click to select one
      </p>
    </div>
  );
}
