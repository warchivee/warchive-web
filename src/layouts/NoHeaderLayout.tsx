import Footer from 'src/layouts/Footer';
import { PageLoader } from '@components/CommonComponents/loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function NoHeaderLayout() {
  return (
    <div className="layout">
      <div className="page">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
