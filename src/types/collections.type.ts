import { CollectionType } from './collection.type';

interface CollectionDefaultProps {
  collections: CollectionType[];
  selectIndex: number;
}

export interface CollectionTitleProps {
  isEditMode: boolean;
  collection?: CollectionType;
  selectIndex: number;
  handleEditMode: (editMode: boolean) => void;
}

export interface CollectionNoteProps {
  isEditMode: boolean;
  collection?: CollectionType;
  selectIndex: number;
  handleEditMode: (editMode: boolean) => void;
}

export interface CollectionMenuProps extends CollectionDefaultProps {
  handleChange: (index: number) => void;
}

export interface CollectionShareButtonsProps extends CollectionDefaultProps {}
