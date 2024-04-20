import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Footer from '@components/organism/Footer';
import Header from '@components/organism/Header';
import { PageLoader } from '@components/CommonComponents/loader';
import TodayPopup from '@components/organism/WeeklyPopup';

import ErrorFallback from './ErrorFallback';

export default function CommonLayout() {
  const { pathname } = useLocation();
  return (
    <div className="layout">
      <Header />
      <div className="page">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="footer">
        <Footer />
      </div>

      {pathname !== '/admin' && <TodayPopup />}
    </div>
  );
}
