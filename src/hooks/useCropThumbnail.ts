import getCroppedImg from '@utils/image/cropImage.utils';
import { useCallback, useEffect, useState } from 'react';
import { WataType } from 'src/types/wata.type';

export const useCropThumbnail = (wata: WataType, type: 'card' | 'book') => {
  const [cropThumbnail, setCropThumbnail] = useState<string>();

  const initThumbnail = useCallback(async () => {
    if (!wata?.thumbnail) {
      setCropThumbnail(
        'https://www.freeiconspng.com/uploads/no-image-icon-4.png',
      );
      return;
    }

    const ratio = type === 'card' ? wata?.thumbnail_card : wata?.thumbnail_book;

    if (!ratio) {
      setCropThumbnail(wata?.thumbnail);

      return;
    }

    const cropImg = await getCroppedImg(wata.thumbnail, ratio, 0);

    setCropThumbnail(cropImg);
  }, [wata, type]);

  useEffect(() => {
    initThumbnail();
  }, [initThumbnail, wata]);

  return cropThumbnail;
};

export default useCropThumbnail;
