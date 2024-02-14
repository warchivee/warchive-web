import Button from '@components/CommonComponents/button';
import { DropdownOption } from '@components/AdminComponents/AdminDropdown';
import Input from '@components/CommonComponents/input';
import MultiDropdown from '@components/AdminComponents/AdminMultiDropdown';
import { Text } from '@components/CommonComponents/text';
import moment from 'moment';
import { useState } from 'react';
import { labelOptions } from 'src/services/admin-wata.api';
import AdminDropdown from '@components/AdminComponents/AdminDropdown';

export interface SearchConditions {
  title?: string;
  label?: DropdownOption[];
  updatePeriod?: DropdownOption;
}

const periodOptions: DropdownOption[] = [
  {
    id: 0,
    name: '1~3개월 전',
  },
  {
    id: 1,
    name: '3~6개월 전',
  },
  {
    id: 2,
    name: '6개월~1년 전',
  },
  {
    id: 3,
    name: '1년~ 전',
  },
];

export const periodKeyValues = [
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

export default function AdminSearchContainer({
  handleSearch,
  handleInitSearch,
}: {
  handleSearch: (searchConditions: SearchConditions) => void;
  handleInitSearch: () => void;
}) {
  const [searchConditions, setSearchConditions] = useState<SearchConditions>(
    {},
  );

  return (
    <div className="search-container">
      <div className="item">
        <Text color="gray">제목</Text>
        <Input
          type="text"
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
        <AdminDropdown
          options={periodOptions}
          selectedOption={searchConditions.updatePeriod}
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
            setSearchConditions({});
            handleInitSearch();
          }}
        >
          검색 초기화
        </Button>
        <Button
          background="selago"
          onClick={() => {
            handleSearch(searchConditions);
          }}
        >
          검색
        </Button>
      </div>
    </div>
  );
}
