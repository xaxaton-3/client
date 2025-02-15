import { FC } from 'react';
import PageFlip from 'react-pageflip';
import { useFeaturesStore } from '@/store/features';
import styles from './Book.module.scss';
import BookSlider from './BookSlider';

const Book: FC = () => {
  const featuresStore = useFeaturesStore();

  return (
    // @ts-ignore
    <PageFlip
      className={styles.book}
      width={500}
      height={600}
    >
      {featuresStore.features.map((feature, index) => (
        <div
          className={styles.page}
          key={feature.id}
        >
          {feature.extensions.attachment?.length && (
            <BookSlider
              featureId={feature.id}
              attachments={feature.extensions.attachment}
            />
          )}

          <p>
            {feature.fields.fio} ({feature.fields.years})
          </p>

          <p>{feature.fields.n_raion}</p>

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
