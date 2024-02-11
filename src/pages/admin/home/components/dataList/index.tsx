import getWata, { AdminWata, ApiGetResult } from 'src/services/admin-wata.api';
import { useSuspenseQuery } from '@tanstack/react-query';
import DataCard from '../dataCard';
import { SearchConditions, periodKeyValues } from '../searchContainer';

const searchDatas = async (
  searchConditions: SearchConditions,
  pageNo: number,
  pageSize: number,
) => {
  const result = await getWata(
    {
      ...searchConditions,
      label: searchConditions.label?.map((item) => item.id as string),
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
  refreshDatas,
}: {
  pageNo: number;
  pageSize: number;
  searchConditions: SearchConditions;
  refreshDatas: () => void;
}) {
  const { data: datas } = useSuspenseQuery<ApiGetResult<AdminWata[]>>({
    queryKey: ['searchData', searchConditions, pageNo, pageSize],
    queryFn: () => searchDatas(searchConditions, pageNo, pageSize),
  });

  return (
    <div>
      {datas?.result?.map((data, index) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <DataCard
          key={`data-card-${index + 1}`}
          data={data}
          refreshDatas={() => refreshDatas()}
        />
      ))}
    </div>
  );
}
