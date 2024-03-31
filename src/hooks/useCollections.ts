import { useRecoilState, useRecoilValue } from 'recoil';
import {
  UpdateCollectionItemParam,
  createCollectionApi,
  deleteCollectionApi,
  deleteCollectionItemsApi,
  updateCollectionApi,
  updateCollectionItemApi,
} from 'src/services/collection.api';
import {
  collectionSelector,
  selectCollectionIndexState,
} from 'src/stores/collectionList.atom';
import wataListSelector from 'src/stores/wata.atom';
import { WataIdType } from 'src/types/wata.type';

export const useCollection = () => {
  const { watas } = useRecoilValue(wataListSelector);
  const [collections, setCollections] = useRecoilState(collectionSelector);
  const [selectIndex, setSelectIndex] = useRecoilState(
    selectCollectionIndexState,
  );

  const getSelectCollectionIndex = () => selectIndex;

  const getCollections = () => collections;

  const getCollection = () => collections[selectIndex];

  const getCollectionItems = () => {
    const collection = { ...collections[selectIndex] };

    if (!collection || !collection?.items || collection?.items?.length === 0) {
      return [];
    }
    return watas?.filter((wata) => collection?.items?.includes(wata.id));
  };

  const selectCollection = (index: number) => {
    setSelectIndex(index);
  };

  const updateCollection = async (params: { title: string; note: string }) => {
    if (
      getCollection().title === params.title &&
      getCollection().note === params.note
    ) {
      return;
    }

    const result = await updateCollectionApi(getCollection()?.id, params);

    const newCollections = [...collections];

    newCollections[selectIndex] = {
      ...collections[selectIndex],
      title: result?.title,
      note: result?.note,
    };

    setCollections(newCollections);
  };

  const addCollection = async (title: string) => {
    if (title?.replace(' ', '') === '') {
      return;
    }

    try {
      const result = await createCollectionApi({
        title,
        note: '',
      });

      const newCollections = collections.concat(result);

      setSelectIndex(newCollections.length - 1);
      setCollections(newCollections);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCollection = async () => {
    try {
      await deleteCollectionApi(getCollection().id);

      const newCollections = [...collections];
      newCollections?.splice(selectIndex, 1);

      setSelectIndex(selectIndex - 1);
      setCollections(newCollections);
    } catch (error) {
      console.error(error);
    }
  };

  const addCollectionItem = (wataIds: WataIdType[]) => {
    const newCollections = [...collections];

    newCollections[selectIndex] = {
      ...newCollections[selectIndex],
      items: newCollections[selectIndex].items.concat(wataIds),
    };

    setCollections(newCollections);
  };

  const deleteCollectionItem = async (wataIds: WataIdType[]) => {
    try {
      await deleteCollectionItemsApi(getCollection()?.id, wataIds);

      const newCollections = [...collections];

      const newItems = newCollections[selectIndex]?.items?.filter(
        (item) => !wataIds.includes(item),
      );

      newCollections[selectIndex] = {
        ...newCollections[selectIndex],
        items: newItems,
      };

      setCollections(newCollections);
    } catch (error) {
      console.error(error);
    }
  };

  const findIndexByCollectionId = (collectionId: number) =>
    collections?.findIndex((collection) => collection.id === collectionId);

  const updateCollectionItems = async (
    updateItems: UpdateCollectionItemParam[],
  ) => {
    try {
      await updateCollectionItemApi(updateItems);

      const newCollections = [...collections];

      updateItems?.forEach((updateItem) => {
        const index = findIndexByCollectionId(updateItem.collection_id);
        const items = newCollections[index].items ?? [];

        if (updateItem.action === 'ADD') {
          newCollections[index] = {
            ...newCollections[index],
            items: items.concat(updateItem.wata_id),
          };
        } else if (updateItem.action === 'DELETE') {
          const newItems = items?.filter((item) => item !== updateItem.wata_id);

          newCollections[index] = {
            ...newCollections[index],
            items: newItems,
          };
        }
      });

      setCollections(newCollections);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getSelectCollectionIndex,
    getCollection,
    getCollections,
    getCollectionItems,
    selectCollection,
    updateCollection,
    addCollection,
    deleteCollection,
    addCollectionItem,
    deleteCollectionItem,
    updateCollectionItems,
  };
};

export default useCollection;
