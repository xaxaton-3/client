import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from '@/api/features';
import FeaturesForm, { FeaturesFormValues } from '@/components/features/FeaturesForm';
import { useLogsStore } from '@/store/logs';
import { useRequestsStore } from '@/store/requests';
import { RequestMeta } from '@/types/requests';
import { formatDate } from '@/utils/date';
import { useUserStore } from '@/store/user';

const NewRequest = () => {
  const userStore = useUserStore();
  const logsStore = useLogsStore();
  const requestsStore = useRequestsStore();

  const onSubmit = async ({ files, ...values }: FeaturesFormValues) => {
    try {
      let attachments: RequestMeta['attachments'] = [];

      if (files.length) {
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
          userId: userStore.user!.id,
          feature: {
            ...values,
            birthDate: formatDate(values.birthDate, 'YYYY-MM-DD'),
            deathDate: formatDate(values.deathDate, 'YYYY-MM-DD'),
          },
          attachments,
        })
        .then(() => {
          logsStore.createLog({ log: 'Отправка заявки', user: userStore.user!.id });
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <FeaturesForm
      isLoading={requestsStore.isLoading}
      onSubmit={onSubmit}
    />
  );
};

export default NewRequest;
