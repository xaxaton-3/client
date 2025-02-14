import { useNavigate } from 'react-router';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';

const Header = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: 'Main',
      icon: 'pi pi-home',
      command: () => navigate('/'),
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      command: () => navigate('/users'),
    },
  ];

  return (
    <Menubar
      model={items}
      className="mb-2"
    />
  );
};

export default Header;
