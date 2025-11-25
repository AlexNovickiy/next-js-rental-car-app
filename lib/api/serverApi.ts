import { Car, CarsResponse } from '@/types/car';
import nextServer from './nextServer';
import { CarsParams } from './clientApi';
import next from 'next';
import nextClient from './nextClient';

export const fetchServerCars = async ({
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
  limit = '12',
  page = '1',
}: CarsParams): Promise<CarsResponse> => {
  const params = {
    ...(brand && { brand }),
    ...(rentalPrice && { rentalPrice }),
    ...(minMileage && { minMileage }),
    ...(maxMileage && { maxMileage }),
    limit,
    page,
  };
  const response = await nextServer.get<CarsResponse>('/api/cars', {
    params,
  });
  return response.data;
};

export const fetchServerCarById = async (id: string): Promise<Car> => {
  const response = await nextServer.get<Car>(`/cars/${id}`);
  return response.data;
};

export const fetchServerCarBrands = async (): Promise<string[]> => {
  const response = await nextServer.get<string[]>('/brands');
  return response.data;
};
