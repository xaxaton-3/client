import { Alert, Flex, Spin } from 'antd';
import { formatDateWithTime } from '@/utils/date';
import { useLogsStore } from '@/store/logs';
import { useEffect } from 'react';

const Logs = () => {
  const logsStore = useLogsStore();

  useEffect(() => {
    logsStore.getLogs(1);
  }, []);

  if (logsStore.isLoading) {
    return <Spin size="large" />;
  }

  if (!logsStore.logs.length) {
    return (
      <div>
        {Array.from({ length: 10 }).map(() => (
          <Alert
            key={Math.random()}
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
