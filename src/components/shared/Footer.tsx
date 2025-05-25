import logo from "../../../public/logo.png";
import { Facebook, Instagram, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/products", label: "App Products" },
    { href: "/about", label: "About Us" },
    { href: "/testimonial", label: "Testimonial" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook },
    { href: "#", icon: Instagram },
    { href: "#", icon: X },
  ];

  return (
    <footer className="bg-secondary border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          {/* Logo with proper responsive sizing */}
          <div className="relative w-32 h-12 md:w-40 mb-4">
            <Image
              src={logo}
              alt="SwiftCart Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-gray-600 mt-2 md:mt-3 w-full md:w-1/2 text-sm md:text-xs leading-5 md:leading-6 text-center">
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

        {/* Social links */}
        <div className="flex justify-center space-x-4 md:space-x-6 mb-6">
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
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500 mt-8 text-center">
          © {new Date().getFullYear()} SwiftCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
