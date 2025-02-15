import { Menu, type MenuProps } from 'antd';
import { AppstoreOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router';
import styles from './Header.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Карта',
    key: '/',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Военные',
    key: '/features',
    icon: <UserOutlined />,
  },
  {
    label: 'Авторизация',
    key: '/auth',
    icon: <LoginOutlined />,
    className: styles.auth,
  },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
