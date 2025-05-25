"use client";

import * as React from "react";
import {
  Bot,
  LifeBuoy,
  Send,
  Settings,
  SquareTerminal,
  UserCog,
  ShoppingCart,
  Package,
  Tag,
  Award,
  CreditCard
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Logo from "@/assets/svgs/Logo";

// User Navigation Items
const USER_NAV_ITEMS = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: SquareTerminal,
    isActive: true,
  },
  {
    title: "Shop",
    url: "/user/shop/products",
    icon: ShoppingCart,
    items: [
      { title: "Products", url: "/user/shop/products", icon: Package },
      { title: "Categories", url: "/user/shop/category", icon: Tag },
      { title: "Brands", url: "/user/shop/brand", icon: Award },
      { title: "Coupons", url: "/user/shop/coupons", icon: CreditCard },
    ],
  },
  {
    title: "Account",
    url: "#",
    icon: Settings,
    items: [
      { title: "Profile", url: "/user/profile" },
      { title: "Settings", url: "/user/settings" },
    ],
  },
];

// Admin Navigation Items
const ADMIN_NAV_ITEMS = [
  {
    title: "Admin Dashboard",
    url: "/admin/dashboard",
    icon: SquareTerminal,
    isActive: true,
  },
  {
    title: "Shop Management",
    url: "/admin/shop/products",
    icon: Bot,
    items: [
      { title: "Products", url: "/admin/shop/products", icon: Package },
      { title: "Categories", url: "/admin/shop/categories", icon: Tag },
      { title: "Brands", url: "/admin/shop/brands", icon: Award },
      { title: "Coupons", url: "/admin/shop/coupons", icon: CreditCard },
    ],
  },
   {
    title: "Account",
    url: "#",
    icon: Settings,
    items: [
      { title: "Profile", url: "/admin/profile" }
    ],
  },
];

// Common Secondary Items
const COMMON_SECONDARY_ITEMS = [
  { title: "Support", url: "/support", icon: LifeBuoy },
  { title: "Feedback", url: "/feedback", icon: Send },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: 'user' | 'admin'; // Role-based prop
}

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  const navItems = userRole === 'admin' ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoHeader />
      </SidebarHeader>
      
      <SidebarContent>
        {/* Main Navigation */}
        <NavMain items={navItems} />
        
        {/* Common Secondary Navigation */}
        <div className="mt-4">
          <NavMain items={COMMON_SECONDARY_ITEMS} />
        </div>
      </SidebarContent>
      
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

const LogoHeader = () => (
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" asChild>
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-bold text-xl">SwiftCart</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
);