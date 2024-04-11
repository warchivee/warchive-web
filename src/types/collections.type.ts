import { WataIdType } from './wata.type';

export interface CollectionType {
  id: number;
  shared_id: string;
  title: string;
  note: string;
  items: WataIdType[];
}

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
