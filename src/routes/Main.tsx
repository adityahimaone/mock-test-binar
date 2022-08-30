import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Default from '@/components/layouts/Default';
import Home from '@/views/home';
import Login from '@/views/login';
import Register from '@/views/register';

function RoutesViews(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesViews;
