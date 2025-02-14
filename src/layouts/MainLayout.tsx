import { Outlet } from 'react-router';
import Header from '@/components/header/Header';

const MainLayout = () => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default MainLayout;
