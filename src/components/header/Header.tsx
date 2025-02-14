import { useNavigate, useLocation } from 'react-router';
import { AppstoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styles from './Header.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Карта',
    key: '/',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Users',
    key: '/users',
    icon: <AppstoreOutlined />,
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
