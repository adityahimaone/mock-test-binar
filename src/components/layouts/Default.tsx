import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import Navbar from '../UI/Navbar';

function Default(): JSX.Element {
  return (
    <div className="min-h-screen bg-slate-100">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <main className="container mx-auto max-w-screen-lg px-2 lg:px-0">
        <Outlet />
      </main>
    </div>
  );
}

export default Default;
