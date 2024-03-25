import { useEffect, useState } from 'react';
import Modal from '@components/CommonComponents/modal';
import Button from '@components/CommonComponents/button';
import Cropper, { Area } from 'react-easy-crop';
import { Text } from '@components/CommonComponents/text';
import resizeImage from '@utils/resizeImage.utils';
import WataCard from '@components/UserComponents/wata/card';
import getCroppedImg from '../../utils/cropImage.utils';

export default function AdminEditImage({
  type,
  originImage = '',
  cropImage = '',
  setCropImage,
}: {
  type: 'book' | 'card';
  originImage?: string;
  cropImage?: string;
  setCropImage: (image: string) => void;
}) {
  const ratio = type === 'card' ? 300 / 124 : 105 / 150;

  const [openEditImage, toggleEditImage] = useState<boolean>(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const previewOption =
    type === 'card'
      ? { width: '300px', height: '124px' }
      : { width: '105px', height: '150px' };

  const onCropComplete = (area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  };

  const handleModalConfirm = async () => {
    const croppedImage = await getCroppedImg(originImage, croppedAreaPixels, 0);

    const resizedImage = await resizeImage(croppedImage, {
      width: 500,
      aspectRatio: ratio,
    });

    setCropImage(resizedImage);

    toggleEditImage(false);
  };

  const handleModalClose = () => {
    toggleEditImage(false);
  };

  useEffect(() => {
    setCropImage(originImage || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originImage]);

  return (
    <div className="image-editor">
      <div className="controller">
        <Text color="gray">{type === 'book' ? '책표지' : '카드'}</Text>
        <div>
          <Button
            onClick={() => {
              if (cropImage !== '') {
                toggleEditImage(true);
              }
            }}
            icon="share-up"
          >
            에디터편집
          </Button>
        </div>
      </div>

      {cropImage &&
        cropImage !== '' &&
        (type === 'book' ? (
          <img
            style={{ ...previewOption, objectFit: 'cover' }}
            src={cropImage}
            alt="cropped"
          />
        ) : (
          <WataCard
            handleBookmark={() => {}}
            wata={{
              id: 1,
              title: 'test',
              creator: 'test',
              category: { value: '1', label: 'test' },
              genre: { value: '1', label: 'test' },
              keywords: [],
              cautions: [],
              platforms: [],
              thumbnail: cropImage,
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
