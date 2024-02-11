import { useEffect, useRef, useState } from 'react';
import Modal from '@components/modal';
import Button from '@components/button';
import Cropper, { Area } from 'react-easy-crop';
import { Text } from '@components/text';
import getCroppedImg from './cropImageUtils';

export default function EditImage({
  defaultSrc = '',
  cropImage = '#',
  setCropImage,
}: {
  defaultSrc?: string;
  cropImage: string;
  setCropImage: (image: string) => void;
}) {
  const [openEditImage, toggleEditImage] = useState<boolean>(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState('');
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(2 / 3);

  const imgInput = useRef<HTMLInputElement | null>(null);

  const onCropComplete = (area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCropImage(reader.result as string);
      setImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleModalConfirm = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels, 0);

    setCropImage(croppedImage);
    toggleEditImage(false);
  };

  const handleModalClose = () => {
    setAspect(2 / 3);
    toggleEditImage(false);
  };

  useEffect(() => {
    setImage(defaultSrc || '#');
    setCropImage(defaultSrc || '#');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSrc]);

  return (
    <div className="image-editor">
      <div className="controller">
        <Text color="gray">썸네일</Text>
        <div>
          <Button
            icon="download"
            onClick={() => {
              if (imgInput.current) {
                imgInput.current.click();
              }
            }}
          >
            업로드
            <input
              type="file"
              onChange={onChange}
              ref={imgInput}
              style={{ display: 'none' }}
            />
          </Button>

          <Button
            onClick={() => {
              if (cropImage !== '#') {
                toggleEditImage(true);
              }
            }}
            icon="share-up"
          >
            에디터편집
          </Button>
        </div>
      </div>

      {cropImage && cropImage !== '#' && (
        <img style={{ width: '140px' }} src={cropImage} alt="cropped" />
      )}

      <Modal
        isOpen={openEditImage}
        title="이미지 편집"
        onConfirm={handleModalConfirm}
        onClose={handleModalClose}
        onAfterOpen={() => {
          setImage(() => image);
        }}
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
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            margin: '1rem',
            justifyContent: 'center',
          }}
        >
          <Button
            background="selago"
            size="big"
            onClick={() => {
              setAspect(2 / 3);
            }}
          >
            2:3
          </Button>
          <Button
            background="selago"
            size="big"
            onClick={() => {
              setAspect(16 / 9);
            }}
          >
            16:9
          </Button>
        </div>
      </Modal>
    </div>
  );
}
