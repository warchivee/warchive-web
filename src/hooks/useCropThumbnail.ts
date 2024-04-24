import getCroppedImg from '@utils/image/cropImage.utils';
import { useCallback, useEffect, useState } from 'react';
import { AdminWata } from 'src/services/admin-wata.api';
import { WataType } from 'src/types/wata.type';

export const useCropThumbnail = (
  wata: WataType | AdminWata | undefined,
  type: 'card' | 'book',
) => {
  const [cropThumbnail, setCropThumbnail] = useState<string>();

  const initThumbnail = useCallback(async () => {
    if (!wata) {
      return;
    }

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
    setCropThumbnail(undefined);

    initThumbnail();
  }, [initThumbnail, wata]);

  return cropThumbnail;
};

export default useCropThumbnail;
