import { Text, Title } from '@components/text';
import { useEffect, useState } from 'react';
import getWata, {
  AdminWata,
  ApiGetResult,
  EditAdminWata,
  labelOptions,
} from 'src/services/admin/admin-wata.api';
import Pagination from '@components/pagination';
import usePagination from 'src/hooks/usePagination';
import Button from '@components/button';
import Input from '@components/input';
import MultiDropdown from '@components/multiDropdown';
import moment from 'moment';
import Dropdown, { DropdownOption } from '@components/dropdown';
import DataCard from './components/dataCard';
import AdminEditData from './components/editData';

const periodOptions: DropdownOption[] = [
  {
    id: 0,
    name: '1~3개월 전',
  },
  {
    id: 1,
    name: '3~6개월',
  },
  {
    id: 2,
    name: '6개월~1년',
  },
  {
    id: 3,
    name: '1년전~',
  },
];

const periodKeyValues = [
  {
    updateStartDate: moment().subtract(3, 'month'),
    updateEndDate: moment().subtract(1, 'month'),
  },
  {
    updateStartDate: moment().subtract(6, 'month'),
    updateEndDate: moment().subtract(3, 'month'),
  },
  {
    updateStartDate: moment().subtract(1, 'years'),
    updateEndDate: moment().subtract(6, 'month'),
  },
  {
    updateStartDate: undefined,
    updateEndDate: moment().subtract(1, 'years'),
  },
];

interface SearchConditions {
  title?: string;
  label?: DropdownOption[];
  updatePeriod?: DropdownOption;
}

export default function AdminHome() {
  const PAGE_SIZE = 20;

  const [datas, setDatas] = useState<ApiGetResult<AdminWata[]>>({
    result: [],
    total_count: 0,
  });

  const [pageNo, maxPage, handlePageChange] = usePagination(
    datas.total_count,
    PAGE_SIZE,
  );

  const [openAddData, toggleAddData] = useState(false);

  const [selectData, setSelectData] = useState<EditAdminWata | undefined>(
    undefined,
  );

  const [searchConditions, setSearchConditions] = useState<SearchConditions>(
    {},
  );

  const searchData = async () => {
    const result = await getWata(
      {
        ...searchConditions,
        label: searchConditions.label?.map((item) => item.id as string),
        ...periodKeyValues[searchConditions.updatePeriod?.id as number],
      },
      pageNo,
      PAGE_SIZE,
    );
    setDatas(result);
  };

  const resetData = async () => {
    const result = await getWata({}, pageNo, PAGE_SIZE);

    setSearchConditions({});
    setDatas(result);
  };

  useEffect(() => {
    searchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  return (
    <div className="data-manage">
      <div className="header">
        <Title type="h1">데이터 관리</Title>
        <Button
          onClick={() => {
            setSelectData(undefined);
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
        data={selectData}
        onClose={() => {
          toggleAddData(false);
        }}
        onConfirm={() => {
          searchData();
        }}
      />

      <div className="search-container">
        <div className="item">
          <Text color="gray">제목</Text>
          <Input
            type="search"
            placeholder="제목으로 검색"
            value={searchConditions.title || ''}
            onChange={(input) =>
              setSearchConditions({ ...searchConditions, title: input })
            }
          />
        </div>

        <div className="item">
          <Text color="gray">라벨</Text>
          <MultiDropdown
            selectedOptions={searchConditions?.label ?? []}
            options={labelOptions}
            onChange={(value) => {
              setSearchConditions({
                ...searchConditions,
                title: '',
                label: value,
              });
            }}
          />
        </div>

        <div className="item">
          <Text color="gray">마지막 수정일</Text>
          <Dropdown
            options={periodOptions}
            selectOption={searchConditions.updatePeriod}
            onChange={(selectOption) => {
              setSearchConditions({
                ...searchConditions,
                updatePeriod: selectOption,
              });
            }}
          />
        </div>

        <div className="controller">
          <Button
            background="selago"
            onClick={() => {
              resetData();
            }}
          >
            검색 초기화
          </Button>
          <Button
            background="selago"
            onClick={() => {
              searchData();
            }}
          >
            검색
          </Button>
        </div>
      </div>

      {datas?.result?.map((data, index) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <DataCard
          key={`data-card-${index + 1}`}
          data={data}
          refreshDatas={() => searchData()}
          onEdit={(seleted: AdminWata) => {
            setSelectData(seleted as EditAdminWata);
            toggleAddData(true);
          }}
        />
      ))}

      <Pagination
        currentPage={pageNo}
        onChange={handlePageChange}
        maxPage={maxPage}
      />
    </div>
  );
}
