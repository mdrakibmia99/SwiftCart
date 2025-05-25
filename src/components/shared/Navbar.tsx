'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import {
  LogOut,
  ShoppingCart,
  ChevronDown,
  Search,
  Menu,
  CircleX,
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/services/AuthService';
import { useUser } from '@/context/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import { protectedRoutes } from '@/contants';
import { useAppSelector } from '@/redux/hooks';
import { orderedProductsSelector } from '@/redux/features/cartSlice';
import logo from '../../../public/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const products = useAppSelector(orderedProductsSelector);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push('/');
    }
  };

  // Close mega menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isMegaMenuOpen) {
        setIsMegaMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMegaMenuOpen]);

  const categories = [
    {
      name: 'Electronics',
      subcategories: ['Phones', 'Laptops', 'Cameras', 'Accessories'],
    },
    {
      name: 'Fashion',
      subcategories: ["Men's Wear", "Women's Wear", 'Kids', 'Jewelry'],
    },
    {
      name: 'Home & Living',
      subcategories: ['Furniture', 'Kitchen', 'Decor', 'Lighting'],
    },
    {
      name: 'Beauty',
      subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrances'],
    },
  ];

  return (
    <header className="border-b bg-background w-full sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <CircleX className="text-primary" size={20} />
              ) : (
                <Menu className="text-primary" size={20} />
              )}
            </button>

            <Link href="/" className="shrink-0">
              <motion.div
                className="relative w-28 h-10 md:w-40 md:h-12"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Image
                  src={logo}
                  alt="SwiftCart Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 7rem, (max-width: 1024px) 10rem, 12rem"
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Search - Hidden on mobile */}
          <div className="hidden md:flex max-w-md flex-grow mx-4">
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full border border-gray-300 text-primary rounded-full py-2 px-5 pl-10 bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
            </motion.div>
          </div>

          {/* Right Side Navigation */}
          <nav className="flex items-center gap-2">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
            >
              <Search className="text-primary" size={20} />
            </button>

            {user?.role === 'user' && (
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/cart" passHref>
                  <Button
                    variant="outline"
                    className="rounded-full size-10 flex bg-secondary text-primary items-center justify-center gap-1 relative"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {products?.length > 0 && (
                      <motion.span
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                      >
                        {products?.length}
                      </motion.span>
                    )}
                  </Button>
                </Link>
              </motion.div>
            )}

            {user?.email ? (
              <>
                {user?.role === 'user' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link href="/create-shop">
                      <Button className="rounded-full hidden md:block">
                        Create Shop
                      </Button>
                    </Link>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage src={user?.profilePhoto} />
                        <AvatarFallback className="text-2xl font-bold bg-indigo-500 text-white">
                          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                          {user?.name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[200px]">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/profile">Profile</Link>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                      </DropdownMenuItem>
                      {user?.role === 'user' && (
                        <DropdownMenuItem>
                          <Link href="/user/shop">My Shop</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-500 cursor-pointer focus:bg-red-50"
                        onClick={handleLogOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/login">
                  <Button
                    className="rounded-full bg-primary text-secondary font-semibold hover:text-primary hover:bg-secondary hover:border-primary"
                    variant="outline"
                  >
                    Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </nav>
        </div>

        {/* Mobile Search - Appears when search button clicked */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="md:hidden py-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full border border-gray-300 rounded-full py-2 px-5 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Navigation - Desktop */}
        <div className="hidden md:flex justify-center border-t">
          <NavigationMenu>
            <NavigationMenuList>
              {categories.map(category => (
                <NavigationMenuItem key={category.name}>
                  <NavigationMenuTrigger className="text-sm font-medium hover:text-primary data-[state=open]:text-primary">
                    {category.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="container mx-auto px-4 py-6 grid grid-cols-4 gap-6 w-screen">
                      {categories.map(cat => (
                        <div key={cat.name} className="space-y-2">
                          <h3 className="font-bold text-lg">{cat.name}</h3>
                          <ul className="space-y-1">
                            {cat.subcategories.map(sub => (
                              <li key={sub}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={`/category/${cat.name.toLowerCase()}/${sub
                                      .toLowerCase()
                                      .replace(/\s+/g, '-')}`}
                                    className="hover:text-primary transition-colors block py-1"
                                  >
                                    {sub}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu - Appears when hamburger clicked */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-3 space-y-4">
                {user?.role === 'user' && (
                  <Link href="/create-shop">
                    <Button className="w-full">Create Shop</Button>
                  </Link>
                )}

                <div className="space-y-2">
                  <h3 className="font-bold px-2">Categories</h3>
                  {categories.map(category => (
                    <div key={category.name} className="border-b last:border-0">
                      <button className="w-full text-left px-2 py-3 flex justify-between items-center">
                        {category.name}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
