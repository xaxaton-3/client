import { FC, useEffect } from 'react';
import PageFlip from 'react-pageflip';
import styles from './Book.module.scss';
import BookSlider from './BookSlider';
import EditFeature from '@/components/features/EditFeature';
import { Feature } from '@/types/features';
import { Button, Flex } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useUserStore } from '@/store/user';
import { useFeaturesStore } from '@/store/features';
import { MessageInstance } from 'antd/es/message/interface';
import { useOutletContext } from 'react-router';
import { useLogsStore } from '@/store/logs';

const Book: FC<{
  features: Feature[];
}> = ({ features }) => {
  const { messageApi } = useOutletContext<{ messageApi: MessageInstance }>();
  const logsStore = useLogsStore();
  const userStore = useUserStore();
  const featuresStore = useFeaturesStore();

  const onRemove = (id: number) => {
    featuresStore.removeFeature(id, () => {
      messageApi.success('Запись успешно удалена!');
    });
  };

  useEffect(() => {
    if (userStore.user) {
      logsStore.createLog({
        user: userStore.user.id,
        log: 'Просмотр книги',
      });
    }
  }, [userStore.user]);

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
            <Flex gap={8}>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onRemove(feature.id)}
              />

              <EditFeature feature={feature} />
            </Flex>
          )}

          <span className={styles.number}>{index + 1}</span>
        </div>
      ))}
    </PageFlip>
  );
};

export default Book;
