import { Title } from '@components/CommonComponents/text';
import { Suspense, useState } from 'react';
import Pagination from '@components/CommonComponents/pagination';
import usePagination from 'src/hooks/usePagination';
import Button from '@components/CommonComponents/button';
import { PageLoader } from '@components/CommonComponents/loader';
import { useQueryClient } from '@tanstack/react-query';
import { DropdownOption } from '@components/AdminComponents/AdminMultiDropdown';
import AdminEditData from '../../components/AdminComponents/AdminEditData';
import AdminDataList from '../../components/AdminComponents/AdminDataList';
import AdminSearchContainer from '../../components/AdminComponents/AdminSearchContainer';

export interface SearchConditions {
  title?: string;
  label?: DropdownOption[];
  updatePeriod?: DropdownOption;
  isPublished?: DropdownOption;
  needWriteItems?: DropdownOption[];
}

export default function AdminHome() {
  const PAGE_SIZE = 10;

  const { pageNo, maxPage, handlePageChange, totalCount, handleTotalCount } =
    usePagination(0, PAGE_SIZE);

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
        handleSearch={(values) => {
          setSearchConditions(values);
          handlePageChange(0);
        }}
        handleInitSearch={resetDatas}
      />
      <Suspense fallback={<PageLoader />}>
        <AdminDataList
          pageNo={pageNo}
          pageSize={PAGE_SIZE}
          searchConditions={searchConditions}
          refreshDatas={refreshDatas}
          handleTotalCount={handleTotalCount}
        />

        <Pagination
          currentPage={pageNo}
          onChange={handlePageChange}
          maxPage={maxPage}
          input
        />
      </Suspense>
    </div>
  );
}
