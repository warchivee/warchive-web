import { useState } from 'react';

const useArray = <T>(initialData: T[], keyName?: string | number) => {
  const [data, setData] = useState<T[]>(initialData);

  const deleteItem = (item: T): void => {
    setData((prevData) =>
      prevData.filter((prevItem) => {
        if (keyName) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (prevItem as any)[keyName] !== (item as any)[keyName];
        }
        // 그 외의 경우는 직접 비교
        return prevItem !== item;
      }),
    );
  };

  const addItem = (item: T): void => {
    setData((prevData) => [...prevData, item]);
  };

  return {
    data,
    addItem,
    deleteItem,
  };
};
export default useArray;
