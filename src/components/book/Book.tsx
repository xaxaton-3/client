import { FC } from 'react';
import PageFlip from 'react-pageflip';
import styles from './Book.module.scss';
import { features as data } from '@/data/features';
import { useFeaturesStore } from '@/store/features';

const Book: FC = () => {
  const { features } = useFeaturesStore();

  return (
    // @ts-ignore
    <PageFlip
      className={styles.book}
      width={500}
      height={600}
    >
      {[...features, ...data].map((feature, index) => (
        <div className={styles.page}>
          <p>{feature.fields.n_raion}</p>
          <p>
            {feature.fields.fio} ({feature.fields.years})
          </p>
          <p>{feature.fields.info}</p>
          <p>{feature.fields.kontrakt}</p>
          <p>{feature.fields.nagrads}</p>
          <span className={styles.number}>{index + 1}</span>
        </div>
      ))}
    </PageFlip>
  );
};

export default Book;
