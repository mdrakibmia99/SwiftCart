// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
// import { format, formatISO } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { createCategory } from "@/services/Category";
// import { toast } from "sonner";

// export default function CreateCouponModal() {
//   const form = useForm();
//   const startDate = form.watch("startDate");
//   const discountType = form.watch("discountType");

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//   const couponData = {
//     ...data,
//     startDate: formatISO(data.startDate),
//     endDate: formatISO(data.endDate),
//   };
// console.log(couponData," couponData");
//   try {
//     await createCategory(couponData);

//     toast.success("Coupon created successfully!");
//     form.reset();
//   } catch (error) {
//     console.error("Error creating coupon:", error);
//     toast.error("Failed to create coupon. Please try again.");
//   }
// };
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>Create Coupon</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Create Coupon</DialogTitle>
//           <DialogDescription className="sr-only">
//             Create coupon for your customers that will help them to save some
//             money.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
//             <FormField
//               control={form.control}
//               name="code"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Coupon Code</FormLabel>
//                   <FormControl>
//                     <Input type="text" {...field} value={field.value || ""} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="discountType"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Discount Type</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select discount type" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="percentage">Percentage</SelectItem>
//                       <SelectItem value="flat">Flat</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="discountValue"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     Discount Value ({discountType === "flat" ? "$" : "%"})
//                   </FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} value={field.value || ""} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="minOrderAmount"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Minimum Order Amount</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} value={field.value || ""} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="maxDiscountAmount"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Maximum Discount Amount</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} value={field.value || ""} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="startDate"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>Start Date</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           variant={"outline"}
//                           className={cn(
//                             "w-full h-10 pl-3 text-left font-normal rounded-md",
//                             !field.value && "text-muted-foreground"
//                           )}
//                         >
//                           {field.value ? (
//                             format(field.value, "PPP")
//                           ) : (
//                             <span>Pick a date</span>
//                           )}
//                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-full p-0 " align="start">
//                       <Calendar
//                         mode="single"
//                         selected={field.value}
//                         onSelect={field.onChange}
//                         disabled={(date) =>
//                           date.getTime() < new Date().setHours(0, 0, 0, 0)
//                         }
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="endDate"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>End Date</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           variant={"outline"}
//                           disabled={!startDate}
//                           className={cn(
//                             "w-full h-10 pl-3 text-left font-normal rounded-md",
//                             !field.value && "text-muted-foreground"
//                           )}
//                         >
//                           {field.value ? (
//                             format(field.value, "PPP")
//                           ) : (
//                             <span>Pick a date</span>
//                           )}
//                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         selected={field.value}
//                         onSelect={field.onChange}
//                         disabled={(date) => date < new Date(startDate)}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" className=" w-full">
//               Create
//             </Button>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }

'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format, formatISO } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { createCoupon } from '@/services/Coupon';

const couponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required'),
  discountType: z.enum(['Percentage', 'Flat'], {
    required_error: 'Discount type is required',
  }),
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

type CouponFormData = z.infer<typeof couponSchema>;

export default function CreateCouponModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      discountType: 'Percentage',
    },
  });

  const startDate = form.watch('startDate');
  const discountType = form.watch('discountType');
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: CouponFormData) => {
    const couponData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
    };

    try {
      const res = await createCoupon(couponData);

      if (res.success) {
        toast.success('Coupon created successfully!');
        form.reset();
        setOpen(false);
        return;
      }
      toast.error(res.message || 'Failed to create coupon. Please try again.');

      setOpen(false);
    } catch (error) {
      console.error('Error creating coupon:', error);
      toast.error('Failed to create coupon. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Coupon</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Coupon</DialogTitle>
          <DialogDescription className="sr-only">
            Create coupon for your customers that will help them to save some
            money.
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
                    <Input {...field} value={field.value ?? ''} />
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
                    <Input type="number" {...field} value={field.value ?? ''} />
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
                    <Input type="number" {...field} value={field.value ?? ''} />
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
                    <Input type="number" {...field} value={field.value ?? ''} />
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
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
