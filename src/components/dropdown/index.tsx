import Button from '@components/button';
import { ColorType } from '@utils/color.util';
import { useEffect, useRef, useState } from 'react';

export interface DropdownOption {
  id: string | number;
  name: string;
  color?: ColorType;
}

interface DropdownProps {
  selectOption?: DropdownOption;
  options: DropdownOption[];
  onChange: (selectOption: DropdownOption) => void;
}

export default function Dropdown({
  selectOption,
  options,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
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
    <div className="dropdown" ref={dropdownRef}>
      <Button
        icon="down"
        onClick={handleButtonClick}
        background={selectOption?.color || 'athens-gray'}
        iconColor="ebony"
        align="reverse"
      >
        {selectOption?.name ?? '선택'}
      </Button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((value, index) => (
            <li
              key={`dropdown-options-${index + 1}`}
              onClick={() => {
                onChange(value);
                handleButtonClick();
              }}
              aria-hidden="true"
            >
              {value.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
