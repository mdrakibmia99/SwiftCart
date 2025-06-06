'use client';

import { SCTable } from '@/components/ui/core/SCTable/index';
import { IMeta, IProduct } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import DiscountModal from './DiscountModal';
import TablePagination from '@/components/ui/core/SCTable/TablePagination';
import { toast } from 'sonner';
import { deleteProduct } from '@/services/Product';

const ManageProducts = ({
  products,
  meta,
  page,
}: {
  products: IProduct[];
  meta: IMeta;
  page: string;
}) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleDelete = async (productId: string) => {
    try {
      const res = await deleteProduct(productId);
      if (res.success) {
        toast.success('Product deleted successfully');
        // Optional: refresh data or remove the deleted product from UI here
      } else {
        toast.error(res.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      id: 'select',
      header: ({ table }) => {
        const allPageRows = table.getRowModel().rows;
        const isAllSelected = table.getIsAllPageRowsSelected();
        const isSomeSelected = table.getIsSomePageRowsSelected();

        return (
          <Checkbox
            checked={isAllSelected || (isSomeSelected && 'indeterminate')}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              if (value) {
                const ids = allPageRows.map((row) => row.original._id);
                setSelectedIds(ids);
              } else {
                setSelectedIds([]);
              }
            }}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => (
        
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedIds((prev) => {
              if (value) {
                // Add id if not already selected
                if (!prev.includes(row.original._id)) {
                  return [...prev, row.original._id];
                }
                return prev;
              } else {
                // Remove id
                return prev.filter((id) => id !== row.original._id);
              }
            });
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: 'Product Name',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.imageUrls[0]}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => <span>{row.original.category.name}</span>,
    },
    {
      accessorKey: 'brand',
      header: 'Brand',
      cell: ({ row }) => <span>{row.original?.brand?.name}</span>,
    },
    {
      accessorKey: 'weight',
      header: 'Weight',
      cell: ({ row }) => <span>{row.original?.weight}</span>,
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => <span>{row.original.stock}</span>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: 'offerPrice',
      header: 'Offer Price',
      cell: ({ row }) => (
        <span>
          $ {row.original.offerPrice ? row.original.offerPrice.toFixed(2) : '0'}
        </span>
      ),
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(`/user/shop/products/update-product/${row.original._id}`)
            }
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

  return (
    <div className='min-w-[700px]'>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/user/shop/products/add-product')}
            size="sm"
          >
            Add Product <Plus />
          </Button>
          <DiscountModal selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        </div>
      </div>
      <SCTable columns={columns} data={products || []} />
      <TablePagination page={Number(page)} totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageProducts;
