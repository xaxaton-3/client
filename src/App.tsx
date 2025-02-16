import { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';
import Router from './components/Router';
import { useUserStore } from './store/user';
import Loader from './components/Loader';

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
        <Loader
          style={{
            width: '100vw',
            height: '100vh',
          }}
        />
      )}
    </ConfigProvider>
  );
};

export default App;
