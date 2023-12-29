import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from '@components/layout/header';
import Footer from '@components/layout/footer';

import './App.css';

const Home = lazy(() => import('@pages/home'));
const Collections = lazy(() => import('@pages/collections'));
const ShareCollections = lazy(() => import('@pages/shareCollections'));
const About = lazy(() => import('@pages/about'));

function App() {
  useEffect(() => {
    // 10000개의 데이터를 공유하는 상황 -> 컬렉션에 담겨있는지 아닌지 표현하는 배열 생성
    const allDatas = Array.from({ length: 1200 }, () => 1);

    // 2진수로 데이터가 있고 없음을 표현하기 위해 항상 맨 앞 자리는 1로 만들어줌.
    allDatas[0] = 1;

    // 배열을 2진수 형태의 문자열로 변환
    const allDatasToBinaryString = allDatas.join('');

    // 2진수 문자열을 62진수로 변환
    let num = BigInt(`0b${allDatasToBinaryString}`);
    let result = '';
    while (num > 0n) {
      const remainder = num % 62n;
      result =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(
          Number(remainder),
        ) + result;
      num /= 62n;
    }

    console.log(result.length); // 1680
  }, []);

  return (
    <RecoilRoot>
      <Router basename="warchive-web">
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
