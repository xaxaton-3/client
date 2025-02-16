import { useState, useEffect } from 'react';
import { ConfigProvider, Flex, Spin } from 'antd';
import locale from 'antd/locale/ru_RU';
import Router from './components/Router';
import { useUserStore } from './store/user';

const App = () => {
  const userStore = useUserStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      userStore.auth().finally(() => {
        setIsReady(true);
      });
    } else {
      setIsReady(true);
    }
  }, []);

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: '#df5707' } }}
      locale={locale}
    >
      {isReady ? (
        <Router />
      ) : (
        <Flex
          justify="center"
          align="center"
          style={{
            width: '100vw',
            height: '100vh',
          }}
        >
          <Spin size="large" />
        </Flex>
      )}
    </ConfigProvider>
  );
};

export default App;
