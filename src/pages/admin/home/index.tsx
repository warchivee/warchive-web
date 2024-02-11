import { Title } from '@components/text';
import { Suspense, useState } from 'react';
import Pagination from '@components/pagination';
import usePagination from 'src/hooks/usePagination';
import Button from '@components/button';
import { DropdownOption } from '@components/dropdown';
import Loader from '@components/loader';
import { useQueryClient } from '@tanstack/react-query';
import AdminEditData from './components/editData';
import AdminDataList from './components/dataList';
import AdminSearchContainer from './components/searchContainer';

interface SearchConditions {
  title?: string;
  label?: DropdownOption[];
  updatePeriod?: DropdownOption;
}

export default function AdminHome() {
  const PAGE_SIZE = 20;

  const [pageNo, maxPage, handlePageChange] = usePagination(0, PAGE_SIZE);

  const [openAddData, toggleAddData] = useState(false);

  const [searchConditions, setSearchConditions] = useState<SearchConditions>(
    {},
  );

  const queryClient = useQueryClient();

  const refreshDatas = () => {
    queryClient.invalidateQueries({
      queryKey: ['searchData', searchConditions, pageNo, PAGE_SIZE],
    });
  };

  const resetDatas = () => {
    setSearchConditions({});
    handlePageChange(0);
  };

  return (
    <div className="data-manage">
      <div className="header">
        <Title type="h1">데이터 관리</Title>
        <Button
          onClick={() => {
            toggleAddData(true);
          }}
          labelColor="ebony"
          icon="plus"
          iconColor="ebony"
          background="selago"
          border="round"
        >
          데이터 추가
        </Button>
      </div>

      <AdminEditData
        isOpen={openAddData}
        data={undefined}
        onClose={() => {
          toggleAddData(false);
        }}
        onConfirm={() => {
          refreshDatas();
        }}
      />

      <AdminSearchContainer
        handleSearch={(values) => setSearchConditions(values)}
        handleInitSearch={resetDatas}
      />

      <Suspense fallback={<Loader />}>
        <AdminDataList
          pageNo={pageNo}
          pageSize={PAGE_SIZE}
          searchConditions={searchConditions}
          refreshDatas={refreshDatas}
        />
      </Suspense>

      <Pagination
        currentPage={pageNo}
        onChange={handlePageChange}
        maxPage={maxPage}
      />
    </div>
  );
}
