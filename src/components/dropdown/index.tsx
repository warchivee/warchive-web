import Button from '@components/button';
import { useState } from 'react';

interface DropdownOption {
  title: string;
  onClick?: () => void;
}

interface DropdownProps {
  title: string;
  options: DropdownOption[];
}

export default function Dropdown({ title, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <Button icon="download" onClick={handleButtonClick}>
        {title}
      </Button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map(({ title: optionTitle, onClick = () => {} }, index) => (
            <li
              key={`dropdown-options-${index + 1}`}
              onClick={() => onClick()}
              aria-hidden="true"
            >
              {optionTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
