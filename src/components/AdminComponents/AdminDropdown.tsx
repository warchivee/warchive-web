import { ColorType } from '@utils/color.util';
import AdminMultiDropdown from './AdminMultiDropdown';

export interface DropdownOption {
  id: string | number;
  name: string;
  color?: ColorType;
}

interface DropdownProps {
  selectedOption?: DropdownOption;
  options: DropdownOption[];
  onChange: (selectOption: DropdownOption) => void;
  isSearch?: boolean;
  isAdd?: boolean;
}

export default function AdminDropdown({
  selectedOption,
  options,
  onChange,
  isSearch = false,
  isAdd = false,
}: DropdownProps) {
  console.log(selectedOption ? [selectedOption] : []);
  return (
    <AdminMultiDropdown
      selectedOptions={selectedOption ? [selectedOption] : []}
      options={options}
      onChange={(selectedOptions) => {
        if (selectedOptions?.length == 1) {
          onChange(selectedOptions[0]);
        } else {
          onChange(selectedOptions[1]);
        }
      }}
      isSearch={isSearch}
      isAdd={isAdd}
      multiple={false}
    />
  );
}