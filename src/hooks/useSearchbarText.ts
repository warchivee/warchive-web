import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import wataAtom from 'src/stores/wata.atom';

const useSearchbarText = () => {
  const watas = useRecoilValue(wataAtom);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const arrayLength = watas.length;

    const randomIndex = Math.floor(Math.random() * arrayLength);

    // 랜덤한 요소 선택
    const randomElement = watas[randomIndex];

    setSearchText(
      `${randomElement.title}, 어디서 ${randomElement.category.name === '게임' ? '할 수 있지?' : '볼 수 있지?'}`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return searchText;
};

export default useSearchbarText;
