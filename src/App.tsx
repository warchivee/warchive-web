import { ErrorBoundary } from 'react-error-boundary';
import './App.css';

import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import LoginRoute from 'src/routes/LoginRoute';
import PermissionRoute from 'src/routes/PermissionRoute';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { Snackbar } from '@mui/joy';
import ErrorFallback from './layouts/ErrorFallback';
import { modalState, snackbarState } from './stores/ui.atom';

const NoHeaderLayout = lazy(() => import('src/layouts/NoHeaderLayout'));
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
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);

  return (
    <Router>
      <Routes>
        <Route element={<NoHeaderLayout />}>
          <Route
            path="/collections/:sharedId"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <UserCollectionShare />
              </ErrorBoundary>
            }
          />
        </Route>

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
          <Route path="/login/redirect" element={<LoginRedirect />} />

          <Route path="/about" element={<About />} />

          <Route element={<LoginRoute />}>
            <Route element={<PermissionRoute access="USER" />}>
              <Route
                path="/collections"
                element={
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <UserCollections />
                  </ErrorBoundary>
                }
              />
            </Route>
            <Route element={<PermissionRoute access="ADMIN" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>

      <Snackbar
        autoHideDuration={3000}
        open={snackbar.open}
        variant="soft"
        color="primary"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            setSnackbar({ ...snackbar, open: false });
          }

          setSnackbar({ ...snackbar, open: false });
        }}
      >
        {snackbar.message}
      </Snackbar>

      <Modal
        open={modal.open}
        onClose={() => {
          if (modal.loading) {
            return;
          }

          setModal({ ...modal, open: false });
        }}
      >
        <ModalDialog layout="center">
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography level="h4" fontWeight="lg">
            {modal.title}
          </Typography>

          <Typography level="body-sm" textColor="tertiary">
            {modal.message?.split('\n')?.map((value) => (
              <span key={`common-modal-message${value}`}>
                {value} <br />
              </span>
            ))}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'row' },
              justifyContent: 'flex-end',
            }}
          >
            {modal.onConfirm && (
              <Button
                variant="plain"
                color="neutral"
                onClick={() => {
                  if (modal.loading) {
                    return;
                  }

                  if (modal.onCancel) {
                    modal.onCancel();
                  }

                  setModal({ ...modal, open: false });
                }}
              >
                취소
              </Button>
            )}

            <Button
              variant="plain"
              color="primary"
              loading={modal.loading}
              onClick={async () => {
                try {
                  setModal({ ...modal, loading: true });
                  if (modal.onConfirm) {
                    await modal.onConfirm();
                  }
                } catch (error) {
                  console.error(error);
                }

                setModal({ ...modal, loading: false, open: false });
              }}
            >
              확인
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Router>
  );
}

export default App;
