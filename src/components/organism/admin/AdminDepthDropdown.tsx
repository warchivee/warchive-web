import { Text } from '@components/CommonComponents/text';
import { useEffect, useRef, useState } from 'react';
import { IconButton } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { DropdownOption } from './AdminMultiDropdown';

export interface DepthDropdownOption extends DropdownOption {
  subOptions: DropdownOption[];
}

export interface SelectDepthDropdownOption extends DropdownOption {
  subOption: DropdownOption;
}

interface DropdownProps {
  selectOption?: SelectDepthDropdownOption;
  options: DepthDropdownOption[];
  onChange: (selectOption: SelectDepthDropdownOption) => void;
}

export default function DepthDropdown({
  selectOption,
  options,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<DepthDropdownOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option: DepthDropdownOption) => {
    setSelectedOption(option);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="depth-dropdown" ref={dropdownRef}>
      <IconButton onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faAngleDown} />
        {selectOption
          ? `${selectOption?.name} > ${selectOption?.subOption?.name}`
          : '선택'}
      </IconButton>
      {isOpen && (
        <div className="items">
          <ul>
            {options.map((option, index) => (
              <li
                key={`depth-options-${index + 1}`}
                onMouseEnter={() => handleOptionClick(option)}
                aria-hidden="true"
              >
                <Text>{option.name}</Text>
              </li>
            ))}
          </ul>
          <ul>
            {selectedOption?.subOptions?.map((subOption, index) => (
              <li
                key={`genre-options-${index + 1}`}
                onClick={() => {
                  onChange({
                    ...selectedOption,
                    subOption,
                  });
                  handleButtonClick();
                }}
                aria-hidden="true"
              >
                <Text>{subOption.name}</Text>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
