import { Card, Tabs, type TabsProps } from 'antd';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Auth = () => {
  const items: TabsProps['items'] = [
    {
      key: 'login',
      label: 'Авторизация',
      children: <LoginForm />,
    },
    {
      key: 'register',
      label: 'Регистрация',
      children: <RegisterForm />,
    },
  ];

  return (
    <Card style={{ maxWidth: 500, margin: '0 auto' }}>
      <Tabs
        defaultActiveKey="login"
        items={items}
      />
    </Card>
  );
};

export default Auth;
