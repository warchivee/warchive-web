import { Title } from '@components/CommonComponents/text';
import { Suspense, useState } from 'react';
import Pagination from '@components/CommonComponents/pagination';
import usePagination from 'src/hooks/usePagination';
import { PageLoader } from '@components/CommonComponents/loader';
import { useQueryClient } from '@tanstack/react-query';
import { DropdownOption } from '@components/organism/admin/AdminMultiDropdown';
import { Button } from '@mui/joy';
import AdminEditData from '../components/organism/admin/AdminEditData';
import AdminDataList from '../components/organism/admin/AdminDataList';
import AdminSearchContainer from '../components/organism/admin/AdminSearchContainer';

export interface SearchConditions {
  title?: string;
  categories?: DropdownOption[];
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
          variant="soft"
          onClick={() => {
            toggleAddData(true);
          }}
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
