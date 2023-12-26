import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePagination = (array: any[], pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(array.length / pageSize);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, maxPage)));
  };

  const currentItems = array.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return [currentItems, currentPage, maxPage, goToPage] as const;
};

export default usePagination;
