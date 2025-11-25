import type { Metadata } from 'next';
import { manrope } from './fonts';
import 'modern-normalize';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'Rental Car App',
  description: 'A platform for renting cars with ease and convenience',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Rental Car App',
    description: 'A platform for renting cars with ease and convenience',
    url: 'https://localhost:3000',
    images: [
      {
        url: '/home/home-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Rental Car App - A platform for renting cars with ease and convenience',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <TanStackProvider>
          <Toaster position="top-right" />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
