'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { useState } from 'react';
import { IProfile } from '@/types/profile';
import ImagePreviewer from '@/components/ui/core/SCImageUploader/ImagePreviewer';
import NMImageUploader from '@/components/ui/core/SCImageUploader';
import { updateProfile } from '@/services/Profile';

const UpdateProfile = ({ data: userData }: { data: IProfile }) => {
  const { setIsLoading } = useUser();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    userData?.profilePhoto ? [userData.profilePhoto] : []
  );

  const form = useForm({
    defaultValues: {
      name: userData?.name || '',
      phoneNo: userData?.profile?.phoneNo || '',
      gender: userData?.profile?.gender || '',
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('profilePhoto', imageFiles[0] as File);

    try {
      const res = await updateProfile(formData);
      setIsLoading(true);
      console.log(res);
      if (res.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className=" w-full p-6">
      <div className="flex items-center mb-3 gap-2">
        <div>
          <h1 className="text-lg font-semibold">Update Your Profile</h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Username..."
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Contact number..."
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center ">
            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                className="mt-8"
              />
            ) : (
              <div className="mt-8">
                <NMImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Profile"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              {' '}
              {isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </Form>
      {/* <ChangePassword /> */}
    </div>
  );
};

export default UpdateProfile;
