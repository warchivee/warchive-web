import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePagination = (totalCount: number, pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(totalCount / pageSize);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, maxPage)));
  };

  return [currentPage, maxPage, goToPage] as const;
};

export default usePagination;
