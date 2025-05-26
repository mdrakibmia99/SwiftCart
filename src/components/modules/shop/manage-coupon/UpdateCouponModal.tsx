'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, formatISO } from 'date-fns';
import { toast } from 'sonner';
import { CalendarIcon, Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { updateCoupon } from '@/services/Coupon';
import { ICoupon } from '@/types';

const couponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required'),
  discountType: z.enum(['Percentage', 'Flat']),
  discountValue: z.coerce.number().min(1, 'Discount value is required'),
  minOrderAmount: z.coerce.number().min(1, 'Minimum order amount is required'),
  maxDiscountAmount: z.coerce
    .number()
    .min(1, 'Maximum discount amount is required'),
  startDate: z.date({
    required_error: 'Start date is required',
  }),
  endDate: z.date({
    required_error: 'End date is required',
  }),
});

export type CouponFormData = z.infer<typeof couponSchema>;

export default function UpdateCouponModal({ coupon }: { coupon: ICoupon }) {
  const [open, setOpen] = useState(false);

  const form = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      ...coupon,
      startDate: new Date(coupon.startDate),
      endDate: new Date(coupon.endDate),
    },
  });

  const startDate = form.watch('startDate');
  const discountType = form.watch('discountType');
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (open && coupon) {
      form.reset({
        ...coupon,
        startDate: new Date(coupon.startDate),
        endDate: new Date(coupon.endDate),
      });
    }
  }, [open, coupon, form]);

  const onSubmit = async (data: CouponFormData) => {
    const payload = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
    };

    try {
      console.log('Updating coupon with payload:', payload);
      const res = await updateCoupon(coupon._id, payload);

      if (res.success) {
        toast.success('Coupon updated successfully!');
        form.reset();
        setOpen(false);
      } else {
        toast.error(res.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error updating coupon:', error);
      toast.error('Something went wrong.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="w-5 h-5 text-gray-500 hover:text-green-500 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Coupon</DialogTitle>
          <DialogDescription className="sr-only">
            Update coupon details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                      <SelectItem value="Flat">Flat</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Discount Value ({discountType === 'Flat' ? '$' : '%'})
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minOrderAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Order Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxDiscountAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Discount Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full h-10 pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? format(field.value, 'PPP')
                            : 'Pick a date'}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date =>
                          date.getTime() < new Date().setHours(0, 0, 0, 0)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full h-10 pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                          disabled={!startDate}
                        >
                          {field.value
                            ? format(field.value, 'PPP')
                            : 'Pick a date'}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date =>
                          startDate ? date < startDate : false
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
