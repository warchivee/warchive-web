import { ErrorBoundary } from 'react-error-boundary';
import './App.css';

import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import LoginRoute from 'src/routes/LoginRoute';
import PermissionRoute from 'src/routes/PermissionRoute';
import Modal from '@components/CommonComponents/modal';
import ErrorFallback from './layouts/ErrorFallback';
import { modalState } from './stores/ui.atom';

const CommonLayout = lazy(() => import('src/layouts/CommonLayout'));

const About = lazy(() => import('@pages/CommonPages/About'));
const Login = lazy(() => import('@pages/CommonPages/Login'));
const LoginRedirect = lazy(() => import('@pages/CommonPages/LoginRedirect'));

const UserHome = lazy(() => import('@pages/UserPages/UserHome'));
const UserCollections = lazy(() => import('@pages/UserPages/UserCollections'));
const UserCollectionShare = lazy(
  () => import('@pages/UserPages/UserCollectionShare'),
);

const AdminLayout = lazy(() => import('src/layouts/AdminLayout'));
const AdminHome = lazy(() => import('@pages/AdminPages/AdminDatas'));

function App() {
  const [modal, setModal] = useRecoilState(modalState);

  return (
    <Router>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route
            path="/"
            index
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <UserHome />
              </ErrorBoundary>
            }
          />
          <Route path="/login" element={<Login />} />
          {/* 링크를 입력해 직접 접근하는 경우 2depth (ex: login/redirect ) 경로로 접근 불가능 이슈로 login-redirect 로 명명함 => vercel.json 설정 참고 */}
          <Route path="/login-redirect" element={<LoginRedirect />} />
          <Route path="/shared" element={<UserCollectionShare />} />
          <Route path="/about" element={<About />} />

          <Route element={<LoginRoute />}>
            <Route element={<PermissionRoute access="USER" />}>
              <Route path="/collections" element={<UserCollections />} />
            </Route>
            <Route element={<PermissionRoute access="ADMIN" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>

      <Modal
        title={modal.title}
        message={modal.message}
        buttons={modal.onConfirm ? ['cancel', 'confirm'] : ['confirm']}
        isOpen={modal.open}
        onClose={() => {
          setModal({ ...modal, open: false });
        }}
        onConfirm={() => {
          if (modal.onConfirm) {
            modal.onConfirm();
          }
          setModal({ ...modal, open: false });
        }}
      />
    </Router>
  );
}

export default App;
