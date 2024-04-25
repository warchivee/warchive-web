import { Text, Title } from '@components/CommonComponents/text';
import {
  AdminWata,
  EditAdminWataDto,
  updateWata,
} from 'src/services/admin-wata.api';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ModalProps } from '@components/CommonComponents/modal/index.type';
import Modal from '@components/CommonComponents/modal';
import { LoadingOverlay } from '@components/CommonComponents/loader';
import Button from '@mui/joy/Button';
import { Chip, Option, Select, Skeleton } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import useCropThumbnail from 'src/hooks/useCropThumbnail';
import AdminEditData from './AdminEditData';

export interface DataCardProps {
  data: AdminWata;
  refreshDatas: () => void;
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

  const labelText: Record<string, string> = {
    NEED_CHECK: '검수전',
    CHECKING: '검수중',
    CHECKED: '검수완료',
    HOLD: '보류',
    NEED_CONTACT: '컨택필요',
    CENSOR: '탈락',
  };

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
      title={labelText[label]}
      message={`${labelText[label]} 사유를 적어주세요`}
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

export default function AdminDataCard({
  data,
  refreshDatas = () => {},
}: DataCardProps) {
  const [openEditData, toggleEditData] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const {
    id,
    title = '제목 미등록',
    creators = '작가/감독 미등록',
    genre,
    keywords,
    cautions,
    platforms,
    updater,
    label = 'NEED_CHECK',
    note,
    updated_at: updatedAt,
  } = data;

  const cropThumbnail = useCropThumbnail(data, 'book');

  const [labelModalProps, setLabelModalProps] = useState({
    isOpen: false,
    label: '',
  });

  const labelColor: Record<string, string> = {
    NEED_CHECK: 'athens-gray',
    CHECKING: 'cream-brulee',
    CHECKED: 'french-lilac',
    HOLD: 'botticelli',
    NEED_CONTACT: 'tropical-blue',
    CENSOR: 'your-pink',
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      <div className="card-container">
        <div className="card">
          <div className="header">
            <div className="left">
              <Select
                variant="soft"
                color="neutral"
                size="sm"
                indicator={<FontAwesomeIcon icon={faAngleDown} />}
                sx={{
                  background: `var(--${labelColor[label]})`,
                  color: 'black',
                }}
                value={label}
                onChange={async (event, newValue) => {
                  if (!newValue || !id) {
                    return;
                  }

                  if (newValue === 'HOLD' || newValue === 'CENSOR') {
                    setLabelModalProps({
                      label: newValue,
                      isOpen: true,
                    });
                  } else {
                    setIsLoading(true);
                    await updateWata(id, {
                      label: newValue,
                    } as EditAdminWataDto);

                    setIsLoading(false);
                    refreshDatas();
                  }
                }}
              >
                <Option value="NEED_CHECK">검수전</Option>
                <Option value="CHECKING">검수중</Option>
                <Option value="CHECKED">검수완료</Option>
                <Option value="NEED_CONTACT">컨택필요</Option>
                <Option value="HOLD">보류</Option>
                <Option value="CENSOR">탈락</Option>
              </Select>
              <div className="info">
                <Text color="gray">
                  {updater?.nickname}{' '}
                  {updatedAt ? moment(updatedAt).format('YY.MM.DD HH:mm') : ''}
                </Text>
              </div>
            </div>
            <div className="right">
              <Button
                variant="plain"
                onClick={() => {
                  toggleEditData(true);
                }}
              >
                수정
              </Button>
            </div>
          </div>
          <div className="body">
            <div className="left">
              <div className="thumbnail">
                <Skeleton
                  variant="overlay"
                  loading={cropThumbnail === undefined}
                  sx={{ width: '50px', height: '70px' }}
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={cropThumbnail}
                    alt={`${data.title}`}
                    style={{
                      objectFit: 'cover',
                      contentVisibility: 'auto',
                    }}
                  />
                </Skeleton>
              </div>
            </div>
            <div className="right">
              <div className="title">
                {data.is_published && (
                  <Chip size="sm" variant="soft" color="primary">
                    게시
                  </Chip>
                )}

                <Title type="h3">{title}</Title>
              </div>
              <div className="keyword">
                <Text color="gray">장르</Text>
                <Text>
                  {genre && `${genre?.category?.name} > ${genre?.name}`}
                </Text>
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
                <li key={`admin-data-card-${id}-platform-${platform.id}`}>
                  <a href={platform.url} target="_blank" rel="noreferrer">
                    <Chip>{platform.name}</Chip>
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
                  <li key={`dmin-data-card-${id}-keyword-${keyword.id}`}>
                    <Text color="gray">#{keyword.name}</Text>
                  </li>
                ))}
                {cautions?.map((caution) => (
                  <li key={`dmin-data-card-${id}-caution-${caution.id}`}>
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
          label={labelModalProps.label}
          onClose={() => {
            setLabelModalProps({ ...labelModalProps, isOpen: false });
          }}
          onConfirm={async (editNote?: string) => {
            if (id) {
              setIsLoading(true);
              await updateWata(id, {
                label: `${labelModalProps.label}`,
                note: editNote,
              } as EditAdminWataDto);

              setLabelModalProps({ ...labelModalProps, isOpen: false });
              refreshDatas();
              setIsLoading(false);
            }
          }}
        />
      </div>
      <AdminEditData
        isOpen={openEditData}
        data={data}
        onClose={() => {
          toggleEditData(false);
        }}
        onConfirm={() => {
          refreshDatas();
        }}
      />
    </>
  );
}
