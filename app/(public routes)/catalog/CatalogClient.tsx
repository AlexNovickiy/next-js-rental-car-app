'use client';

import mainCss from '@/app/Home.module.css';
import css from './CatalogPage.module.css';
import Filters from '@/components/Filters/Filters';
import CarsList from '@/components/CarsList/CarsList';
import { fetchCarBrands, fetchCars } from '@/lib/api/clientApi';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { useCarStore } from '@/lib/store/carStore';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

const CatalogClient = () => {
  const cars = useCarStore(state => state.cars);
  const addCars = useCarStore(state => state.addCars);
  const removeCars = useCarStore(state => state.removeCars);
  const filters = useCarStore(state => state.filters);
  const removeFilters = useCarStore(state => state.removeFilters);

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => fetchCarBrands(),
    refetchOnMount: false,
  });

  const { fetchNextPage, isFetchingNextPage, hasNextPage, isError, error } =
    useInfiniteQuery({
      queryKey: ['cars', filters],
      queryFn: async ({ pageParam = 1 }) => {
        const data = await fetchCars({
          ...filters,
          page: (pageParam as number).toString(),
        });

        if (pageParam === 1) {
          removeCars();
        }
        addCars(data.cars);
        return data;
      },
      getNextPageParam: lastPage =>
        lastPage.totalPages > lastPage.page
          ? Number(lastPage.page) + 1
          : undefined,
      initialPageParam: 1,
      refetchOnMount: false,
      placeholderData: keepPreviousData,
    });

  return (
    <div className={css.catalogWrapper}>
      <div className={mainCss.container}>
        <div className={css.contentWrapper}>
          <Filters brands={brands} />
          <CarsList
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            cars={cars}
          />
          {isError && !isFetchingNextPage && (
            <ErrorMessage errorMessage={error.message} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogClient;
