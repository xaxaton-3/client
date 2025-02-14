import { ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';
import Router from './components/Router';

const App = () => {
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
