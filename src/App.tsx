import './App.css';

import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import LoginRoute from 'src/routes/LoginRoute';
import PermissionRoute from 'src/routes/PermissionRoute';

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
const AdminKeyword = lazy(() => import('@pages/AdminPages/AdminKeywords'));

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route element={<CommonLayout />}>
            <Route path="/" index element={<UserHome />} />
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
                  <Route path="/admin/keyword" element={<AdminKeyword />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
