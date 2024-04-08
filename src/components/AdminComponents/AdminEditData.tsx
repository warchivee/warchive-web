import ModalUtil from '@utils/modal.util';
import { useEffect, useRef, useState } from 'react';
import {
  EditAdminWata,
  EditAdminWataDto,
  Keyword,
  KeywordList,
  createWata,
  getKeywords,
  updateWata,
} from 'src/services/admin-wata.api';
import uploadImage from 'src/services/upload-image';
import { Text, Title } from '@components/CommonComponents/text';
import Drawer from '@components/CommonComponents/drawer';
import { AxiosError } from 'axios';
import { Button, IconButton, Input, Textarea, Typography } from '@mui/joy';
import {
  faPlus,
  faTrashCan,
  faUpload,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminMultiDropdown, { DropdownOption } from './AdminMultiDropdown';
import AdminEditImage from './AdminEditImage';
import DepthDropdown from './AdminDepthDropdown';
import AdminDropdown from './AdminDropdown';

export default function AdminEditData({
  data,
  isOpen,
  onClose,
  onConfirm,
}: {
  data?: EditAdminWata;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [editData, setEditData] = useState<EditAdminWata | undefined>(data);
  const [keywordList, setKeywordList] = useState<KeywordList>({
    categories: [],
    keywords: [],
    platforms: [],
    cautions: [],
  });

  const imgInput = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState('');
  const [cardCropImage, setCardCropImage] = useState(
    data?.thumbnail_card || '',
  );
  const [bookCropImage, setBookCropImage] = useState(
    data?.thumbnail_book || '',
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditData = (fieldName: string, updateValue: any) => {
    setEditData({
      ...(editData as EditAdminWata),
      [fieldName]: updateValue,
    });
  };

  const getKeywordList = async () => {
    const result = await getKeywords();
    setKeywordList(result);
  };

  const generateDropdownOptions = (array: Keyword[] = []) =>
    array
      ? array?.map(
          (item: Keyword) =>
            ({
              name: item.name,
              id: item.id,
            }) as DropdownOption,
        )
      : [];

  useEffect(() => {
    if (isOpen) {
      setCardCropImage(data?.thumbnail_card || '');
      setBookCropImage(data?.thumbnail_book || '');
      setImage('');
      setEditData(data);
      getKeywordList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Drawer
      isOpen={isOpen}
      align="right"
      color="black"
      background="alabaster"
      onClose={onClose}
      isBackgroundClickClose={false}
    >
      <div className="edit-data">
        <Title type="h3">{data ? '데이터 수정' : '데이터 입력'}</Title>
        <div className="item">
          <Text color="gray">제목</Text>
          <Input
            size="sm"
            variant="soft"
            value={editData?.title || ''}
            endDecorator={
              <Typography level="body-sm" textColor="tertiary">
                {editData?.title?.length ?? 0}/250
              </Typography>
            }
            slotProps={{
              input: {
                maxLength: 250,
              },
            }}
            onChange={(e) => {
              handleEditData('title', e.target.value);
            }}
          />
        </div>

        <div className="item">
          <Text color="gray">작가/감독</Text>
          <Input
            size="sm"
            variant="soft"
            value={editData?.creators || ''}
            endDecorator={
              <Typography level="body-sm" textColor="tertiary">
                {editData?.title?.length ?? 0}/250
              </Typography>
            }
            slotProps={{
              input: {
                maxLength: 250,
              },
            }}
            onChange={(e) => {
              handleEditData('creators', e.target.value);
            }}
          />
        </div>

        <div className="item">
          <Text color="gray">장르</Text>
          <DepthDropdown
            selectOption={
              editData?.genre
                ? {
                    id: editData?.genre?.category?.id,
                    name: editData?.genre?.category?.name,
                    subOption: {
                      id: editData?.genre?.id,
                      name: editData?.genre?.name,
                    },
                  }
                : undefined
            }
            options={keywordList.categories?.map((item) => ({
              id: item.id,
              name: item.name,
              subOptions: item.genres.map((genre) => ({
                id: genre.id,
                name: genre.name,
              })),
            }))}
            onChange={(value) => {
              handleEditData('genre', {
                id: value.subOption.id,
                name: value.subOption.name,
                category: { id: value.id, name: value.name },
              });
            }}
          />
        </div>

        <div className="item">
          <Text color="gray">키워드</Text>
          <AdminMultiDropdown
            isSearch
            selectedOptions={generateDropdownOptions(editData?.keywords)}
            options={generateDropdownOptions(keywordList.keywords)}
            onChange={(value) => {
              handleEditData('keywords', value);
            }}
          />
        </div>

        <div className="item">
          <Text color="gray">주의키워드</Text>
          <AdminMultiDropdown
            isSearch
            selectedOptions={generateDropdownOptions(editData?.cautions)}
            options={generateDropdownOptions(keywordList.cautions)}
            onChange={(value) => {
              handleEditData('cautions', value);
            }}
          />
        </div>

        <div className="item">
          <Text color="gray">썸네일</Text>
          <IconButton
            size="sm"
            variant="outlined"
            sx={{ gap: '0.2rem' }}
            onClick={() => {
              if (imgInput.current) {
                imgInput.current.click();
              }
            }}
          >
            <FontAwesomeIcon icon={faUpload} />
            업로드
            <input
              type="file"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => {
                e.preventDefault();
                let files;
                if (e.dataTransfer) {
                  files = e.dataTransfer.files;
                } else if (e.target) {
                  files = e.target.files;
                }
                const reader = new FileReader();
                reader.onload = () => {
                  setCardCropImage(reader.result as string);
                  setBookCropImage(reader.result as string);
                  setImage(reader.result as string);
                };
                reader.readAsDataURL(files[0]);
              }}
              ref={imgInput}
              style={{ display: 'none' }}
            />
          </IconButton>
        </div>

        <div className="item">
          <AdminEditImage
            type="card"
            cropImage={cardCropImage}
            setCropImage={setCardCropImage}
            originImage={image !== '' ? image : data?.thumbnail_card}
          />
          <AdminEditImage
            type="book"
            cropImage={bookCropImage}
            setCropImage={setBookCropImage}
            originImage={image !== '' ? image : data?.thumbnail_book}
          />
        </div>

        <div className="item">
          <Text color="gray">플랫폼</Text>
          {editData?.platforms?.map((platform, index) => (
            <div className="platforms" key={`platform-input-${index + 1}`}>
              <AdminDropdown
                isSearch
                selectedOption={
                  platform.id === null
                    ? undefined
                    : ({
                        mappingId: platform.mapping_id,
                        name: platform.name,
                        id: platform.id,
                      } as DropdownOption)
                }
                options={generateDropdownOptions(keywordList.platforms)}
                onChange={(value) => {
                  const newPlatforms = [...(editData?.platforms || [])];
                  newPlatforms.splice(index, 1, {
                    ...newPlatforms[index],
                    id: value?.id,
                    name: value?.name,
                  });
                  handleEditData('platforms', newPlatforms);
                }}
              />
              <div className="platform-input">
                <Input
                  size="sm"
                  variant="soft"
                  value={platform?.url}
                  placeholder="url을 입력해주세요."
                  onChange={(e) => {
                    const input = e.target.value;

                    const newPlatforms = [...(editData?.platforms || [])];
                    newPlatforms.splice(index, 1, {
                      ...newPlatforms[index],
                      url: input,
                    });
                    handleEditData('platforms', newPlatforms);
                  }}
                />
                <IconButton
                  onClick={() => {
                    const newPlatforms = [...(editData?.platforms || [])];
                    newPlatforms.splice(index, 1);
                    handleEditData('platforms', newPlatforms);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </IconButton>
              </div>
            </div>
          ))}

          <IconButton
            size="sm"
            variant="outlined"
            color="neutral"
            sx={{ gap: '0.2rem' }}
            onClick={() => {
              handleEditData('platforms', [
                ...(editData?.platforms || []),
                { id: null, name: '', url: '' },
              ]);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            추가
          </IconButton>
        </div>

        <div className="item">
          <Text color="gray">비고</Text>
          <Textarea
            size="sm"
            variant="soft"
            minRows={2}
            sx={{ width: '100%' }}
            value={editData?.note ?? ''}
            onChange={(e) => {
              e.preventDefault();
              handleEditData('note', e.target.value);
            }}
          />
        </div>

        <div className="controller">
          <Button
            variant="plain"
            color="neutral"
            onClick={() => {
              ModalUtil.open({
                title: '데이터 입력 취소',
                message: '데이터 입력을 취소하시겠습니까?',
                onConfirm: onClose,
              });
            }}
          >
            취소
          </Button>
          <Button
            variant="plain"
            loading={isLoading}
            onClick={async () => {
              setIsLoading(true);

              if (
                !editData?.title ||
                editData?.title?.replace(' ', '') === ''
              ) {
                ModalUtil.open({
                  title: '입력 오류',
                  message:
                    '데이터 수정 시 제목은 필수 입력값입니다. 제목을 입력해주세요.',
                });
                return;
              }

              let thumbnailCard = cardCropImage;
              let thumbnailBook = bookCropImage;

              try {
                if (
                  thumbnailCard !== data?.thumbnail_card &&
                  thumbnailCard !== ''
                ) {
                  const { url } = await uploadImage(
                    thumbnailCard.replace('data:image/jpeg;base64,', ''),
                    `${editData?.title}-card`,
                  );

                  thumbnailCard = url;
                }

                if (
                  thumbnailBook !== data?.thumbnail_book &&
                  thumbnailBook !== ''
                ) {
                  const { url } = await uploadImage(
                    thumbnailBook.replace('data:image/jpeg;base64,', ''),
                    `${editData?.title}-book`,
                  );

                  thumbnailBook = url;
                }
              } catch (error) {
                const { error: imgbbError } = (error as AxiosError)?.response
                  ?.data as {
                  error: { code: number; message: string };
                };

                ModalUtil.open({
                  title: '이미지 업로드 오류',
                  message: `담당자에게 문의해주세요 - [${imgbbError?.code}] ${imgbbError?.message}`,
                });

                setIsLoading(false);
                return;
              }

              const updateData = {
                title: editData?.title,
                creators: editData?.creators,
                platforms: editData?.platforms?.map((platform) => ({
                  id: platform.id,
                  url: platform.url,
                })),
                genre: editData?.genre?.id,
                cautions: editData?.cautions?.map((item) => item.id),
                keywords: editData?.keywords?.map((item) => item.id),
                thumbnail_card: thumbnailCard,
                thumbnail_book: thumbnailBook,
                note: editData?.note,
              } as EditAdminWataDto;

              try {
                if (!data?.id) {
                  await createWata(updateData);
                } else {
                  await updateWata(data?.id, updateData);
                }

                onClose();
                onConfirm();
              } catch (error) {
                setIsLoading(false);
              }

              setIsLoading(false);
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
