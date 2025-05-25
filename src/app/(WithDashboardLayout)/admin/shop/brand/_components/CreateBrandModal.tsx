'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { createBrand } from '@/services/Brand';
import { Loader2, Plus, UploadCloud, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const CreateBrandModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const form = useForm();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (!file) {
        toast.error('Please upload a logo');
        return;
      }

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('logo', file);

      const res = await createBrand(formData);

      if (res.success) {
        toast.success('Brand created successfully!');
        setIsOpen(false);
        form.reset();
        setFile(null);
        setPreview(null);
      } else {
        toast.error(res.message || 'Failed to create brand');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error(err);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg"
      >
        <Plus className="w-4 h-4 mr-2" />
        New Brand
      </Button>

      <DialogContent className="sm:max-w-md rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Create New Brands
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Drag and drop upload area */}
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all 
              ${isDragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-700'}
              ${preview ? 'p-2' : 'p-8'}`}
          >
            <input {...getInputProps()} />
            {preview ? (
              <div className="relative">
                <Image 
                  src={preview} 
                  alt="Preview" 
                  width={160}
                  height={160}
                  className="w-full h-40 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isDragActive ? (
                    <span className="text-indigo-600 dark:text-indigo-400">Drop the logo here</span>
                  ) : (
                    <>
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">Click to upload</span>{' '}
                      or drag and drop
                    </>
                  )}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG up to 5MB
                </p>
              </div>
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: 'Brand name is required' }}
                render={({ field }) => (
                  <FormItem>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Brand Name
                    </label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Nike, Adidas"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || !file}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Brand'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBrandModal;