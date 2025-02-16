import Container from '@/components/Container';
import { useRequestsStore } from '@/store/requests';
import { formatDate } from '@/utils/date';
import { Alert, Flex, Spin } from 'antd';
import { useEffect } from 'react';
import { NavLink } from 'react-router';

const Requests = () => {
  const requestsStore = useRequestsStore();

  useEffect(() => {
    requestsStore.getRequests();
  }, []);

  if (requestsStore.isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Container>
      <div>
        {requestsStore.requests.map((request) => (
          <NavLink to={`/requests/${request.id}`}>
            <Alert
              key={request.id}
              message={
                <Flex
                  vertical
                  gap={8}
                >
                  <Flex justify="space-between">
                    <span>{request.meta.feature.name}</span>
                    <span>{`${formatDate(request.meta.feature.birthDate)} – ${formatDate(
                      request.meta.feature.deathDate,
                    )}`}</span>
                  </Flex>

                  <span>{request.meta.feature.district}</span>

                  <span>{request.meta.feature.location}</span>
                </Flex>
              }
              type="info"
              style={{ marginBottom: 8 }}
            />
          </NavLink>
        ))}
      </div>
    </Container>
  );
};

export default Requests;
