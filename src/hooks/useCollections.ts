import { WataIdType, WataType } from '@utils/common.type';
import { useRecoilState } from 'recoil';
import {
  DEFAULT_COLLECTIONS_KEY,
  DEFAULT_COLLECTIONS_NAME,
  collectionSelector,
} from 'src/data/collection.atom';

export const useCollections = () => {
  const [collections, setCollections] = useRecoilState(collectionSelector);

  const addCollection = (title: string) => {
    const trimTitle = title.trim();

    if (!trimTitle || trimTitle === '') {
      throw new Error('공백을 컬렉션의 이름으로 사용할 수 없습니다.');
    }

    setCollections([
      ...collections,
      {
        title: trimTitle,
        items: [],
      },
    ]);
  };

  const removeCollection = (index: number) => {
    if (index === DEFAULT_COLLECTIONS_KEY) {
      throw new Error('전체 컬렉션은 삭제할 수 없습니다.');
    }

    const newValue = [...collections];
    newValue.splice(index, 1);

    setCollections(newValue);
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
    addCollection,
    removeCollection,
    renameCollection,
    existCollectionItem,
    handleCollectionItems,
  };
};

export default useCollections;
