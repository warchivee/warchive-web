import { deleteData, getData, patchData, postData } from '@utils/api.util';
import { CollectionType } from 'src/types/collection.type';
import { WataIdType } from 'src/types/wata.type';

export interface UpdateCollectionItemParam {
  wata_id: number;
  action: 'ADD' | 'DELETE';
  collection_id: number;
}

export const getCollectionsApi = async () =>
  getData<CollectionType[]>('collection');

export const getSharedCollectionApi = async (sharedId: string) =>
  getData<CollectionType>(`collection/${sharedId}`);

export const createCollectionApi = async (params: {
  title: string;
  note: string;
}) => postData<CollectionType>(`collection`, params);

export const updateCollectionApi = async (
  id: number,
  params: { title?: string; note?: string },
) => patchData<CollectionType>(`collection/${id}`, params);

export const deleteCollectionApi = async (id: number) => {
  await deleteData(`collection/${id}`);
};

export const addCollectionItemApi = async (
  collectionId: number,
  addIds: WataIdType[],
) => {
  await postData(`collection/${collectionId}/items`, { add_ids: addIds });
};

export const deleteCollectionItemsApi = async (
  collectionId: number,
  deleteIds: WataIdType[],
) => {
  await deleteData(`collection/${collectionId}/items`, {
    delete_ids: deleteIds,
  });
};

export const updateCollectionItemApi = async (
  updateItems: UpdateCollectionItemParam[],
) => {
  await patchData(`collection/items`, updateItems);
};
