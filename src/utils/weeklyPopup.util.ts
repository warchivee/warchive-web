import moment from 'moment';
import localStorageUtil from './localstorage.util';

const WEEKLY_MODAL_KEY = 'weekly_popup_close_time';

const weeklyPopupHandler = {
  set() {
    let date = moment();
    date = date.add(7, 'd');
    localStorageUtil.save(WEEKLY_MODAL_KEY, date, false);
  },
  delete() {
    localStorageUtil.remove(WEEKLY_MODAL_KEY);
  },
  isSettingClose() {
    const now = moment();

    try {
      const date = localStorageUtil.get(WEEKLY_MODAL_KEY, false) ?? undefined;
      return now.isBefore(date);
    } catch (error) {
      return false;
    }
  },
};

export default weeklyPopupHandler;
