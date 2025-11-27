import { Car } from '@/types/car';
import css from './CarsList.module.css';
import CarsItem from '@/components/CarsItem/CarsItem';
import MessageNoCars from '../MessageNoCars/MessageNoCars';
import { useCarStore } from '@/lib/store/carStore';

type CarsListProps = {
  cars: Car[];
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  isLoading?: boolean;
};

const CarsList = ({
  cars,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  isLoading,
}: CarsListProps) => {
  const removeFilters = useCarStore(state => state.removeFilters);

  const handleNoCars = () => {
    removeFilters();
  };

  return (
    <>
      <ul className={css.carsList}>
        {cars.length > 0
          ? cars.map(car => <CarsItem key={car.id} car={car} />)
          : !isLoading && <MessageNoCars onClick={handleNoCars} />}
      </ul>
      {fetchNextPage && hasNextPage && (
        <button
          className={css.loadMoreButton}
          onClick={fetchNextPage}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </>
  );
};

export default CarsList;
