import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Folder, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function InputImage({ value, onChange, className, multiple }) {
  const [imagePreview, setImagePreview] = useState([]);

  const onDrop = (acceptedFiles) => {
    const image = acceptedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      file,
    }));

    if (multiple) {
      onChange([...value, ...image.map((image) => image.file)]);
      setImagePreview((prev) => [...prev, ...image]);
    } else {
      onChange(image[0].file);
      setImagePreview([image[0]]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className='flex flex-col gap-3 rounded-md border p-3'
    >
      <Input {...getInputProps()} className='hidden' />
      <div className='flex min-h-24 gap-2 overflow-x-scroll rounded-md border-2 border-dashed p-3'>
        {imagePreview.length > 0 ? (
          imagePreview.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt='Preview image'
              className={cn(
                `aspect-square rounded-md bg-primary-foreground object-cover ${className}`
              )}
            />
          ))
        ) : (
          <Folder className='mx-auto self-center text-3xl' />
        )}
      </div>
      {imagePreview.length > 0 && (
        <div className='flex flex-col gap-2'>
          {imagePreview.map((image, index) => (
            <div key={index} className='flex items-center gap-3'>
              <p className='line-clamp-1 grow rounded-md border bg-primary-foreground p-2'>
                {image.name}
              </p>
              <Button
                type='button'
                size='icon'
                className='z-10 shrink-0 border bg-primary-foreground text-red-500 shadow-none'
                onClick={(event) => {
                  event.stopPropagation();
                  setImagePreview((prev) => prev.filter((_, i) => i !== index));
                  if (multiple) {
                    onChange(value.filter((_, i) => i !== index));
                  } else {
                    onChange(null);
                  }
                }}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
      )}
      <p className='text-center'>
        Seret & lepas gambar atau klik untuk memilih gambar
      </p>
    </div>
  );
}
