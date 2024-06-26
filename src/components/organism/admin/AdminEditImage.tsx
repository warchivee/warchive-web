import { useEffect, useState } from 'react';
import Modal from '@components/CommonComponents/modal';
import Cropper, { Area } from 'react-easy-crop';
import { Text } from '@components/CommonComponents/text';
import WataCard from '@components/organism/wata/WataCard';
import { Button } from '@mui/joy';
import {
  EditAdminWata,
  WataThumbnailCropAreaType,
} from 'src/services/admin-wata.api';
import getCroppedImg from '../../../utils/image/cropImage.utils';

export default function AdminEditImage({
  wata,
  type,
  originImage = '',
  cropArea,
  setCropArea,
}: {
  wata: EditAdminWata | undefined;
  type: 'book' | 'card';
  originImage?: string;
  cropArea?: WataThumbnailCropAreaType;
  setCropArea: (area: WataThumbnailCropAreaType) => void;
}) {
  const ratio = type === 'card' ? 300 / 124 : 105 / 150;

  const [openEditImage, toggleEditImage] = useState<boolean>(false);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<WataThumbnailCropAreaType>({
      w: 0,
      h: 0,
      x: 0,
      y: 0,
    });

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [cropPreview, setCropPreview] = useState('');

  const previewOption =
    type === 'card'
      ? { width: '300px', height: '124px' }
      : { width: '105px', height: '150px' };

  const onCropComplete = (area: Area, areaPixels: Area) => {
    setCroppedAreaPixels({
      w: areaPixels.width,
      h: areaPixels.height,
      x: areaPixels.x,
      y: areaPixels.y,
    });
  };

  const handleModalConfirm = async () => {
    const croppedImage = await getCroppedImg(originImage, croppedAreaPixels, 0);

    setCropPreview(croppedImage);
    setCropArea(croppedAreaPixels);

    toggleEditImage(false);
  };

  const handleModalClose = () => {
    toggleEditImage(false);
  };

  useEffect(() => {
    setCropPreview(originImage || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originImage]);

  return (
    <div className="image-editor">
      <div className="controller">
        <Text color="gray">{type === 'book' ? '책표지' : '카드'}</Text>
        <div>
          <Button
            size="sm"
            variant="soft"
            color="neutral"
            onClick={() => {
              if (originImage !== '') {
                toggleEditImage(true);
              }
            }}
          >
            에디터편집
          </Button>
        </div>
      </div>

      {cropPreview &&
        cropPreview !== '' &&
        (type === 'book' ? (
          <img
            style={{ ...previewOption, objectFit: 'cover' }}
            src={cropPreview}
            alt="cropped"
          />
        ) : (
          <WataCard
            wata={{
              id: 0,
              title: wata?.title ?? '',
              creators: wata?.creators ?? '',
              category: { id: 0, name: '' },
              genre: { id: 0, name: '' },
              keywords: [],
              cautions: [],
              platforms: [],
              thumbnail: originImage,
              thumbnail_card: cropArea,
            }}
          />
        ))}

      <Modal
        isOpen={openEditImage}
        title="이미지 편집"
        onConfirm={handleModalConfirm}
        onClose={handleModalClose}
        buttons={['cancel', 'confirm']}
      >
        <div>
          <div
            style={{
              position: 'relative',
              background: '#fff',
              height: 400,
              width: '100%',
            }}
          >
            <Cropper
              image={originImage}
              crop={crop}
              zoom={zoom}
              aspect={ratio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
