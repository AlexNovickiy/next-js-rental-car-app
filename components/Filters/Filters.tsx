import { useState, useEffect } from 'react';
import css from './Filters.module.css';
import { useCarStore } from '@/lib/store/carStore';

type FiltersProps = {
  brands?: string[];
};

const Filters = ({ brands }: FiltersProps) => {
  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const filters = useCarStore(state => state.filters);
  const editFilters = useCarStore(state => state.editFilters);
  const [newFilters, setNewFilters] = useState({ ...filters });

  useEffect(() => {
    setNewFilters({ ...filters });
  }, [filters]);

  const formatNumber = (value: string) => {
    const num = value.replace(/\D/g, '');
    return num ? Number(num).toLocaleString('en-US') : '';
  };

  const handleMileageChange = (
    field: 'minMileage' | 'maxMileage',
    value: string
  ) => {
    const numericValue = value.replace(/\D/g, '');
    setNewFilters({ ...newFilters, [field]: numericValue });
  };

  const onClickDropdown = (field: 'brand' | 'rentalPrice', value: string) => {
    if (field === 'brand') {
      setIsOpenBrand(!isOpenBrand);
      setNewFilters({ ...newFilters, brand: value });
    } else if (field === 'rentalPrice') {
      setIsOpenPrice(!isOpenPrice);
      setNewFilters({ ...newFilters, rentalPrice: value });
    }
  };

  return (
    <div className={css.filtersWrapper}>
      <div className={css.filters}>
        <div className={css.dropdown}>
          <p className={css.dropdownLabel}>Car brand</p>
          <button
            className={css.dropdownToggle}
            onClick={() => setIsOpenBrand(!isOpenBrand)}
          >
            {newFilters.brand || 'Choose a brand'}
            <svg className={css.arrow}>
              <use
                href={`/sprite.svg#${isOpenBrand ? 'icon-arrow-up' : 'icon-arrow-down'}`}
              />
            </svg>
          </button>

          {isOpenBrand && (
            <ul className={css.dropdownMenu}>
              <li
                className={css.dropdownItem}
                onClick={() => onClickDropdown('brand', '')}
              >
                All brands
              </li>
              {brands?.map(brand => (
                <li
                  key={brand}
                  className={css.dropdownItem}
                  onClick={() => onClickDropdown('brand', brand)}
                >
                  {brand}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={css.dropdown}>
          <p className={css.dropdownLabel}>Price/ 1 hour</p>
          <button
            className={css.dropdownToggle}
            onClick={() => setIsOpenPrice(!isOpenPrice)}
          >
            {`To $${newFilters.rentalPrice}` || 'Choose a price'}
            <svg className={css.arrow}>
              <use
                href={`/sprite.svg#${isOpenPrice ? 'icon-arrow-up' : 'icon-arrow-down'}`}
              />
            </svg>
          </button>

          {isOpenPrice && (
            <ul className={css.dropdownMenu}>
              <li
                className={css.dropdownItem}
                onClick={() => onClickDropdown('rentalPrice', '')}
              >
                All prices
              </li>
              {Array.from({ length: 17 }, (_, i) => (i + 1) * 10).map(price => (
                <li
                  key={price}
                  className={css.dropdownItem}
                  onClick={() =>
                    onClickDropdown('rentalPrice', price.toString())
                  }
                >
                  {price}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={css.mileage}>
          <label htmlFor="minMileage" className={css.mileageLabel}>
            Car mileage / km
          </label>
          <div className={css.mileageInputs}>
            <div className={css.mileageInputWrapper}>
              <label htmlFor="minMileage" className={css.mileagePrefix}>
                From&nbsp;
              </label>
              <input
                type="text"
                className={css.mileageInput}
                id="minMileage"
                name="minMileage"
                pattern="[0-9,]*"
                value={formatNumber(newFilters.minMileage || '')}
                onChange={e =>
                  handleMileageChange('minMileage', e.target.value)
                }
              />
            </div>
            <div className={css.mileageInputWrapper}>
              <label htmlFor="maxMileage" className={css.mileagePrefix}>
                To&nbsp;
              </label>
              <input
                type="text"
                className={css.mileageInput}
                id="maxMileage"
                name="maxMileage"
                pattern="[0-9,]*"
                value={formatNumber(newFilters.maxMileage || '')}
                onChange={e =>
                  handleMileageChange('maxMileage', e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <button
          className={css.searchButton}
          onClick={() => editFilters(newFilters)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filters;
