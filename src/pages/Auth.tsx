import { Tabs, type TabsProps } from 'antd';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useState } from 'react';
import Container from '@/components/Container';

const Auth = () => {
  const [activeKey, setActiveKey] = useState('login');

  const items: TabsProps['items'] = [
    {
      key: 'login',
      label: 'Авторизация',
      children: <LoginForm />,
    },
    {
      key: 'register',
      label: 'Регистрация',
      children: <RegisterForm onRegister={() => setActiveKey('login')} />,
    },
  ];

  return (
    <Container>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={items}
      />
    </Container>
  );
};

export default Auth;
