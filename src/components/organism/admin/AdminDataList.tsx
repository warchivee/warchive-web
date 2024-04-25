import getWata, { AdminWata, ApiGetResult } from 'src/services/admin-wata.api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { SearchConditions } from '@pages/AdminHome';
import AdminDataCard from './AdminDataCard';
import { periodKeyValues } from './AdminSearchContainer';

const searchDatas = async (
  searchConditions: SearchConditions,
  pageNo: number,
  pageSize: number,
) => {
  const result = await getWata(
    {
      ...searchConditions,
      categories: searchConditions.categories?.map((item) => +item.id),
      label: searchConditions.label?.map((item) => item.id as string),
      isPublished: searchConditions.isPublished?.id as string,
      needWriteItems: searchConditions.needWriteItems?.map(
        (item) => item.id as string,
      ),
      ...periodKeyValues[searchConditions.updatePeriod?.id as number],
    },
    pageNo,
    pageSize,
  );

  return result;
};

export default function AdminDataList({
  pageNo,
  pageSize,
  searchConditions,
  handleTotalCount,
  refreshDatas,
}: {
  pageNo: number;
  pageSize: number;
  searchConditions: SearchConditions;
  handleTotalCount: (totalCount: number) => void;
  refreshDatas: () => void;
}) {
  const { data: datas } = useSuspenseQuery<ApiGetResult<AdminWata[]>>({
    queryKey: ['searchData', searchConditions, pageNo, pageSize],
    queryFn: () => searchDatas(searchConditions, pageNo, pageSize),
  });

  useEffect(() => {
    handleTotalCount(datas?.total_count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datas?.total_count]);

  return (
    <div>
      <div>
        {datas?.result?.map((data) => (
          <AdminDataCard
            key={`admin-data-card-${data.id}`}
            data={data}
            refreshDatas={() => refreshDatas()}
          />
        ))}
      </div>
    </div>
  );
}
