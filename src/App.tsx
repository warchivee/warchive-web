import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from '@components/layout/header';
import Footer from '@components/layout/footer';

import './App.css';

const Home = lazy(() => import('@pages/home'));
const Collections = lazy(() => import('@pages/collections'));
const About = lazy(() => import('@pages/about'));

function App() {
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
              openPopup: () => {},
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

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/collections" Component={Collections} />
            <Route path="/about" Component={About} />
          </Routes>
        </Suspense>

        <Footer />
      </Router>
    </RecoilRoot>
  );
}

export default App;
