import Loader from '@/components/Loader';
import FeaturesForm, { FeaturesFormValues } from '@/components/features/FeaturesForm';
import { districtsMap } from '@/data/districts';
import { useFeaturesStore } from '@/store/features';
import { useLogsStore } from '@/store/logs';
import { useNotificationsStore } from '@/store/notifications';
import { useRequestsStore } from '@/store/requests';
import { useUserStore } from '@/store/user';
import { FeatureParams } from '@/types/features';
import { NotificationStatus } from '@/types/notifications';
import { formatDate, formatDateWithTime } from '@/utils/date';
import { Button } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router';

const Requests = () => {
  const params = useParams();
  const navigate = useNavigate();
  const requestsStore = useRequestsStore();
  const featuresStore = useFeaturesStore();
  const logsStore = useLogsStore();
  const notificationsStore = useNotificationsStore();
  const userStore = useUserStore();
  const { messageApi } = useOutletContext<{ messageApi: MessageInstance }>();

  const id = Number(params.id);
  const request = requestsStore.requests.find((request) => request.id === id);

  useEffect(() => {
    requestsStore.getRequests();
  }, []);

  const onCreate = async (values: FeaturesFormValues) => {
    const district = districtsMap[values.district];

    const params: FeatureParams = {
      extensions: {
        attachment: null,
        description: null,
      },
      fields: {
        n_raion: district.name,
        fio: values.name,
        years: `${formatDate(values.birthDate)} – ${formatDate(values.deathDate)}`,
        info: values.info,
        kontrakt: values.location,
        nagrads: values.rewards,
      },
      geom: `POINT (${district.latitude} ${district.longitude})`,
    };

    featuresStore.createFeature(params, request?.meta.attachments || []).then(() => {
      messageApi.success('Заявка успешно принята!');
      navigate('/requests');
      logsStore.createLog({
        user: userStore.user!.id,
        log: 'Принятие заявки',
      });
      notificationsStore.createNotification({
        message: `Ваша заявка о ${request?.meta.feature.name} принята ${formatDateWithTime(
          undefined,
        )}`,
        status: NotificationStatus.Success,
        to_user: request!.meta.userId,
        email: request!.meta.email || undefined,
      });
      requestsStore.removeRequest(id);
    });
  };

  const onCancel = async () => {
    requestsStore.removeRequest(id).then(() => {
      messageApi.success('Заявка успешно отклонена!');
      navigate('/requests');
      logsStore.createLog({
        user: userStore.user!.id,
        log: 'Отклонение заявки',
      });
      notificationsStore.createNotification({
        message: `Ваша заявка о ${request?.meta.feature.name} отклонена ${formatDateWithTime(
          undefined,
        )}`,
        status: NotificationStatus.Error,
        to_user: request!.meta.userId,
        email: request!.meta.email || undefined,
      });
    });
  };

  if (requestsStore.isLoading) {
    return <Loader />;
  }

  return (
    request && (
      <>
        <FeaturesForm
          initialValues={{
            ...request.meta.feature,
            files: [],
            birthDate: dayjs(request.meta.feature.birthDate),
            deathDate: dayjs(request.meta.feature.deathDate),
          }}
          isLoading={requestsStore.isLoading}
          withUpload={false}
          onSubmit={onCreate}
        >
          <Button
            type="primary"
            loading={requestsStore.isLoading}
            onClick={onCancel}
          >
            Отклонить
          </Button>
        </FeaturesForm>
      </>
    )
  );
};

export default Requests;
