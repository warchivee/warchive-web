import MultiDropdown, {
  DropdownOption,
} from '@components/organism/admin/AdminMultiDropdown';
import { Text } from '@components/CommonComponents/text';
import moment from 'moment';
import { useState } from 'react';
import { labelOptions } from 'src/services/admin-wata.api';
import AdminDropdown from '@components/organism/admin/AdminDropdown';
import { SearchConditions } from '@pages/AdminHome';
import { Button, Input } from '@mui/joy';

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
          size="sm"
          variant="soft"
          type="text"
          value={searchConditions.title || ''}
          onChange={(e) =>
            setSearchConditions({ ...searchConditions, title: e.target.value })
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

      <div className="item">
        <Text color="gray">미입력항목</Text>
        <MultiDropdown
          selectedOptions={searchConditions?.needWriteItems ?? []}
          options={[
            {
              id: 'title',
              name: '제목',
            },
            {
              id: 'creator',
              name: '작가/감독',
            },
            {
              id: 'genre',
              name: '장르',
            },
            {
              id: 'keywords',
              name: '키워드',
            },
            {
              id: 'platforms',
              name: '플랫폼',
            },
            {
              id: 'thumbnail',
              name: '썸네일',
            },
          ]}
          onChange={(value) => {
            setSearchConditions({
              ...searchConditions,
              needWriteItems: value,
            });
          }}
        />
      </div>

      <div className="item">
        <Text color="gray">게시상태</Text>
        <AdminDropdown
          selectedOption={searchConditions?.isPublished}
          options={[
            {
              id: 'true',
              name: '게시됨',
            },
            {
              id: 'false',
              name: '게시되지 않음',
            },
          ]}
          onChange={(value) => {
            setSearchConditions({
              ...searchConditions,
              isPublished: value,
            });
          }}
        />
      </div>

      <div className="controller">
        <Button
          variant="soft"
          color="neutral"
          onClick={() => {
            setSearchConditions({});
            handleInitSearch();
          }}
        >
          검색 초기화
        </Button>
        <Button
          variant="soft"
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
