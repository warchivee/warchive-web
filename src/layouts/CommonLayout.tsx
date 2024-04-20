import Footer from '@components/organism/Footer';
import Header from '@components/organism/Header';
import { PageLoader } from '@components/CommonComponents/loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import TodayPopup from '@components/organism/WeeklyPopup';

export default function CommonLayout() {
  return (
    <div className="layout">
      <Header />
      <div className="page">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>
      <div className="footer">
        <Footer />
      </div>

      <TodayPopup />
    </div>
  );
}
