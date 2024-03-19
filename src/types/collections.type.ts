interface CollectionDefaultProps {
  selectIndex: number;
}

export interface CollectionTitleProps extends CollectionDefaultProps {
  isEditMode: boolean;
  handleEditMode: (editMode: boolean) => void;
}

export interface CollectionCommentProps extends CollectionDefaultProps {
  isEditMode: boolean;
  handleEditMode: (editMode: boolean) => void;
}

export interface CollectionMenuProps extends CollectionDefaultProps {
  handleChange: (index: number) => void;
}

export interface CollectionShareButtonsProps extends CollectionDefaultProps {}
