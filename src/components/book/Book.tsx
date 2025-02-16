import { FC } from 'react';
import PageFlip from 'react-pageflip';
import styles from './Book.module.scss';
import BookSlider from './BookSlider';
import { Feature } from '@/types/features';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useUserStore } from '@/store/user';
import { useFeaturesStore } from '@/store/features';
import { MessageInstance } from 'antd/es/message/interface';
import { useOutletContext } from 'react-router';

const Book: FC<{
  features: Feature[];
}> = ({ features }) => {
  const { messageApi } = useOutletContext<{ messageApi: MessageInstance }>();
  const userStore = useUserStore();
  const featuresStore = useFeaturesStore();

  const onRemove = (id: number) => {
    featuresStore.removeFeature(id, () => {
      messageApi.success('Запись успешно удалена!');
    });
  };

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
            <b>{feature.fields.fio}</b> родился <b>{feature.fields.years.split(' – ')[0]}</b>, погиб{' '}
            <b>{feature.fields.years.split(' – ')[1]}</b>
          </p>

          <p>
            <b>Место рождения:</b> {feature.fields.n_raion}
          </p>

          <p>{feature.fields.info}</p>

          <p>
            <b>Принимал участие в:</b> {feature.fields.kontrakt}
          </p>

          <p>
            <b>Награжден:</b> {feature.fields.nagrads}
          </p>

          {userStore.user?.is_superuser && (
            <Button
              type="primary"
              danger
              onClick={() => onRemove(feature.id)}
            >
              <DeleteOutlined />
            </Button>
          )}

          <span className={styles.number}>{index + 1}</span>
        </div>
      ))}
    </PageFlip>
  );
};

export default Book;
