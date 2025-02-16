import { useUserStore } from '@/store/user';
import { UserOutlined } from '@ant-design/icons';
import { Flex } from 'antd';

const User = () => {
  const userStore = useUserStore();

  return (
    <Flex
      gap={16}
      align="center"
    >
      <div
        style={{
          fontSize: 36,
          border: '2px solid black',
          borderRadius: '50%',
          width: 56,
          height: 56,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <UserOutlined />
      </div>
      {userStore.user?.email}
    </Flex>
  );
};

export default User;
