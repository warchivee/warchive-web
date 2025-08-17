import { getData } from '@utils/api.util';

export interface Banner {
  id: number;
  type: string;
  title: string;
  sub_title: string;
  intro: string;
  image: string;
  url: string;
  text_color: string;
  bg_start_color: string;
  bg_end_color: string;
  style: string;
  status: string;
}

export const getBannerApi = async () => getData<Banner[]>('banner');
