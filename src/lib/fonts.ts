import {
  Poppins,
  Source_Sans_3,
  Quintessential,
  Sour_Gummy,
  Playfair_Display,
} from 'next/font/google';

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
});
export const poppins = Poppins({ subsets: ['latin'], weight: '400' });
export const sourceSans = Source_Sans_3({ subsets: ['latin'] });
export const quintessential = Quintessential({
  subsets: ['latin'],
  weight: '400',
});
export const sourGummy = Sour_Gummy({ subsets: ['latin'], weight: '400' });
