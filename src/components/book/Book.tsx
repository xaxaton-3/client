import { FC } from 'react';
import PageFlip from 'react-pageflip';
import styles from './Book.module.scss';

const Book: FC = () => {
  return (
    // @ts-ignore
    <PageFlip
      className={styles.book}
      width={500}
      height={600}
    >
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className={styles.page}
        >
          <span className={styles.number}>{i + 1}</span>
        </div>
      ))}
    </PageFlip>
  );
};

export default Book;
