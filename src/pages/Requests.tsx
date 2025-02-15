import Container from '@/components/Container';
import { useRequestsStore } from '@/store/requests';
import { Alert, Spin } from 'antd';
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
              message={request.meta.feature.name}
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
