import { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';
import Router from './components/Router';
import { useFeaturesStore } from './store/features';

const App = () => {
  const { getFeatures } = useFeaturesStore();

  useEffect(() => {
    getFeatures();
  }, []);

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: '#df5707' } }}
      locale={locale}
    >
      <Router />
    </ConfigProvider>
  );
};

export default App;
