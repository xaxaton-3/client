import { FC } from 'react';
import PageFlip from 'react-pageflip';
import styles from './Book.module.scss';
import BookSlider from './BookSlider';
import { Feature } from '@/types/features';

const Book: FC<{
  features: Feature[];
}> = ({ features }) => {
  return (
    // @ts-ignore
    <PageFlip
      className={styles.book}
      width={500}
      height={600}
    >
      {features.map((feature, index) => (
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
