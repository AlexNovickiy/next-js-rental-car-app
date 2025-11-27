'use client';

import { Car } from '@/types/car';
import Image from 'next/image';
import css from './CarInfoClient.module.css';
import mainCss from '@/app/Home.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

type CarInfoClientProps = {
  car: Car;
};

type RentalFormValues = {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
};

const rentalFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must contain at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  bookingDate: Yup.string().required('Booking date is required'),
  comment: Yup.string().max(500, 'Comment cannot exceed 500 characters'),
});

const CarInfoClient = ({ car }: CarInfoClientProps) => {
  const formatMileage = (mileage: number): string => {
    return mileage.toLocaleString('uk-UA').replace(/,/g, ' ');
  };

  const formatRentalConditions = (
    conditions: string[]
  ): Array<{ label: string; value: string }> => {
    return conditions.map(condition => {
      const parts = condition.split(':');
      if (parts.length === 2) {
        return { label: parts[0], value: parts[1] };
      }
      return { label: condition, value: '' };
    });
  };

  const handleSubmit = async (values: RentalFormValues) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Thank you! Your booking request has been received.');
    } catch (error) {
      toast.error('Error submitting form. Please try again.');
    }
  };

  const rentalConditions = formatRentalConditions(car.rentalConditions);

  return (
    <div className={css.wrapper}>
      <div className={mainCss.container}>
        <div className={css.content}>
          <div className={css.leftColumn}>
            <div className={css.imageSection}>
              <Image
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                width={640}
                height={512}
                className={css.carImage}
                priority
              />
            </div>

            <div className={css.formSection}>
              <h2 className={css.formTitle}>Book your car now</h2>
              <p className={css.formSubtitle}>
                Stay connected! We are always ready to help you.
              </p>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  bookingDate: '',
                  comment: '',
                }}
                validationSchema={rentalFormSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className={css.rentalForm}>
                    <div className={css.formGroup}>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Name*"
                        className={`${css.formInput} ${errors.name && touched.name ? css.inputError : ''}`}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className={css.errorMessage}
                      />
                    </div>

                    <div className={css.formGroup}>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email*"
                        className={`${css.formInput} ${errors.email && touched.email ? css.inputError : ''}`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={css.errorMessage}
                      />
                    </div>

                    <div className={css.formGroup}>
                      <Field
                        type="text"
                        name="bookingDate"
                        placeholder="Booking date*"
                        className={`${css.formInput} ${errors.bookingDate && touched.bookingDate ? css.inputError : ''}`}
                      />
                      <ErrorMessage
                        name="bookingDate"
                        component="div"
                        className={css.errorMessage}
                      />
                    </div>

                    <div className={css.formGroup}>
                      <Field
                        as="textarea"
                        name="comment"
                        placeholder="Comment"
                        rows={4}
                        className={`${css.formInput} ${css.formTextarea} ${errors.comment && touched.comment ? css.inputError : ''}`}
                      />
                      <ErrorMessage
                        name="comment"
                        component="div"
                        className={css.errorMessage}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={css.submitButton}
                    >
                      {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className={css.rightColumn}>
            <h1 className={css.carTitle}>
              {car.brand} <span className={css.carModel}>{car.model}</span>,{' '}
              {car.year}
              <span className={css.carId}>Id: {car.id}</span>
            </h1>

            <div className={css.carMeta}>
              <div className={css.metaItem}>
                <svg className={css.metaIcon}>
                  <use href="/sprite.svg#icon-location" />
                </svg>
                <span className={css.metaText}>
                  {car.address.split(',').slice(1).join(',').trim()}
                </span>
              </div>
              <div className={css.metaItem}>
                <span className={css.metaText}>
                  Mileage: {formatMileage(car.mileage)} km
                </span>
              </div>
            </div>

            <div className={css.priceSection}>
              <span className={css.price}>${car.rentalPrice}</span>
            </div>

            <p className={css.description}>{car.description}</p>

            <h2 className={css.specsTitle}>Car Specifications:</h2>
            <div className={css.carDetailsList}>
              <div className={css.detailRow}>
                <svg className={css.specIcon}>
                  <use href="/sprite.svg#icon-gear" />
                </svg>
                <span className={css.detailItem}>Year: {car.year}</span>
              </div>
              <div className={css.detailRow}>
                <svg className={css.specIcon}>
                  <use href="/sprite.svg#icon-car" />
                </svg>
                <span className={css.detailItem}>Type: {car.type}</span>
              </div>
              <div className={css.detailRow}>
                <svg className={css.specIcon}>
                  <use href="/sprite.svg#icon-fuel-pump" />
                </svg>
                <span className={css.detailItem}>
                  Fuel Consumption: {car.fuelConsumption}
                </span>
              </div>
              <div className={css.detailRow}>
                <svg className={css.specIcon}>
                  <use href="/sprite.svg#icon-gear" />
                </svg>
                <span className={css.detailItem}>
                  Engine Size: {car.engineSize}
                </span>
              </div>
            </div>

            <div className={css.specsSection}>
              <h2 className={css.specsTitle}>
                Accessories and functionalities:
              </h2>
              <div className={css.specsList}>
                {car.accessories.map((accessory, index) => (
                  <div key={`acc-${index}`} className={css.specsRow}>
                    <svg className={css.specIcon}>
                      <use href="/sprite.svg#icon-check-circle" />
                    </svg>
                    <span className={css.specItem}>{accessory}</span>
                  </div>
                ))}
                {car.functionalities.map((functionality, index) => (
                  <div key={`func-${index}`} className={css.specsRow}>
                    <svg className={css.specIcon}>
                      <use href="/sprite.svg#icon-check-circle" />
                    </svg>
                    <span className={css.specItem}>{functionality}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={css.conditionsSection}>
              <h2 className={css.conditionsTitle}>Rental Conditions:</h2>
              <div className={css.conditionsList}>
                {rentalConditions.map((condition, index) => (
                  <div key={index} className={css.conditionItem}>
                    <svg className={css.conditionIcon}>
                      <use href="/sprite.svg#icon-check-circle" />
                    </svg>
                    <span className={css.conditionText}>
                      {condition.label}
                      {condition.value && (
                        <>
                          :{' '}
                          <span className={css.conditionValue}>
                            {condition.value}
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInfoClient;
