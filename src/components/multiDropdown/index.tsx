import Button from '@components/button';
import { DropdownOption } from '@components/dropdown';
import Input from '@components/input';
import { Text } from '@components/text';
import { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  selectedOptions: DropdownOption[];
  options: DropdownOption[];
  onChange: (selectedOptions: DropdownOption[]) => void;
  isSearch?: boolean;
}

export default function MultiDropdown({
  selectedOptions,
  options,
  onChange,
  isSearch = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setInput('');
      setIsOpen(false);
    }
  };

  const handleButtonClick = () => {
    setInput('');
    setIsOpen(!isOpen);
  };

  const toggleOption = (option: DropdownOption) => {
    const isSelected = selectedOptions?.some(
      (selected) => selected.id === option.id,
    );

    if (isSelected) {
      const updatedOptions = selectedOptions?.filter(
        (selected) => selected.id !== option.id,
      );

      onChange(updatedOptions);
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (input) {
      const highlightedElement = document.querySelector('.highlighted-item');
      if (highlightedElement) {
        highlightedElement.classList.remove('highlighted-item');
      }

      const matchingElement = options.find((value) =>
        value.name.toLowerCase().includes(input.toLowerCase()),
      );

      const element = document.getElementById(
        `multi-dropdown-option-${matchingElement?.name}`,
      );

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        element.classList.add('highlighted-item');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <Button
        icon="down"
        onClick={handleButtonClick}
        background="athens-gray"
        iconColor="ebony"
        align="reverse"
      >
        {selectedOptions?.length > 0
          ? selectedOptions?.map((option) => option.name).join(', ')
          : '선택'}
      </Button>

      {isOpen && (
        <ul className="dropdown-menu">
          {isSearch && (
            <li className="search">
              <Input
                type="search"
                value={input}
                placeholder="검색"
                onChange={(value) => setInput(value)}
              />
            </li>
          )}

          {options.map((value, index) => (
            <li
              key={`dropdown-options-${index + 1}`}
              id={`multi-dropdown-option-${value.name}`}
              aria-hidden="true"
              onClick={() => toggleOption(value)}
            >
              <label
                htmlFor={`multi-dropdown-option-${value.id}-${value.name}`}
                aria-hidden="true"
                onClick={(e) => {
                  e.preventDefault();
                  toggleOption(value);
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions?.some(
                    (selected) => selected.id === value.id,
                  )}
                  onChange={() => toggleOption(value)}
                  id={`multi-dropdown-option-${value.id}-${value.name}`}
                />
                <Text>{value.name}</Text>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
