import Button from '@components/button';
import CategoryDropdown from '@components/depthDropdown';
import Drawer from '@components/drawer';
import { DropdownOption } from '@components/dropdown';
import Input from '@components/input';
import MultiDropdown from '@components/multiDropdown';
import { Text, Title } from '@components/text';
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
} from 'src/services/admin/admin-wata.api';
import uploadImage from 'src/services/imgbb/upload-image';
import EditImage from '../editImage';

export default function AdminEditData({
  data = {
    title: '',
    creators: '',
    keywords: [],
    cautions: [],
    platforms: [],
  },
  isOpen,
  onClose,
  onConfirm,
}: {
  data?: EditAdminWata;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [editData, setEditData] = useState<EditAdminWata>(data);
  const [keywordList, setKeywordList] = useState<KeywordList>({
    categories: [],
    keywords: [],
    platforms: [],
    cautions: [],
  });

  const [cropImage, setCropImage] = useState(data.thumbnail_url || '#');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditData = (fieldName: string, updateValue: any) => {
    setEditData({
      ...editData,
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
      setCropImage(data.thumbnail_url || '#');
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
        <Title type="h2">📝 데이터 수정</Title>
        <div className="item">
          <Text color="gray">제목*</Text>
          <Input
            value={editData.title}
            maxLength={250}
            onChange={(value) => {
              handleEditData('title', value);
            }}
          />
        </div>

        <div className="item">
          <Text color="gray">작가/감독*</Text>
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
          <CategoryDropdown
            selectOption={
              editData.genre
                ? {
                    id: editData.genre?.category?.id,
                    name: editData.genre?.category?.name,
                    subOption: {
                      id: editData.genre?.id,
                      name: editData.genre?.name,
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
          <MultiDropdown
            isSearch
            selectedOptions={generateDropdownOptions(editData.keywords)}
            options={generateDropdownOptions(keywordList.keywords)}
            onChange={(value) => {
              handleEditData('keywords', value);
            }}
          />
        </div>

        <div className="item">
          <Text color="gray">주의키워드</Text>
          <MultiDropdown
            isSearch
            selectedOptions={generateDropdownOptions(editData.cautions)}
            options={generateDropdownOptions(keywordList.cautions)}
            onChange={(value) => {
              handleEditData('cautions', value);
            }}
          />
        </div>

        <div className="item">
          <EditImage
            cropImage={cropImage}
            setCropImage={setCropImage}
            defaultSrc={data.thumbnail_url}
          />
        </div>

        <div className="item">
          <Text color="gray">비고</Text>
          <textarea
            value={editData.note ?? ''}
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
            onClick={async () => {
              if (!editData.title || editData.title?.replace(' ', '') === '') {
                ModalUtil.open({
                  title: '입력 오류',
                  message:
                    '제목과 작가/감독은 필수 입력값입니다. 제목을 입력해주세요.',
                });
                return;
              }

              if (
                !editData.creators ||
                editData.creators?.replace(' ', '') === ''
              ) {
                ModalUtil.open({
                  title: '입력 오류',
                  message:
                    '제목과 작가/감독은 필수 입력값입니다. 작가/감독을 입력해주세요.',
                });
                return;
              }

              let thumbnailUrl = data?.thumbnail_url;

              if (cropImage !== data.thumbnail_url && cropImage !== '#') {
                const { url } = await uploadImage(
                  cropImage.replace('data:image/png;base64,', ''),
                  `${editData.title}_${editData.creators}`,
                );

                thumbnailUrl = url;
              }

              const updateData = {
                title: editData.title,
                creators: editData.creators,
                platforms: editData.platforms,
                genre: editData.genre?.id,
                cautions: editData.cautions?.map((item) => item.id),
                keywords: editData.keywords?.map((item) => item.id),
                thumbnail_url: thumbnailUrl,
                note: editData.note,
              } as EditAdminWataDto;

              if (!data.id) {
                await createWata(updateData);
              } else {
                await updateWata(data.id, updateData);
              }

              onClose();
              onConfirm();
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
