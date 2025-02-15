import { Alert, Flex } from 'antd';
import { formatDateWithTime } from '@/utils/date';

const Notifications = () => {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, i) => (
        <Alert
          message={
            <Flex justify="space-between">
              <span>{i % 2 ? 'Ваша заявка одобрена' : 'Ваша заявка отклонена'}</span>
              <span>{formatDateWithTime(undefined)}</span>
            </Flex>
          }
          type={i % 2 ? 'success' : 'error'}
          style={{ marginBottom: 8 }}
        />
      ))}
    </div>
  );
};

export default Notifications;
