import { DropdownOption } from '@components/AdminComponents/AdminMultiDropdown';
import { getData, patchData, postData } from '@utils/api.util';
import ModalUtil from '@utils/modal.util';
import { AxiosError } from 'axios';
import { Moment } from 'moment';

export interface WataThumbnailCropAreaType {
  w: number;
  h: number;
  x: number;
  y: number;
}

export const labelOptions: DropdownOption[] = [
  {
    name: '검수전',
    id: 'NEED_CHECK',
    color: 'athens-gray',
  },
  {
    name: '검수중',
    id: 'CHECKING',
    color: 'cream-brulee',
  },
  {
    name: '검수완료',
    id: 'CHECKED',
    color: 'french-lilac',
  },
  {
    name: '보류',
    id: 'HOLD',
    color: 'botticelli',
  },
  {
    name: '컨택필요',
    id: 'NEED_CANTACT',
    color: 'tropical-blue',
  },
  {
    name: '탈락',
    id: 'CENSOR',
    color: 'your-pink',
  },
];

export interface ApiGetResult<T> {
  total_count: number;
  result: T;
}

export interface Keyword {
  id: number | string;
  name: string;
}

interface Platform extends Keyword {
  mapping_id: number;
  url: string;
}

interface Genre extends Keyword {
  category: Keyword;
}

export interface Category extends Keyword {
  genres: Keyword[];
}

export interface KeywordList {
  categories: Category[];
  keywords: Keyword[];
  cautions: Keyword[];
  platforms: Platform[];
}

export interface EditAdminWata {
  id?: number;
  title: string;
  creators: string;
  genre?: Genre;
  keywords?: Keyword[];
  cautions?: Keyword[];
  platforms?: Platform[];
  thumbnail?: string;
  thumbnail_card?: WataThumbnailCropAreaType;
  thumbnail_book?: WataThumbnailCropAreaType;
  note?: string;
  label?: string;
}

export interface AdminWata extends EditAdminWata {
  adder: {
    id: number;
    nickname: string;
  };
  updater?: {
    id: number;
    nickname: string;
  };
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface EditAdminWataDto {
  title: string;
  creators?: string;
  genre?: number;
  keywords?: number[];
  cautions?: number[];
  platforms?: {
    id: number;
    url: string;
  };
  thumbnail_card?: string;
  thumbnail_book?: string;
  note?: string;
  label?: string;
}

export interface FindWataConditions {
  title?: string;
  label?: string[];
  updateStartDate?: Moment;
  updateEndDate?: Moment;
  isPublished?: string;
  needWriteItems?: string[];
}

export const getWata = (
  conditions: FindWataConditions,
  pageNo: number,
  pageSize: number,
) => {
  const {
    title,
    label,
    updateStartDate,
    updateEndDate,
    isPublished,
    needWriteItems,
  } = conditions;

  const params = {
    ...(title && { title }),
    ...(label && label.length !== 0 && { label: label.join(',') }),
    ...(updateStartDate && { updateStartDate }),
    ...(updateEndDate && { updateEndDate }),
    ...(isPublished && { isPublished }),
    ...(needWriteItems &&
      needWriteItems.length !== 0 && {
        needWriteItems: needWriteItems.join(','),
      }),
  };

  return getData<ApiGetResult<AdminWata[]>>('admin/wata', {
    ...params,
    page: pageNo || 1,
    page_size: pageSize || 10,
  });
};

export const getKeywords = () => getData<KeywordList>('admin/keywords');
export default getWata;

export const createWata = async (data: EditAdminWataDto) => {
  try {
    await postData<number>('admin/wata', data);
  } catch (error) {
    ModalUtil.open({
      title: '데이터 업데이트 오류',
      message: `${((error as AxiosError)?.response?.data as { message: string })?.message}`,
    });
    throw error;
  }
};

export const updateWata = async (id: number, data: EditAdminWataDto) => {
  try {
    await patchData(`admin/wata/${id}`, data);
  } catch (error) {
    ModalUtil.open({
      title: '데이터 업데이트 오류',
      message: `${((error as AxiosError)?.response?.data as { message: string })?.message}`,
    });
    throw error;
  }
};
