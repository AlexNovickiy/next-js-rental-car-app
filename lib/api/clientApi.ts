import { Car, CarsResponse } from '@/types/car';
import nextClient from './nextClient';

export type CarsParams = {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
  limit: string;
  page: string;
};

export const fetchCars = async ({
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
  const response = await nextClient.get<CarsResponse>('/cars', {
    params,
  });
  return response.data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await nextClient.get<Car>(`/cars/${id}`);
  return response.data;
};

export const fetchCarBrands = async (): Promise<string[]> => {
  const response = await nextClient.get<string[]>('/brands');
  return response.data;
};
