import {
  COLLECTION_LIST_KEY,
  CollectionListType,
  DEFAULT_COLLECTIONS_NAME,
} from 'src/types/collection.type';
import { api } from '@utils/api.util';

export const getCollectionList = async () => {
  try {
    const collectionsResponse = await api.get(
      'https://admin-warchive.koyeb.app/api/v1/collection/list?page=1&page_size=100',
    );
    const collections = collectionsResponse.data.result.result;
    collections.sort(
      (
        a: { created_at: string | number | Date },
        b: { created_at: string | number | Date },
      ) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA.getTime() - dateB.getTime();
      },
    );

    const newValue = [
      {
        id: 0,
        title: DEFAULT_COLLECTIONS_NAME,
        note: '',
        shared_id: '',
        created_at: '',
        updated_at: '',
      },
    ];
    newValue.push(...collections);
    // console.log('get collection list result: ', newValue); // DEBUG
    return newValue;
  } catch (error) {
    console.error('get collection list error', error); // ERROR
    throw error;
  }
};

export const requestAddCollection = async (title: string, note: string) => {
  try {
    const requestData = {
      title: title,
      note: note,
    };

    const response = await api.post(
      'https://admin-warchive.koyeb.app/api/v1/collection',
      requestData,
    );

    console.log('POST request response:', response.data.result); // DEBUG
    return response.data.result;
  } catch (error) {
    console.error('POST request error:', error); // ERROR
    throw error;
  }
};

export const requestRemoveCollection = async (id: number) => {
  try {
    const response = await api.delete(
      `https://admin-warchive.koyeb.app/api/v1/collection/${id}`,
    );
    console.log('DELETE request response:', response); // DEBUG
    return response;
  } catch (error) {
    console.error('DELETE request error:', error); // ERROR
    throw error;
  }
};

export const requestRenameCollection = async (
  id: number,
  title: string,
  note: string,
) => {
  try {
    console.log('수정 요청: ', title, '/', note); // DEBUG
    const requestData = {
      title: title,
      // note: note,
    };

    const response = await api.patch(
      `https://admin-warchive.koyeb.app/api/v1/collection/${id}`,
      requestData,
    );

    console.log('PATCH request response:', response); // DEBUG
    return response;
  } catch (error) {
    console.error('PATCH request error:', error); // ERROR
    throw error;
  }
};
