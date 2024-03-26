import {
  CollectionListType,
  CollectionType,
  DEFAULT_COLLECTIONS_KEY,
  DEFAULT_COLLECTIONS_NAME,
  defaultCollectionListValue,
  defaultCollectionValue,
} from 'src/types/collection.type';
import { WataIdType, WataType } from 'src/types/wata.type';
import { useEffect, useState } from 'react';
import { getCollection } from 'src/atoms/collection.atom';
import {
  getCollectionList,
  requestAddCollection,
  requestRemoveCollection,
  requestRenameCollection,
} from 'src/atoms/collectionList.atom';

export const useCollections = () => {
  const [collectionLists, setCollectionLists] = useState<CollectionListType[]>(
    defaultCollectionListValue,
  );
  const [collections, setCollections] = useState<CollectionType[]>(
    defaultCollectionValue,
  );

  const [recallLists, setRecallLists] = useState(false);
  const [recallContents, setRecallContents] = useState(false);
  useEffect(() => {
    const fetchCollectionLists = async () => {
      try {
        const fetchedCollectionLists = await getCollectionList();
        if (fetchedCollectionLists && fetchedCollectionLists.length > 0) {
          setCollectionLists(fetchedCollectionLists);
          setRecallContents(!recallContents);
        }
      } catch (error) {
        console.error('useEffect - fetching collection lists error:', error); // ERROR
      }
    };

    fetchCollectionLists();
  }, [recallLists]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const fetchedCollections = await Promise.all(
          collectionLists.map(async (collection) => {
            if (collection.id === 0) return null;
            const fetchedCollection = await getCollection(
              1,
              18,
              collection.shared_id,
            );
            return fetchedCollection;
          }),
        );

        const filteredCollections = fetchedCollections.filter(
          (collection) => collection !== null,
        ) as CollectionType[];
        setCollections([...collections, ...filteredCollections]);
      } catch (error) {
        console.error('useEffect - fetching collection contents error:', error); // ERROR
      }
    };

    if (
      !(
        collectionLists.length == 1 &&
        collectionLists[0].title === DEFAULT_COLLECTIONS_NAME
      )
    ) {
      fetchCollections();
    }
  }, [recallContents]);

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
    // 생성 후 reloading 필요
    setRecallLists(!recallLists);
  };

  const removeCollection = async (id: number) => {
    if (id === DEFAULT_COLLECTIONS_KEY) {
      throw new Error('전체 컬렉션은 삭제할 수 없습니다.');
    }

    try {
      // 로딩 화면 필요
      await requestRemoveCollection(id);
      setRecallLists(!recallLists);
    } catch (error) {
      console.error('Error removing collection: ', error); // ERROR
    }
  };

  const renameCollection = async (
    index: number,
    changeText: string,
    isTitle: boolean,
  ) => {
    if (isTitle) {
      // 컬렉션 이름 수정
      const trimTitle = changeText.trim();
      if (!trimTitle || trimTitle === '') {
        throw new Error('공백을 컬렉션의 이름으로 사용할 수 없습니다.');
      }
      if (trimTitle === DEFAULT_COLLECTIONS_NAME) {
        throw new Error('기본 컬렉션의 이름은 바꿀 수 없습니다.');
      }

      try {
        await requestRenameCollection(
          collectionLists[index].id,
          trimTitle,
          collectionLists[index].note,
        );
        setRecallLists(!recallLists);
      } catch (error) {
        console.error('Error patch name collection: ', error); // ERROR
      }
    } else {
      // 컬렉션 메모 수정
      const trimNote = changeText.trim();

      try {
        await requestRenameCollection(
          collectionLists[index].id,
          collectionLists[index].title,
          trimNote,
        );
        setRecallLists(!recallLists);
      } catch (error) {
        console.error('Error patch note collection: ', error); // ERROR
      }
    }
  };

  // 서버와 통신하는 코드로 수정할 것
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
