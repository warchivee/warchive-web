import {
  CollectionListType,
  DEFAULT_COLLECTIONS_KEY,
  DEFAULT_COLLECTIONS_NAME,
} from 'src/types/collection.type';
import { WataIdType, WataType } from 'src/types/wata.type';
import { useRecoilState } from 'recoil';
import { collectionSelector } from 'src/atoms/collection.atom';
import { useEffect, useState } from 'react';
import { api } from '@utils/api.util';

const getCollectionList = async () => {
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
    console.log('get collection list result: ', newValue); // DEBUG
    return newValue;
  } catch (error) {
    console.error('get collection list error', error); // ERROR
    throw error;
  }
};

const requestAddCollection = async (title: string, note: string) => {
  try {
    const requestData = {
      title: title,
      note: 'note',
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

const requestRemoveCollection = async (id: number) => {
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

export const useCollections = () => {
  const [collections, setCollections] = useRecoilState(collectionSelector);
  const [collectionLists, setCollectionLists] = useState<CollectionListType[]>(
    [],
  );

  const [recallBoolean, setRecallBoolean] = useState(false);
  useEffect(() => {
    const fetchCollectionLists = async () => {
      try {
        const fetchedCollectionLists = await getCollectionList();
        if (fetchedCollectionLists && fetchedCollectionLists.length > 0) {
          console.log('useEffect: ', fetchedCollectionLists);
          setCollectionLists(fetchedCollectionLists);
        }
      } catch (error) {
        console.error('useEffect - fetching collection lists error:', error); // ERROR
      }
    };

    console.log('메뉴 새로 가져오기');
    fetchCollectionLists();
  }, [recallBoolean]);

  const addCollection = async (title: string) => {
    const trimTitle = title.trim();

    if (!trimTitle || trimTitle === '') {
      throw new Error('공백을 컬렉션의 이름으로 사용할 수 없습니다.');
    }

    // 컬렉션 코멘트(note) 입력 및 전송 프로세스 필요

    requestAddCollection(trimTitle, '');
    setCollectionLists([
      ...collectionLists,
      {
        id: 0,
        title: trimTitle,
        note: '',
        shared_id: '',
        created_at: '',
        updated_at: '',
      },
    ]);
    setRecallBoolean(!recallBoolean);
  };

  const removeCollection = async (id: number) => {
    if (id === DEFAULT_COLLECTIONS_KEY) {
      throw new Error('전체 컬렉션은 삭제할 수 없습니다.');
    }

    try {
      // 로딩 화면 필요
      await requestRemoveCollection(id);
      setRecallBoolean(!recallBoolean);
    } catch (error) {
      console.error('Error removing collection: ', error); // ERROR
    }
  };

  const renameCollection = (index: number, changeTitle: string) => {
    const trimTitle = changeTitle.trim();

    if (!trimTitle || trimTitle === '') {
      throw new Error('공백을 컬렉션의 이름으로 사용할 수 없습니다.');
    }

    if (trimTitle === DEFAULT_COLLECTIONS_NAME) {
      throw new Error('기본 컬렉션의 이름은 바꿀 수 없습니다.');
    }

    const newValue = [...collections];

    newValue[index] = {
      ...newValue[index],
      title: trimTitle,
    };

    setCollections(newValue);
  };

  const findItemIndex = (index: number, wata: WataType) =>
    collections[index].items.findIndex(
      (storedWataId: WataIdType) => wata.id === storedWataId,
    );
  const existCollectionItem = (index: number, item: WataType) =>
    !(findItemIndex(index, item) < 0);

  const handleCollectionItems = (commands: boolean[], item: WataType) => {
    const newValue = [...collections];

    commands.forEach((command: boolean, index: number) => {
      if (command) {
        if (!existCollectionItem(index, item)) {
          newValue[index] = {
            ...newValue[index],
            items: [...newValue[index].items, item.id],
          };
        }
      } else if (!command) {
        const itemIndex = findItemIndex(index, item);

        if (itemIndex >= 0) {
          const newItems = [...newValue[index].items];
          newItems.splice(itemIndex, 1);

          newValue[index] = {
            ...newValue[index],
            items: newItems,
          };
        }
      }
    });

    setCollections(newValue);
  };

  return {
    collections,
    collectionLists,
    addCollection,
    removeCollection,
    renameCollection,
    existCollectionItem,
    handleCollectionItems,
  };
};

export default useCollections;
