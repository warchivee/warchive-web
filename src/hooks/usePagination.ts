import { useState } from 'react';

export const usePagination = (initTotalCount: number, pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(initTotalCount);

  const maxPage = Math.ceil(totalCount / pageSize);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, maxPage)));
  };

  return {
    pageNo: currentPage,
    maxPage,
    handlePageChange,
    totalCount,
    handleTotalCount: setTotalCount,
  };
};

export default usePagination;
