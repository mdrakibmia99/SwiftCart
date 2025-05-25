'use client';

import { Facebook, Instagram, X } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Footer = () => {
  const navLinks = [
    { href: '/', label: 'Home' },
    // { href: '/shop', label: 'Shop' },
    { href: '/products', label: 'All Products' },
    { href: '/about', label: 'About Us' },
    { href: '/testimonial', label: 'Testimonial' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const socialLinks = [
    { href: 'https://www.facebook.com/mdkhaledsshuvo', icon: Facebook },
    { href: 'https://www.instagram.com/mdkhaledsshuvo', icon: Instagram },
    { href: 'https://x.com/mdkhaledsshuvo', icon: X },
  ];

  return (
    <footer className="bg-secondary border-t border-gray-200 py-24">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center mb-6">
          {/* <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black flex items-center">
              <Logo />
              SwiftCart
            </h1>
          </div> */}
          <Link href="/" className="shrink-0">
            <motion.div
              className="relative w-28 h-10 md:w-40 md:h-12"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Image
                src="/logo.png"
                alt="SwiftCart Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 7rem, (max-width: 1024px) 10rem, 12rem"
              />
            </motion.div>
          </Link>
          <p className="text-gray-600 mt-3 w-1/2 text-xs leading-6">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>
        </div>

        <hr className="my-6" />

        {/* Responsive navigation links */}
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-800 font-medium my-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-purple-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
<<<<<<<<< Temporary merge branch 1

        {/* social Links */}
        {/* <div className="flex justify-center space-x-4">
=========
        {/* Social links */}
        <div className="flex justify-center space-x-4 md:space-x-6 mb-6">
          {/* social Links */}
          {/* <div className="flex justify-center space-x-4">
>>>>>>>>> Temporary merge branch 2
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <Link
              href={href}
              key={index}
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
              aria-label={Icon.name}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          ))}
        </div> */}

        <div className="flex justify-center space-x-4 mt-6">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 transition-all duration-300 ease-in-out transform hover:bg-white hover:scale-150 hover:border hover:border-white cursor-pointer"
            >
              <Icon className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors duration-300 ease-in-out" />
            </Link>
          ))}
        </div>

<<<<<<<<< Temporary merge branch 1
        {/* Copyright */}
        <div className="text-sm text-gray-500 mt-8 text-center">
          ©{new Date().getFullYear()} SwiftCart. All rights reserved.
=========
          {/* Copyright */}
          <div className="text-xs text-gray-500 mt-8 text-center">
            © {new Date().getFullYear()} SwiftCart. All rights reserved.
          </div>
>>>>>>>>> Temporary merge branch 2
        </div>
      </div>
    </footer>
  );
};

export default Footer;
