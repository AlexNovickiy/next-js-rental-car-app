import { Car } from '@/types/car';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CarStore = {
  cars: Car[];
  addCars: (cars: Car[]) => void;
  removeCars: () => void;
  filters: {
    brand: string;
    rentalPrice: string;
    minMileage: string;
    maxMileage: string;
  };
  editFilters: (filters: Partial<CarStore['filters']>) => void;
  removeFilters: () => void;
  favorites: Car[];
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: string) => void;
};

const initialFilters = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

export const useCarStore = create<CarStore>()(
  persist(
    set => {
      return {
        cars: [],
        addCars: (cars: Car[]) =>
          set(state => ({ cars: [...state.cars, ...cars] })),
        removeCars: () => set({ cars: [] }),
        filters: initialFilters,
        editFilters: (filters: Partial<CarStore['filters']>) =>
          set(state => ({ filters: { ...state.filters, ...filters } })),
        removeFilters: () => set({ filters: initialFilters }),
        favorites: [],
        addToFavorites: (car: Car) =>
          set(state => ({ favorites: [...state.favorites, car] })),
        removeFromFavorites: (carId: string) =>
          set(state => ({
            favorites: state.favorites.filter(car => car.id !== carId),
          })),
      };
    },
    {
      name: 'car-store',
      partialize: state => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);
