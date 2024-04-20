import { deleteData, getData, patchData, postData } from '@utils/api.util';
import { ScrapbookType } from 'src/types/scrapbooks.type';
import { WataIdType } from 'src/types/wata.type';

export interface UpdateScrapbookItemParam {
  wata_id: number;
  action: 'ADD' | 'DELETE';
  scrapbook_id: number;
}

export const getScrapbooksApi = async () =>
  getData<ScrapbookType[]>('scrapbook');

export const getSharedScrapbookApi = async (sharedId: string) =>
  getData<ScrapbookType>(`scrapbook/shared/${sharedId}`);

export const createScrapbookApi = async (params: {
  title: string;
  note: string;
}) => postData<ScrapbookType>(`scrapbook`, params);

export const updateScrapbookApi = async (
  id: number,
  params: { title?: string; note?: string },
) => patchData<ScrapbookType>(`scrapbook/${id}`, params);

export const deleteScrapbookApi = async (id: number) => {
  await deleteData(`scrapbook/${id}`);
};

export const addScrapbookItemApi = async (
  scrapbookId: number,
  addIds: WataIdType[],
) => {
  await postData(`scrapbook/${scrapbookId}/items`, { add_ids: addIds });
};

export const deleteScrapbookItemsApi = async (
  scrapbookId: number,
  deleteIds: WataIdType[],
) => {
  await deleteData(`scrapbook/${scrapbookId}/items`, {
    delete_ids: deleteIds,
  });
};

export const updateScrapbookItemApi = async (
  updateItems: UpdateScrapbookItemParam[],
) => {
  await patchData(`scrapbook/items`, updateItems);
};
