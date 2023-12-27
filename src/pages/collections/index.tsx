import { useEffect, useState } from 'react';
import useBookmarkList from 'src/hooks/useCollections';
import WataCardList from '@components/wata/list';
import CollectionMenu from './components/menu';
import CollectionTitle from './components/title';
import ShareCollectionButton from './components/share';

export default function Collections() {
  const { collections } = useBookmarkList();
  const [collectionIndex, setCollectionIndex] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    setEditMode(false);
  }, [collectionIndex]);

  return (
    <div className="page collections">
      <CollectionMenu
        isEditMode={editMode}
        selectIndex={collectionIndex}
        handleChange={setCollectionIndex}
      />

      <div className="content">
        <CollectionTitle
          isEditMode={editMode}
          selectIndex={collectionIndex}
          handleEditMode={setEditMode}
        />
        <ShareCollectionButton />
        <WataCardList watas={collections[collectionIndex].items} />
      </div>
    </div>
  );
}
