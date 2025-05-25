'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { SCTable } from '@/components/ui/core/SCTable/index';
import TablePagination from '@/components/ui/core/SCTable/TablePagination';
import { deleteCoupon } from '@/services/Coupon';
import { ICoupon, IMeta, IProduct } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const CouponTable = ({
  coupons,
  meta,
}: {
  coupons: ICoupon[];
  meta: IMeta;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductsId, setSelectedProductsId] = useState<string[]>([]);

  const router = useRouter();

  const handleView = (product: IProduct) => {
    console.log('Viewing product:', product);
  };

  const handleDelete = async (couponId: string) => {
    try {
     await deleteCoupon(couponId)
      toast.success('Coupon deleted successfully');

      
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast.error('Failed to delete coupon');
    }
    

  };
const columns: ColumnDef<ICoupon>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => {
          table.toggleAllPageRowsSelected(!!value);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => {
          const id = row.original._id;
          if (value) {
            setSelectedProductsId([...selectedProductsId, id]);
          } else {
            setSelectedProductsId(
              selectedProductsId.filter(existingId => existingId !== id)
            );
          }

          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'code',
    header: 'Coupon Code',
    cell: ({ row }) => <span>{row.original.code}</span>,
  },
  {
    accessorKey: 'discountType',
    header: 'Type',
    cell: ({ row }) => <span>{row.original.discountType}</span>,
  },
  {
    accessorKey: 'discountValue',
    header: 'Discount',
    cell: ({ row }) => <span>{row.original.discountValue}%</span>,
  },
  {
    accessorKey: 'minOrderAmount',
    header: 'Min Order',
    cell: ({ row }) => <span>${row.original.minOrderAmount}</span>,
  },
  {
    accessorKey: 'maxDiscountAmount',
    header: 'Max Discount',
    cell: ({ row }) => <span>${row.original.maxDiscountAmount}</span>,
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => (
      <span>{new Date(row.original.startDate).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => (
      <span>{new Date(row.original.endDate).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`font-medium ${
          row.original.isActive ? 'text-green-600' : 'text-red-500'
        }`}
      >
        {row.original.isActive ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <button
          className="text-gray-500 hover:text-blue-500"
          title="View"
          onClick={() => console.log('Viewing coupon:', row.original)}
        >
          <Eye className="w-5 h-5" />
        </button>

        <button
          className="text-gray-500 hover:text-green-500"
          title="Edit"
          onClick={() => router.push(`/user/shop/update-coupon/${row.original._id}`)}
        >
          <Edit className="w-5 h-5" />
        </button>

        <button
          className="text-gray-500 hover:text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original._id)}
        >
          <Trash className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

  // const columns: ColumnDef<IProduct>[] = [
  //   {
  //     id: 'select',
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && 'indeterminate')
  //         }
  //         onCheckedChange={value => {
  //           table.toggleAllPageRowsSelected(!!value);
  //         }}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={value => {
  //           if (value) {
  //             setSelectedProductsId([...selectedProductsId, row.original._id]);
  //           } else {
  //             setSelectedProductsId(
  //               selectedProductsId.filter(id => id !== row.original._id)
  //             );
  //           }

  //           row.toggleSelected(!!value);
  //         }}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  //   {
  //     accessorKey: 'name',
  //     header: 'Product Name',
  //     cell: ({ row }) => (
  //       <div className="flex items-center space-x-3">
  //         <Image
  //           src={row.original.imageUrls[0]}
  //           alt={row.original.name}
  //           width={40}
  //           height={40}
  //           className="w-8 h-8 rounded-full"
  //         />
  //         <span className="truncate">{row.original.name}</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     accessorKey: 'category',
  //     header: 'Category',
  //     cell: ({ row }) => <span>{row.original.category.name}</span>,
  //   },
  //   {
  //     accessorKey: 'brand',
  //     header: 'Brand',
  //     cell: ({ row }) => <span>{row.original.brand.name}</span>,
  //   },
  //   {
  //     accessorKey: 'stock',
  //     header: 'Stock',
  //     cell: ({ row }) => <span>{row.original.stock}</span>,
  //   },
  //   {
  //     accessorKey: 'price',
  //     header: 'Price',
  //     cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
  //   },
  //   {
  //     accessorKey: 'offerPrice',
  //     header: 'Ofter Price',
  //     cell: ({ row }) => (
  //       <span>
  //         $ {row.original.offerPrice ? row.original.offerPrice.toFixed(2) : '0'}
  //       </span>
  //     ),
  //   },
  //   {
  //     accessorKey: 'action',
  //     header: 'Action',
  //     cell: ({ row }) => (
  //       <div className="flex items-center space-x-3">
  //         <button
  //           className="text-gray-500 hover:text-blue-500"
  //           title="View"
  //           onClick={() => handleView(row.original)}
  //         >
  //           <Eye className="w-5 h-5" />
  //         </button>

  //         <button
  //           className="text-gray-500 hover:text-green-500"
  //           title="Edit"
  //           onClick={() =>
  //             router.push(`/user/shop/update-product/${row.original._id}`)
  //           }
  //         >
  //           <Edit className="w-5 h-5" />
  //         </button>

  //         <button
  //           className="text-gray-500 hover:text-red-500"
  //           title="Delete"
  //           onClick={() => handleDelete(row.original._id)}
  //         >
  //           <Trash className="w-5 h-5" />
  //         </button>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div className="my-5">
      <SCTable columns={columns} data={coupons || []} />
      <TablePagination
        // currentPage={currentPage }
        totalPage={meta?.totalPage}
        // onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CouponTable;
