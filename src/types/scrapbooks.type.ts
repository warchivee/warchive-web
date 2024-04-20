import { WataIdType } from './wata.type';

export interface ScrapbookType {
  id: number;
  shared_id: string;
  title: string;
  note: string;
  items: WataIdType[];
}

interface ScrapbookDefaultProps {
  scrapbooks: ScrapbookType[];
  selectIndex: number;
}

export interface ScrapbookTitleProps {
  isEditMode: boolean;
  scrapbook?: ScrapbookType;
  selectIndex: number;
  handleEditMode: (editMode: boolean) => void;
}

export interface ScrapbookNoteProps {
  isEditMode: boolean;
  scrapbook?: ScrapbookType;
  selectIndex: number;
  handleEditMode: (editMode: boolean) => void;
}

export interface ScrapbookMenuProps extends ScrapbookDefaultProps {
  handleChange: (index: number) => void;
}

export interface ScrapbookShareButtonsProps extends ScrapbookDefaultProps {}
