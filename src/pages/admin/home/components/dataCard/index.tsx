import Button from '@components/button';
import { Text, Title } from '@components/text';
import {
  AdminWata,
  EditAdminWataDto,
  labelOptions,
  updateWata,
} from 'src/services/admin/admin-wata.api';
import moment from 'moment';
import Dropdown, { DropdownOption } from '@components/dropdown';
import { useEffect, useState } from 'react';
import { ModalProps } from '@components/modal/index.type';
import Modal from '@components/modal';

export interface DataCardProps {
  data: AdminWata;
  refreshDatas: () => void;
  onEdit?: (data: AdminWata) => void;
}

interface LabelChangeModalProps extends ModalProps {
  defaultNote: string;
  label: string;
}

function LabelChangeModal({
  isOpen,
  defaultNote,
  onConfirm = () => {},
  onClose,
  label,
}: LabelChangeModalProps) {
  const [text, edittext] = useState(defaultNote);

  useEffect(() => {
    if (isOpen) {
      edittext(defaultNote);
    }
  }, [isOpen, defaultNote]);

  return (
    <Modal
      isOpen={isOpen}
      onConfirm={() => onConfirm(text)}
      onClose={onClose}
      title={label}
      message={`${label} 사유를 적어주세요`}
      buttons={['cancel', 'confirm']}
    >
      <textarea
        value={text}
        onChange={(e) => {
          e.preventDefault();
          edittext(e.target.value);
        }}
      />
    </Modal>
  );
}

export default function DataCard({
  data,
  refreshDatas = () => {},
  onEdit = () => {},
}: DataCardProps) {
  const {
    id,
    title = '제목 미등록',
    creators = '작가/감독 미등록',
    genre = {
      id: -1,
      name: '장르 미등록',
      category: {
        id: -1,
        name: '카테고리 미등록',
      },
    },
    keywords,
    cautions,
    platforms,
    thumbnail_url: thumbnailUrl,
    updater,
    label,
    note,
    updated_at: updatedAt,
  } = data;

  const [labelModalProps, setLabelModalProps] = useState({
    isOpen: false,
    label: {
      id: '',
      name: '',
    } as DropdownOption,
  });

  return (
    <div className="card-container">
      <div className="card">
        <div className="header">
          <div className="left">
            <Dropdown
              selectOption={
                labelOptions.find((item) => item.id === label) as DropdownOption
              }
              options={
                data.is_published
                  ? labelOptions.filter(
                      (item) => item.id === 'CENSOR' || item.id === 'CHECKED',
                    )
                  : labelOptions
              }
              onChange={async (selectOption) => {
                if (
                  selectOption.id === 'HOLD' ||
                  selectOption.id === 'NEED_CANTACT' ||
                  selectOption.id === 'CENSOR'
                ) {
                  setLabelModalProps({
                    label: selectOption,
                    isOpen: true,
                  });
                } else if (id) {
                  await updateWata(id, {
                    label: `${selectOption.id}`,
                  } as EditAdminWataDto);

                  refreshDatas();
                }
              }}
            />
            <div className="info">
              <Text color="gray">
                {updater?.nickname}
                {updatedAt ? moment(updatedAt).format('YY.MM.DD hh:mm') : ''}
              </Text>
            </div>
          </div>
          <div className="right">
            <Button labelColor="gray">삭제</Button>
            <Button
              labelColor="blue-violet"
              onClick={() => {
                onEdit(data);
              }}
            >
              수정
            </Button>
          </div>
        </div>
        <div className="body">
          <div className="left">
            <div className="thumbnail">
              <img
                src={
                  thumbnailUrl ||
                  'https://www.freeiconspng.com/uploads/no-image-icon-4.png'
                }
                alt="썸네일"
              />
            </div>
          </div>
          <div className="right">
            <div className="title">
              {data.is_published && (
                <div className="publish">
                  <Text color="purple">게시</Text>
                </div>
              )}

              <Title type="h3">{title}</Title>
            </div>
            <div className="keyword">
              <Text color="gray">장르</Text>
              <Text>{`${genre?.category.name} > ${genre?.name}`}</Text>
            </div>
            <div className="keyword">
              <Text color="gray">작가/감독</Text>
              <Text color="black">{creators}</Text>
            </div>
          </div>
        </div>
      </div>
      {platforms?.length !== 0 ? (
        <div className="keywords">
          <ol>
            {platforms?.map((platform) => (
              <li key={`admin-keyword-${id}-${platform.id}`}>
                <a href={platform.url} target="_blank" rel="noreferrer">
                  <Button
                    background="french-lilac"
                    labelColor="purple"
                    size="small"
                    icon="link"
                  >
                    {platform.name}
                  </Button>
                </a>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {keywords?.length !== 0 || cautions?.length !== 0 ? (
        <div className="keywords">
          <div>
            <ol>
              {keywords?.map((keyword) => (
                <li key={`admin-keyword-${id}-${keyword.id}`}>
                  <Text color="gray">#{keyword.name}</Text>
                </li>
              ))}
              {cautions?.map((caution) => (
                <li key={`admin-keyword-${id}-${caution.id}`}>
                  <Text color="light-violet">⚠️{caution.name}</Text>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}

      <div className="memo">
        <div className="header">
          <Title type="h5">NOTE</Title>
        </div>
        <Text color="gray">{note}</Text>
      </div>

      <LabelChangeModal
        isOpen={labelModalProps.isOpen}
        defaultNote={note ?? ''}
        label={labelModalProps.label.name}
        onClose={() => {
          setLabelModalProps({ ...labelModalProps, isOpen: false });
        }}
        onConfirm={async (editNote?: string) => {
          if (id) {
            await updateWata(id, {
              label: `${labelModalProps.label.id}`,
              note: editNote,
            } as EditAdminWataDto);

            setLabelModalProps({ ...labelModalProps, isOpen: false });
            refreshDatas();
          }
        }}
      />
    </div>
  );
}
