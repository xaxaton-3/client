import { useUserStore } from '@/store/user';
import { Button, Form, Input, message } from 'antd';
import { FC } from 'react';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: FC<{
  onRegister: () => void;
}> = ({ onRegister }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const userStore = useUserStore();

  const onFinish = async (values: FormValues) => {
    try {
      await userStore.register(values);
      messageApi.open({
        type: 'success',
        content: 'Вы успешно зарегистрировались!',
      });
      onRegister();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Form
      onFinish={onFinish}
      autoComplete="off"
    >
      {contextHolder}

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

      <Form.Item
        name="confirmPassword"
        label="Повторите пароль"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Пожалуйста повторите пароль!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
