import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import './App.css';

import PrivateRoute from 'src/routes/PrivateRoute';
import PermissionRoute from 'src/routes/PermissionRoute';

const Main = lazy(() => import('@pages/main'));
const Login = lazy(() => import('@pages/login'));
const LoginRedirect = lazy(() => import('@pages/login/redirect'));
const Home = lazy(() => import('@pages/home'));
const Collections = lazy(() => import('@pages/collections'));
const ShareCollections = lazy(() => import('@pages/collections/share'));
const About = lazy(() => import('@pages/about'));

const AdminMain = lazy(() => import('@pages/admin/main'));
const AdminHome = lazy(() => import('@pages/admin/home'));
const AdminKeyword = lazy(() => import('@pages/admin/keyword'));

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route element={<Main />}>
            <Route path="/" index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-redirect" element={<LoginRedirect />} />
            <Route path="/shared" element={<ShareCollections />} />
            <Route path="/about" element={<About />} />

            {/* 로그인 해야 하는 서비스 */}
            <Route element={<PrivateRoute />}>
              {/* 유저 서비스 */}
              <Route element={<PermissionRoute access="USER" />}>
                <Route path="/collections" element={<Collections />} />
              </Route>
              {/* 어드민 서비스 */}
              <Route element={<PermissionRoute access="ADMIN" />}>
                <Route path="/admin" element={<AdminMain />}>
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
