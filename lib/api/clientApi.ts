import { Car, CarsResponse } from '@/types/car';
import nextServer from './nextServer';

export type CarsParams = {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  limit?: string;
  page?: string;
};

export const fetchCars = async (params?: CarsParams): Promise<CarsResponse> => {
  const queryParams = {
    ...(params?.brand && { brand: params.brand }),
    ...(params?.rentalPrice && { rentalPrice: params.rentalPrice }),
    ...(params?.minMileage && { minMileage: params.minMileage }),
    ...(params?.maxMileage && { maxMileage: params.maxMileage }),
    limit: params?.limit || '12',
    page: params?.page || '1',
  };
  const response = await nextServer.get<CarsResponse>('api/cars', {
    params: queryParams,
  });
  return response.data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await nextServer.get<Car>(`/api/cars/${id}`);
  return response.data;
};

export const fetchCarBrands = async (): Promise<string[]> => {
  const response = await nextServer.get<string[]>('/api/brands');
  return response.data;
};
