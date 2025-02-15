import { Menu, type MenuProps } from 'antd';
import {
  AppstoreOutlined,
  BookOutlined,
  CopyOutlined,
  LoginOutlined,
  TeamOutlined,
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

  const items: MenuItem[] = useMemo(() => {
    return [
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
      ...(userStore.user
        ? [
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
          ]
        : []),
      ...(userStore.user?.is_superuser
        ? [
            {
              label: 'Пользователи',
              key: '/users',
              icon: <TeamOutlined />,
            },
            {
              label: 'Заявки',
              key: '/requests',
              icon: <CopyOutlined />,
            },
          ]
        : []),

      {
        label: 'Авторизация',
        key: '/auth',
        icon: <LoginOutlined />,
        className: styles.auth,
      },
    ];
  }, [userStore.user]);

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      className={styles.header}
      selectedKeys={[location.pathname]}
      mode="horizontal"
      items={items}
      onClick={onClick}
    />
  );
};

export default Header;
