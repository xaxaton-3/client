import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from '@/api/features';
import FeaturesForm, { FeaturesFormValues } from '@/components/features/FeaturesForm';
import { useLogsStore } from '@/store/logs';
import { useRequestsStore } from '@/store/requests';
import { RequestMeta } from '@/types/requests';
import { formatDate } from '@/utils/date';
import { useUserStore } from '@/store/user';
import { useOutletContext } from 'react-router';
import { MessageInstance } from 'antd/es/message/interface';
import { useState } from 'react';
import { Form, Input } from 'antd';
import Container from '@/components/Container';

const NewRequest = () => {
  const { messageApi } = useOutletContext<{ messageApi: MessageInstance }>();
  const [email, setEmail] = useState('');
  const userStore = useUserStore();
  const logsStore = useLogsStore();
  const requestsStore = useRequestsStore();

  const onSubmit = async ({ files, ...values }: FeaturesFormValues) => {
    try {
      let attachments: RequestMeta['attachments'] = [];

      if (files?.length) {
        const filesPromises = files.map((file) => {
          const data = new FormData();
          data.append('file', file.originFileObj!);
          data.append('name', `${uuidv4()}-${file.name}`);
          return uploadFile(data);
        });

        const res = await Promise.all(filesPromises);

        attachments.push(...res.map((attachment) => attachment.upload_meta[0]));
      }

      requestsStore
        .createRequest({
          userId: userStore.user?.id || 0,
          feature: {
            ...values,
            birthDate: formatDate(values.birthDate, 'YYYY-MM-DD'),
            deathDate: formatDate(values.deathDate, 'YYYY-MM-DD'),
          },
          attachments,
          email: userStore.user ? undefined : email,
        })
        .then(() => {
          messageApi.success('Заявка успешно отправлена!');
          if (userStore.user) {
            logsStore.createLog({ log: 'Отправка заявки', user: userStore.user.id });
          }
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {!userStore.user && (
        <Container style={{ marginBottom: 16 }}>
          <Form.Item
            label="Email"
            name="email"
            style={{ marginBottom: 0 }}
            rules={[{ type: 'email', message: 'Некорректный email!' }]}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите email"
            />
          </Form.Item>
        </Container>
      )}

      <FeaturesForm
        isLoading={requestsStore.isLoading}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default NewRequest;
