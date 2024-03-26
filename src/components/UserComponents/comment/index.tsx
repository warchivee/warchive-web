import Button from '@components/CommonComponents/button';
import Input from '@components/CommonComponents/input';
import { Text } from '@components/CommonComponents/text';
import { CollectionCommentProps } from 'src/types/collections.type';
import {
  DEFAULT_COLLECTIONS_KEY,
  TITLE_LIMIT_LENGTH,
} from 'src/types/collection.type';
import { useEffect, useState } from 'react';
import useCollections from 'src/hooks/useCollections';

export default function CollectionComment({
  isEditMode,
  selectIndex,
  handleEditMode,
}: CollectionCommentProps) {
  const { collectionLists, renameCollection } = useCollections();
  const [isHovered, setIsHovered] = useState(false);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (isEditMode) {
      setInput(collectionLists[selectIndex].note);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectIndex, isEditMode]);

  return (
    <div className="comment" onMouseLeave={() => setIsHovered(false)}>
      {!isEditMode && selectIndex !== DEFAULT_COLLECTIONS_KEY ? (
        <div className="comment-area" onMouseEnter={() => setIsHovered(true)}>
          <Text color="black" size="big">
            {collectionLists[selectIndex].note !== ''
              ? collectionLists[selectIndex].note
              : '설명을 입력하세요.'}
          </Text>
        </div>
      ) : null}

      {isEditMode && selectIndex !== DEFAULT_COLLECTIONS_KEY ? (
        <div className="comment-area">
          <Input
            value={input}
            type="text"
            border="underline"
            onChange={setInput}
            size="small"
            maxLength={TITLE_LIMIT_LENGTH}
          />
          <div className="buttons">
            <Button
              size="small"
              background="white"
              labelColor="gray"
              onClick={() => {
                handleEditMode(false);
                setInput('');
              }}
            >
              취소
            </Button>
            <Button
              size="small"
              background="white"
              labelColor="blue-violet"
              onClick={() => {
                renameCollection(selectIndex, input, false);
                handleEditMode(false);
                setInput('');
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
              handleEditMode(true);
              setIsHovered(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
