import IndexedDBUtil, {
  COLLECTION_STORE,
} from '@utils/indexedDB/indexedDB.util';
import fetchCollections from '@utils/indexedDB/fetchCollectionFromIndexedDB.util';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  UpdateCollectionItemParam,
  createCollectionApi,
  deleteCollectionApi,
  updateCollectionApi,
  updateCollectionItemApi,
} from 'src/services/collection.api';
import { collectionAtom } from 'src/stores/collection.atom';
import wataAtom from 'src/stores/wata.atom';
import RecoverableError from 'src/types/error/RecoverableError';
import { validInputText } from '@utils/stringValid.util';
import {
  COMMENT_LIMIT_LENGTH,
  TITLE_LIMIT_LENGTH,
} from 'src/types/collection.type';

export const collectionLocalStorageKey = 'COLLECTION_SAVED_AT';

export const COLLECTIONS_LIMMIT_COUNT = 20;
export const COLLECTION_ITEMS_LIMIT_COUNT = 50;

const indexedDB = IndexedDBUtil.getInstance();

export const useCollection = () => {
  const watas = useRecoilValue(wataAtom);
  const [collectionState, setCollectionState] = useRecoilState(collectionAtom);

  const getSelectCollectionIndex = () => collectionState.selectedIndex;

  const getCollections = () => collectionState.collections ?? [];

  const getCollection = () =>
    getCollections()[getSelectCollectionIndex()] ?? [];

  const isCollectionsEmpty = () =>
    !getCollections() || getCollections()?.length <= 0;

  const getCollectionItems = () => {
    const collection = getCollection();

    if (!collection || !collection?.items || collection?.items?.length === 0) {
      return [];
    }
    return watas?.filter((wata) => collection?.items?.includes(wata.id));
  };

  const selectCollection = (index: number) => {
    setCollectionState({ ...collectionState, selectedIndex: index });
  };

  const updateCollection = async (params: { title: string; note: string }) => {
    if (
      getCollection()?.title === params.title &&
      getCollection()?.note === params.note
    ) {
      return;
    }

    if (params.title?.replace(' ', '')?.length < 2) {
      throw new RecoverableError('컬렉션 이름은 두 글자 이상이어야 합니다.');
    }

    if (validInputText(params.title) || validInputText(params.note)) {
      throw new RecoverableError(
        '컬렉션 이름과 코멘트에는 괄호, &, 따옴표, 외부 주소를 입력할 수 없습니다.',
      );
    }

    if (
      params.title.length > TITLE_LIMIT_LENGTH ||
      params.note.length > COMMENT_LIMIT_LENGTH
    ) {
      throw new RecoverableError(
        '컬렉션 이름은 50자, 코멘트는 200자까지만 입력할 수 있습니다.',
      );
    }

    const result = await updateCollectionApi(getCollection()?.id, params);

    await indexedDB.updateItem(COLLECTION_STORE, {
      ...getCollection(),
      title: result.title,
      note: result.note,
    });

    setCollectionState({
      ...collectionState,
      collections: await fetchCollections(),
    });
  };

  const addCollection = async (title: string) => {
    if (getCollections()?.length >= COLLECTIONS_LIMMIT_COUNT) {
      throw new RecoverableError(
        `컬렉션은 ${COLLECTIONS_LIMMIT_COUNT}개만 생성할 수 있습니다.`,
      );
    }

    if (title?.replace(' ', '')?.length < 2) {
      throw new RecoverableError('컬렉션 이름은 두 글자 이상이어야 합니다.');
    }

    if (title.length > TITLE_LIMIT_LENGTH) {
      throw new RecoverableError(
        '컬렉션 이름은 50자까지만 입력할 수 있습니다.',
      );
    }

    if (validInputText(title)) {
      throw new RecoverableError(
        '컬렉션 이름에는 괄호, &, 따옴표, 외부 주소를 입력할 수 없습니다.',
      );
    }

    const result = await createCollectionApi({
      title,
      note: '',
    });

    await indexedDB.addItem(COLLECTION_STORE, result);

    setCollectionState({
      ...collectionState,
      selectedIndex: getCollections().length,
      collections: await fetchCollections(),
    });
  };

  const deleteCollection = async () => {
    try {
      const { id } = getCollection();

      await deleteCollectionApi(id);

      await indexedDB.deleteItem(COLLECTION_STORE, id);

      setCollectionState({
        ...collectionState,
        selectedIndex: getSelectCollectionIndex() - 1,
        collections: await fetchCollections(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const findIndexByCollectionId = (collectionId: number) =>
    getCollections()?.findIndex((collection) => collection.id === collectionId);

  const updateCollectionItems = async (
    updateItems: UpdateCollectionItemParam[],
  ) => {
    let addCount: Record<number, number> = {};

    updateItems.forEach((item) => {
      if (item.action === 'ADD') {
        let count = 0;

        if (!addCount[item.collection_id]) {
          const index = findIndexByCollectionId(item.collection_id);
          count = getCollections()[index]?.items?.length ?? 0 + 1;
        } else {
          count = addCount[item.collection_id] + 1;
        }

        if (count > COLLECTION_ITEMS_LIMIT_COUNT) {
          throw new RecoverableError(
            `한 컬렉션에는 작품을 ${COLLECTION_ITEMS_LIMIT_COUNT} 까지만 추가할 수 있습니다.`,
          );
        }

        addCount = { ...addCount, [item.collection_id]: count };
      }
    });

    try {
      await updateCollectionItemApi(updateItems);

      updateItems?.forEach(async (updateItem) => {
        const index = findIndexByCollectionId(updateItem.collection_id);
        const collection = getCollections()[index];
        const items = collection.items ?? [];

        if (updateItem.action === 'ADD') {
          const updated = {
            ...collection,
            items: items.concat(updateItem.wata_id),
          };

          await indexedDB.updateItem(COLLECTION_STORE, updated);
        } else if (updateItem.action === 'DELETE') {
          const updated = {
            ...collection,
            items: items?.filter((item) => item !== updateItem.wata_id),
          };

          await indexedDB.updateItem(COLLECTION_STORE, updated);
        }
      });

      setCollectionState({
        ...collectionState,
        collections: await fetchCollections(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isCollectionsEmpty,
    getSelectCollectionIndex,
    getCollection,
    getCollections,
    getCollectionItems,
    selectCollection,
    updateCollection,
    addCollection,
    deleteCollection,
    updateCollectionItems,
  };
};

export default useCollection;
