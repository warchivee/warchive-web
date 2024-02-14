import ModalUtil from '@utils/modal.util';
import { useEffect, useState } from 'react';
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
import Input from '@components/CommonComponents/input';
import Button from '@components/CommonComponents/button';
import Drawer from '@components/CommonComponents/drawer';
import { AxiosError } from 'axios';
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

  const [cropImage, setCropImage] = useState(data?.thumbnail_url || '#');

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
      setCropImage(data?.thumbnail_url || '#');
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
            value={editData?.title || ''}
            maxLength={250}
            onChange={(value) => {
              handleEditData('title', value);
            }}
          />
        </div>

        <div className="item">
          <Text color="gray">작가/감독</Text>
          <Input
            value={editData?.creators || ''}
            maxLength={250}
            onChange={(value) => {
              handleEditData('creators', value);
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
            isAdd
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
            isAdd
            selectedOptions={generateDropdownOptions(editData?.cautions)}
            options={generateDropdownOptions(keywordList.cautions)}
            onChange={(value) => {
              handleEditData('cautions', value);
            }}
          />
        </div>

        <div className="item">
          <AdminEditImage
            cropImage={cropImage}
            setCropImage={setCropImage}
            defaultSrc={data?.thumbnail_url}
          />
        </div>

        <div className="item">
          <Text color="gray">플랫폼</Text>
          {editData?.platforms?.map((platform, index) => (
            <div className="platforms" key={`platform-input-${index + 1}`}>
              <AdminDropdown
                isSearch
                isAdd
                selectedOption={
                  platform.id === null
                    ? undefined
                    : ({
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
                  value={platform?.url}
                  placeholder="url을 입력해주세요."
                  onChange={(input) => {
                    const newPlatforms = [...(editData?.platforms || [])];
                    newPlatforms.splice(index, 1, {
                      ...newPlatforms[index],
                      url: input,
                    });
                    handleEditData('platforms', newPlatforms);
                  }}
                />
                <Button
                  icon="minus"
                  onClick={() => {
                    const newPlatforms = [...(editData?.platforms || [])];
                    newPlatforms.splice(index, 1);
                    handleEditData('platforms', newPlatforms);
                  }}
                >
                  삭제
                </Button>
              </div>
            </div>
          ))}
          <Button
            icon="plus"
            background="athens-gray"
            border="round"
            onClick={() => {
              handleEditData('platforms', [
                ...(editData?.platforms || []),
                { id: null, name: '', url: '' },
              ]);
            }}
          >
            추가
          </Button>
        </div>

        <div className="item">
          <Text color="gray">비고</Text>
          <textarea
            value={editData?.note ?? ''}
            onChange={(e) => {
              e.preventDefault();
              handleEditData('note', e.target.value);
            }}
          />
        </div>

        <div className="controller">
          <Button
            background="athens-gray"
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
            background="french-lilac"
            labelColor="purple"
            isLoading={isLoading}
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

              let thumbnailUrl = data?.thumbnail_url;

              try {
                if (cropImage !== data?.thumbnail_url && cropImage !== '#') {
                  const { url } = await uploadImage(
                    cropImage.replace('data:image/png;base64,', ''),
                    `${editData?.title}_${editData?.creators}`,
                  );

                  thumbnailUrl = url;
                }
              } catch (error) {
                ModalUtil.open({
                  title: '이미지 업로드 오류',
                  message: `${(error as AxiosError)?.response}`,
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
                thumbnail_url: thumbnailUrl,
                note: editData?.note,
              } as EditAdminWataDto;

              if (!data?.id) {
                await createWata(updateData);
              } else {
                await updateWata(data?.id, updateData);
              }
              onClose();
              onConfirm();

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
