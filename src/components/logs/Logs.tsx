import { Alert, Flex } from 'antd';
import { formatDateWithTime } from '@/utils/date';
import { useLogsStore } from '@/store/logs';
import { useEffect } from 'react';
import { useUserStore } from '@/store/user';
import Loader from '../Loader';

const Logs = () => {
  const logsStore = useLogsStore();
  const userStore = useUserStore();

  useEffect(() => {
    logsStore.getLogs(userStore.user!.id);
  }, []);

  if (logsStore.isLoading) {
    return <Loader />;
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
