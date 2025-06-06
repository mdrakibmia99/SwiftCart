import type { Metadata } from 'next';
import { Imprima } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Providers from '@/providers/Providers';

const imprima = Imprima({
  subsets: ['latin'],
  weight: '400', // only available weight
});

export const metadata: Metadata = {
  title: 'SwiftCart',
  description: 'E-commerce site built with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${imprima.className}  antialiased `}>
        <Providers>
          <Toaster
            richColors
            toastOptions={{
              style: {
                background: '#e3f4fa',
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
