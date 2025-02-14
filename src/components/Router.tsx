import { BrowserRouter, Routes, Route } from 'react-router';
import Main from '@/pages/Main';
import Users from '@/pages/Users';
import MainLayout from '@/layouts/MainLayout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            index
            element={<Main />}
          />

          <Route
            path="users"
            element={<Users />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
