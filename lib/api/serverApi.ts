import { Car, CarsResponse } from '@/types/car';
import nextServer from './nextServer';
import { CarsParams } from './clientApi';
import next from 'next';

export const fetchServerCars = async (
  params?: CarsParams
): Promise<CarsResponse> => {
  const queryParams = {
    ...(params?.brand && { brand: params.brand }),
    ...(params?.rentalPrice && { rentalPrice: params.rentalPrice }),
    ...(params?.minMileage && { minMileage: params.minMileage }),
    ...(params?.maxMileage && { maxMileage: params.maxMileage }),
    limit: params?.limit || '12',
    page: params?.page || '1',
  };
  const response = await nextServer.get<CarsResponse>(`/api/cars`, {
    params: queryParams,
  });
  return response.data;
};

export const fetchServerCarById = async (id: string): Promise<Car> => {
  const response = await nextServer.get<Car>(`/api/cars/${id}`);
  return response.data;
};

export const fetchServerCarBrands = async (): Promise<string[]> => {
  const response = await nextServer.get<string[]>('/api/brands');
  return response.data;
};
