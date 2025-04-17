import { Outlet } from 'react-router';

import Footer from './Footer';

const Layout = () => {
  return (
    <div className="h-dvh max-w-[var(--max-width)] mx-auto shadow-sm">
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
