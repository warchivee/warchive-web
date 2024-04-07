import fetchCollections from '@utils/indexedDB/fetchCollectionFromIndexedDB.util';
import { atom } from 'recoil';
import { CollectionType } from 'src/types/collection.type';

interface CollectionAtomType {
  selectedIndex: number;
  collections: CollectionType[];
}

const initCollectionState = async () => {
  const collections = await fetchCollections();

  return collections ?? [];
};

export const collectionAtom = atom<CollectionAtomType>({
  key: 'collectionAtom',
  default: {
    selectedIndex: 0,
    collections: await initCollectionState(),
  },
});

export default collectionAtom;
