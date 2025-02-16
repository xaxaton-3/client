import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from '@/layouts/MainLayout';
import Main from '@/pages/Main';
import Request from '@/pages/Request';
import Features from '@/pages/Features';
import Auth from '@/pages/Auth';
import Requests from '@/pages/Requests';
import Personal from '@/pages/Personal';
import NewRequest from '@/pages/NewRequest';

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
            path="personal"
            element={<Personal />}
          />

          <Route
            path="new-request"
            element={<NewRequest />}
          />

          <Route
            path="requests"
            element={<Requests />}
          />

          <Route
            path="requests/:id"
            element={<Request />}
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
