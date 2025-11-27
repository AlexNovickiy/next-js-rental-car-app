import { Manrope } from 'next/font/google';

export const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'], // Regular, Medium, SemiBold, Bold
  display: 'swap',
  variable: '--font-manrope',
});
