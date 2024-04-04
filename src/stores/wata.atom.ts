import fetchWatas from '@utils/indexedDB/fetchWataFromIndexedDB.util';
import { atom } from 'recoil';
import { WataType } from 'src/types/wata.type';

export const wataAtom = atom<WataType[]>({
  key: 'wataAtom',
  default: fetchWatas(),
});

export default wataAtom;
