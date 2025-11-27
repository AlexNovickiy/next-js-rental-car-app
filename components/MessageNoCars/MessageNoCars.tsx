'use client';

import React from 'react';
import { useCallback } from 'react';
import styles from './MessageNoCars.module.css';

import { useRouter } from 'next/navigation';

export type MessageNoCarsProps = {
  /**
   * Текст сповіщення, який відображається користувачу.
   */
  text?: string;
  /**
   * Текст на кнопці дії.
   */
  buttonText?: string;
  /**
   * Маршрут для навігації (використовується, якщо не передано onClick).
   */
  route?: '/' | '/catalog' | string;
  /**
   * Опціональний обробник кліку. Якщо передано, використовуємо його замість навігації.
   */
  onClick?: () => void;
  /**
   * Опціональний клас для додаткового стилювання контейнера.
   */
  className?: string;
};

const MessageNoCars = ({
  text = 'No cars found matching your criteria',
  buttonText = 'Reset Filters',
  route = '/catalog',
  onClick,
  className,
}: MessageNoCarsProps) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
      return;
    }

    router.push(route);
  }, [onClick, route, router]);

  const wrapperClassName = [styles.container, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={wrapperClassName} role="alert">
      <p className={styles.text}>{text}</p>
      <button type="button" className={styles.button} onClick={handleClick}>
        {buttonText}
      </button>
    </section>
  );
};

export default MessageNoCars;
