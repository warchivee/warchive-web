import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Header from '@components/layout/header';

const Home = lazy(() => import('./pages/home'));
const BookmarkList = lazy(() => import('./pages/bookmarkList'));
const About = lazy(() => import('./pages/about'));

function App() {
  return (
    <Router>
      <Header
        leftMenus={[
          {
            label: '즐겨찾기 목록',
            icon: 'star',
            path: '/bookmarks',
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
          <Route path="/bookmarks" Component={BookmarkList} />
          <Route path="/about" Component={About} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
