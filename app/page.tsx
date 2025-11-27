import css from '@/app/Home.module.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.contentWrapper}>
          <div className={css.textWrapper}>
            <h1 className={css.title}>Find your first rental car</h1>
            <h2 className={css.subtitle}>
              Reliable and budget-friendly rentals for any journey
            </h2>
          </div>
          <Link href="/catalog" className={css.button}>
            View Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
