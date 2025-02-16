import { Button, Flex, Menu, type MenuProps } from 'antd';
import {
  AppstoreOutlined,
  BookOutlined,
  CopyOutlined,
  LoginOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router';
import styles from './Header.module.scss';
import { useMemo } from 'react';
import { useUserStore } from '@/store/user';

type MenuItem = Required<MenuProps>['items'][number];

const Header = () => {
  const userStore = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  const items = useMemo(() => {
    const items: MenuItem[] = [
      {
        label: 'Карта',
        key: '/',
        icon: <AppstoreOutlined />,
      },
      {
        label: 'Книга',
        key: '/features',
        icon: <BookOutlined />,
      },
    ];

    if (userStore.user) {
      items.push(
        {
          label: 'Личный кабинет',
          key: '/personal',
          icon: <UserOutlined />,
        },
        {
          label: 'Отправить заявку',
          key: '/new-request',
          icon: <CopyOutlined />,
        },
      );

      if (userStore.user.is_superuser) {
        items.push(
          // {
          //   label: 'Пользователи',
          //   key: '/users',
          //   icon: <TeamOutlined />,
          // },
          {
            label: 'Заявки',
            key: '/requests',
            icon: <CopyOutlined />,
          },
        );
      }
    } else {
      items.push({
        label: 'Авторизация',
        key: '/auth',
        icon: <LoginOutlined />,
        className: styles.auth,
      });
    }

    return items;
  }, [userStore.user]);

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const onLogout = () => {
    userStore.logout();
    navigate('/');
  };

  return (
    <Flex className={styles.header}>
      <Menu
        className={styles.menu}
        selectedKeys={[location.pathname]}
        mode="horizontal"
        items={items}
        onClick={onClick}
      />

      {userStore.user && (
        <Button
          className={styles.logout}
          onClick={onLogout}
        >
          Выйти
        </Button>
      )}
    </Flex>
  );
};

export default Header;
