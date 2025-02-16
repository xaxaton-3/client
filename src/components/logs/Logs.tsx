import { Alert, Flex } from 'antd';
import { formatDateWithTime } from '@/utils/date';
import { useLogsStore } from '@/store/logs';
import { FC, useEffect } from 'react';
import Loader from '../Loader';

const Logs: FC<{ userId: number }> = ({ userId }) => {
  const logsStore = useLogsStore();

  useEffect(() => {
    logsStore.getLogs(userId);
  }, []);

  if (logsStore.isLoading) {
    return <Loader />;
  }

  if (!logsStore.logs.length) {
    return 'Действий нет';
  }

  return (
    <div>
      {logsStore.logs.map((log) => (
        <Alert
          key={log.id}
          message={
            <Flex justify="space-between">
              <span>{log.log}</span>
              <span>{formatDateWithTime(log.datetime)}</span>
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
