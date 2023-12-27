interface CollectionDefaultProps {
  isEditMode: boolean;
  selectIndex: number;
}

export interface CollectionTitleProps extends CollectionDefaultProps {
  handleEditMode: (editMode: boolean) => void;
}

export interface CollectionMenuProps extends CollectionDefaultProps {
  handleChange: (index: number) => void;
}
