import { useCarStore } from '@/lib/store/carStore';
import Image from 'next/image';
import css from './CarsItem.module.css';
import { Car } from '@/types/car';
import Link from 'next/link';

type CarsItemProps = {
  car: Car;
};

const CarsItem = ({ car }: CarsItemProps) => {
  const favorites = useCarStore(state => state.favorites);
  const addToFavorites = useCarStore(state => state.addToFavorites);
  const removeFromFavorites = useCarStore(state => state.removeFromFavorites);

  const onClickfavorite = () => {
    if (favorites.some(favCar => favCar.id === car.id)) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  return (
    <li className={css.carItem}>
      <div className={css.imageWrapper}>
        <Image
          className={css.carImage}
          src={car.img}
          alt={car.description ?? 'Car Image'}
          width={276}
          height={268}
          priority={true}
        ></Image>
        <button
          type="button"
          className={css.favoriteButton}
          onClick={onClickfavorite}
          aria-label="Add to favorites"
        >
          <svg className={css.favoriteIcon}>
            <use
              href={`/sprite.svg#${favorites.some(favCar => favCar.id === car.id) ? 'icon-heart-favorite' : 'icon-heart'}`}
            />
          </svg>
        </button>
      </div>
      <div className={css.carInfo}>
        <h3 className={css.carTitle}>
          {car.brand}&nbsp;<span className={css.carModel}>{car.model}</span>,{' '}
          {car.year}
          <span className={css.carPrice}>${car.rentalPrice}</span>
        </h3>
        <ul className={css.carDetails}>
          <li className={css.carDetailsItem}>{car.address.split(',')[1]}</li>
          <li className={css.carDetailsItem}>{car.address.split(',')[2]}</li>
          <li className={css.carDetailsItem}>{car.rentalCompany}</li>
          <li className={css.carDetailsItem}>{car.type}</li>
          <li className={css.carDetailsItem}>
            {car.mileage.toLocaleString('uk-UA')} km
          </li>
        </ul>
      </div>
      <Link className={css.carInfoLink} href={`/catalog/${car.id}`}>
        Read more
      </Link>
    </li>
  );
};

export default CarsItem;
