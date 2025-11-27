import { Car } from '@/types/car';
import CarInfoClient from './CarInfoClient';
import { fetchServerCarById } from '@/lib/api/serverApi';

type CarInfoPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: CarInfoPageProps) {
  const { id } = await params;
  const car = await fetchServerCarById(id);

  return {
    title: 'Rental Car App - ' + car.brand + ' ' + car.model,
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
          url: '/home/home-picture.webp',
          width: 1200,
          height: 630,
          alt: 'Rental Car App - A platform for renting cars with ease and convenience',
        },
      ],
    },
  };
}

const CarInfoPage = async ({ params }: CarInfoPageProps) => {
  const { id } = await params;
  const car = await fetchServerCarById(id);

  return <CarInfoClient car={car} />;
};

export default CarInfoPage;
