"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { SCTable } from "@/components/ui/core/SCTable/index";
import TablePagination from "@/components/ui/core/SCTable/TablePagination";
import { deleteCoupon } from "@/services/Coupon";
import { ICoupon, IMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import UpdateCouponModal from "./UpdateCouponModal";

const CouponTable = ({
  coupons,
  meta,
}: {
  coupons: ICoupon[];
  meta: IMeta;
}) => {
  const [selectedProductsId, setSelectedProductsId] = useState<string[]>([]);

  const handleDelete = async (couponId: string) => {
    try {
      const res = await deleteCoupon(couponId);
      console.log("Delete response:", res);
      toast.success("Coupon deleted successfully");
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("Failed to delete coupon");
    }
  };
  const columns: ColumnDef<ICoupon>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            const id = row.original._id;
            if (value) {
              setSelectedProductsId([...selectedProductsId, id]);
            } else {
              setSelectedProductsId(
                selectedProductsId.filter((existingId) => existingId !== id)
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
      accessorKey: "code",
      header: "Coupon Code",
      cell: ({ row }) => <span>{row.original.code}</span>,
    },
    {
      accessorKey: "discountType",
      header: "Type",
      cell: ({ row }) => <span>{row.original.discountType}</span>,
    },
    {
      accessorKey: "discountValue",
      header: "Discount",
      cell: ({ row }) => <span>{row.original.discountValue}%</span>,
    },
    {
      accessorKey: "minOrderAmount",
      header: "Min Order",
      cell: ({ row }) => <span>${row.original.minOrderAmount}</span>,
    },
    {
      accessorKey: "maxDiscountAmount",
      header: "Max Discount",
      cell: ({ row }) => <span>${row.original.maxDiscountAmount}</span>,
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => (
        <span>{new Date(row.original.startDate).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => (
        <span>{new Date(row.original.endDate).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`font-medium ${
            row.original.isActive ? "text-green-600" : "text-red-500"
          }`}
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">

          <UpdateCouponModal coupon={row?.original} />

 

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
    <div className="my-5">
      <SCTable columns={columns} data={coupons || []} />
      <TablePagination
        page={meta?.page || 1}
        totalPage={meta?.totalPage}
        // onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CouponTable;
