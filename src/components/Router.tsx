import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from '@/layouts/MainLayout';
import Main from '@/pages/Main';
import Features from '@/pages/Features';
import Auth from '@/pages/Auth';

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
            path="features"
            element={<Features />}
          />

          <Route
            path="auth"
            element={<Auth />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
