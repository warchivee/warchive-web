import './App.css';

import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import LoginRoute from 'src/routes/LoginRoute';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { Snackbar } from '@mui/joy';
import { AxiosError } from 'axios';
import { modalState, snackbarState } from './stores/ui.atom';

const NoHeaderLayout = lazy(() => import('src/layouts/NoHeaderLayout'));
const CommonLayout = lazy(() => import('src/layouts/CommonLayout'));

const Login = lazy(() => import('@pages/Login'));
const LoginRedirect = lazy(() => import('@pages/LoginRedirect'));

const UserHome = lazy(() => import('@pages/Home'));
const UserScrapbooks = lazy(() => import('@pages/Scrapbooks'));
const UserScrapbookShare = lazy(() => import('@pages/ScrapbooksShare'));

const About = lazy(() => import('@pages/About'));
const TermsOfServicePage = lazy(() => import('@pages/TermsOfUsePage'));
const PrivacyPolicyPage = lazy(() => import('@pages/PrivacyPolicyPage'));

function App() {
  const [modal, setModal] = useRecoilState(modalState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);

  return (
    <Router>
      <Routes>
        <Route element={<NoHeaderLayout />}>
          <Route
            path="/scrapbooks/:sharedId"
            element={<UserScrapbookShare />}
          />
        </Route>

        <Route element={<CommonLayout />}>
          <Route path="/" index element={<UserHome />} />
          <Route path="/login" element={<Login />} />
          <Route
            path={import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_PATH}
            element={<LoginRedirect />}
          />

          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />

          <Route element={<LoginRoute />}>
            <Route path="/scrapbooks" element={<UserScrapbooks />} />
          </Route>
        </Route>
      </Routes>

      <Snackbar
        autoHideDuration={3000}
        open={snackbar.open}
        variant="soft"
        color="primary"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ justifyContent: 'center' }}
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
                {modal.cancelTitle}
              </Button>
            )}

            <Button
              variant="plain"
              color="primary"
              loading={modal.loading}
              onClick={async () => {
                setModal({ ...modal, loading: true });
                if (modal.onConfirm) {
                  try {
                    await modal.onConfirm();
                  } catch (error) {
                    if (error instanceof AxiosError) {
                      setSnackbar({
                        ...snackbar,
                        open: true,
                        message:
                          '작업에 실패했습니다. 계속해서 같은 오류가 발생하면 문의 바랍니다.',
                      });
                    }
                  }
                }

                setModal({ ...modal, loading: false, open: false });
              }}
            >
              {modal.confirmTitle}
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Router>
  );
}

export default App;
