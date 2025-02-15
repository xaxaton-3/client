import { Alert, Flex } from 'antd';
import { formatDateWithTime } from '@/utils/date';

const Logs = () => {
  return (
    <div>
      {Array.from({ length: 10 }).map(() => (
        <Alert
          message={
            <Flex justify="space-between">
              <span>Отправка заявки</span>
              <span>{formatDateWithTime(undefined)}</span>
            </Flex>
          }
          type="info"
          style={{ marginBottom: 8 }}
        />
      ))}
    </div>
  );
};

export default Logs;
