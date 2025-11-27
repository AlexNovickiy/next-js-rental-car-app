import mainCss from '../Home.module.css';
import css from './CatalogPage.module.css';
import Filters from '@/components/Filters/Filters';
import CatalogClient from './CatalogClient';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchServerCarBrands, fetchServerCars } from '@/lib/api/serverApi';

const CatalogPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['brands'],
    queryFn: async () => fetchServerCarBrands(),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cars'],
    queryFn: async ({ pageParam = 1 }) => fetchServerCars(),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
};

export default CatalogPage;
