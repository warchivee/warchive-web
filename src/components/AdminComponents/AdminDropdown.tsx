import AdminMultiDropdown, { DropdownOption } from "./AdminMultiDropdown";

\interface DropdownProps {
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
