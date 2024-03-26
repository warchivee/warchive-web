import { getData } from '@utils/api.util';
import moment from 'moment-timezone';
import { selector } from 'recoil';
import { WataListType } from 'src/types/wata.type';
import { loadLocalStorage, saveLocalstorage } from 'src/utils/localStorage';

const wataLocalStorageKey = 'SAVED_WATA';

interface SavedWataType {
  updated_at: Date;
  watas: WataListType;
}

const updateWata = async (updateAt: moment.Moment) => {
  const data = await getData('publish-wata');
  saveLocalstorage(wataLocalStorageKey, {
    updated_at: updateAt,
    watas: data,
  });
};

const getWata = () =>
  loadLocalStorage(wataLocalStorageKey) as SavedWataType | null;

export const wataListSelector = selector<WataListType>({
  key: 'wataListSelector',
  get: async () => {
    const savedWatas = getWata();

    const updateTime = moment(import.meta.env.VITE_DATA_UPDATE_AT).tz(
      'Asia/Seoul',
    );

    if (!savedWatas || !savedWatas?.updated_at || !savedWatas?.watas) {
      await updateWata(updateTime);
    }

    const lastUpdateTime = moment(savedWatas?.updated_at).tz('Asia/Seoul');

    if (!updateTime.isSame(lastUpdateTime)) {
      await updateWata(updateTime);
    }

    return getWata()?.watas as WataListType;
  },
});

export default wataListSelector;
