import Button from '@components/CommonComponents/button';
import Input from '@components/CommonComponents/input';
import { Text, Title } from '@components/CommonComponents/text';
import {
  COMMENT_LIMIT_LENGTH,
  TITLE_LIMIT_LENGTH,
} from 'src/types/collection.type';
import { useEffect, useState } from 'react';
import useCollection from 'src/hooks/useCollections';

export default function CollectionHeader() {
  const [isHovered, setIsHovered] = useState(false);
  const [editInfo, setEditInfo] = useState({ title: '', note: '' });

  const [isEditMode, setIsEditMode] = useState(false);

  const { getCollection, getSelectCollectionIndex, updateCollection } =
    useCollection();

  useEffect(() => {
    if (getCollection()) {
      setIsEditMode(false);
      setEditInfo({ title: getCollection().title, note: getCollection().note });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSelectCollectionIndex()]);

  return !getCollection() ? (
    <div />
  ) : (
    <div className="header" onMouseLeave={() => setIsHovered(false)}>
      {!isEditMode ? (
        <div
          className="content"
          onMouseEnter={() => setIsHovered(true)}
          onClick={() => {
            setIsEditMode(true);
            setIsHovered(false);
          }}
          aria-hidden
        >
          <Title type="h1">{getCollection()?.title}</Title>
          <Text color="gray">
            {!getCollection()?.note || getCollection()?.note === ''
              ? '설명을 입력하세요.'
              : getCollection()?.note}
          </Text>
        </div>
      ) : null}

      {isEditMode ? (
        <div className="title-area">
          <Input
            value={editInfo.title}
            type="text"
            border="underline"
            onChange={(input) => setEditInfo({ ...editInfo, title: input })}
            width="100%"
            size="big"
            maxLength={TITLE_LIMIT_LENGTH}
          />
          <Input
            value={editInfo.note}
            type="text"
            border="underline"
            onChange={(input) => setEditInfo({ ...editInfo, note: input })}
            width="100%"
            maxLength={COMMENT_LIMIT_LENGTH}
          />
          <div className="buttons">
            <Button
              size="small"
              background="white"
              labelColor="gray"
              onClick={() => {
                setIsEditMode(false);
              }}
            >
              취소
            </Button>
            <Button
              size="small"
              background="white"
              labelColor="blue-violet"
              onClick={async () => {
                try {
                  await updateCollection(editInfo);
                } catch (error) {
                  console.error(error);
                }

                setIsEditMode(false);
              }}
            >
              완료
            </Button>
          </div>
        </div>
      ) : null}

      {isHovered && (
        <div className="edit">
          <Button
            icon="write"
            iconColor="gray"
            onClick={() => {
              setIsEditMode(true);
              setIsHovered(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
