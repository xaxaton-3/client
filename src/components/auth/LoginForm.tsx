import { useUserStore } from '@/store/user';
import { Button, Form, Input } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { useNavigate, useOutletContext } from 'react-router';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { messageApi } = useOutletContext<{ messageApi: MessageInstance }>();
  const userStore = useUserStore();
  const navigate = useNavigate();

  const onFinish = async (values: FormValues) => {
    userStore
      .login(values)
      .then(() => {
        messageApi.open({
          type: 'success',
          content: 'Вы успешно авторизовались!',
        });
        navigate('/personal');
      })
      .catch(() => {
        messageApi.open({
          type: 'error',
          content: 'Email или пароль неверные!',
        });
      });
  };

  return (
    <Form
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Пожалуйста введите email!' },
          { type: 'email', message: 'Некорректный email!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={userStore.isLoading}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
