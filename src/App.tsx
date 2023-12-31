import { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from '@components/layout/header';
import Footer from '@components/layout/footer';
import ReportModal from '@components/reportModal';

import './App.css';

const Home = lazy(() => import('@pages/home'));
const Collections = lazy(() => import('@pages/collections'));
const ShareCollections = lazy(() => import('@pages/shareCollections'));
const About = lazy(() => import('@pages/about'));

function App() {
  const [isReportModal, SetIsReportModal] = useState(false);
  const openReportModal = () => {
    SetIsReportModal(true);
  };
  const closeReportModal = () => {
    SetIsReportModal(false);
  };

  return (
    <RecoilRoot>
      <Router>
        <Header
          leftMenus={[
            {
              label: '컬렉션',
              icon: 'star',
              path: '/collections',
              type: 'page',
            },
            {
              label: '추천작 제보/문의',
              icon: 'mail',
              type: 'popup',
              openPopup: openReportModal,
            },
          ]}
          rightMenus={[
            {
              icon: 'question',
              path: '/about',
              type: 'page',
            },
          ]}
        />

        <ReportModal isOpen={isReportModal} onClose={closeReportModal} />

        <Suspense
          fallback={
            <div>
              <span className="loader" />
            </div>
          }
        >
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/collections" Component={Collections} />
            <Route path="/shared" Component={ShareCollections} />
            <Route path="/about" Component={About} />
          </Routes>
        </Suspense>

        <Footer />
      </Router>
    </RecoilRoot>
  );
}

export default App;
