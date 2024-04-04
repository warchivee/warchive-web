import fetchCollections from '@utils/indexedDB/fetchCollectionFromIndexedDB.util';
import { atom } from 'recoil';
import { CollectionType } from 'src/types/collection.type';

interface CollectionAtomType {
  selectedIndex: number;
  collections: CollectionType[];
}

const getCollectionAtom = async () => {
  const collections = await fetchCollections();

  return {
    selectedIndex: 0,
    collections,
  };
};

export const collectionAtom = atom<CollectionAtomType>({
  key: 'selectedCollectionIndexAtom',
  default: getCollectionAtom(),
});

export default collectionAtom;
