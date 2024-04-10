import Footer from '@components/organism/Footer';
import { PageLoader } from '@components/CommonComponents/loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/organism/Header';

export default function NoHeaderLayout() {
  return (
    <div className="layout">
      <div className="page">
        <Suspense
          fallback={
            <div>
              <Header />
              <PageLoader />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
