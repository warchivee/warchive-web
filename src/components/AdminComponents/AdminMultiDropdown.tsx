import { useEffect, useRef, useState } from 'react';
import { DropdownOption } from './AdminDropdown';
import Button from '@components/CommonComponents/button';
import { Text } from '@components/CommonComponents/text';
import Input from '@components/CommonComponents/input';
import classNames from 'classnames';

interface DropdownProps {
  selectedOptions: DropdownOption[];
  options: DropdownOption[];
  onChange: (selectedOptions: DropdownOption[]) => void;
  isSearch?: boolean;
  isAdd?: boolean;
  multiple?: boolean;
}

export default function AdminMultiDropdown({
  selectedOptions,
  options,
  onChange,
  isSearch = false,
  isAdd = false,
  multiple = true,
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
      <div
        className={classNames(
          'select-options',
          {
            [`background-${selectedOptions[0]?.color ?? 'athens-gray'}`]:
              !multiple,
          },
          {
            ['background-athens-gray']: multiple,
          },
        )}
      >
        {selectedOptions?.length <= 0 ? (
          <Text>선택</Text>
        ) : (
          selectedOptions?.map((option) => {
            if (multiple) {
              return (
                <Button
                  icon="xmark"
                  align="reverse"
                  onClick={() => toggleOption(option)}
                >
                  {option.name}
                </Button>
              );
            } else {
              return <Text>{option.name}</Text>;
            }
          })
        )}
        <Button icon="down" onClick={handleButtonClick} iconColor="ebony" />
      </div>
      {isOpen && (
        <div className="options">
          {(isSearch || isAdd) && (
            <div className="search">
              <Input
                border="underline"
                value={input}
                placeholder="검색"
                isResetButton={false}
                onChange={(value) => setInput(value)}
              />
              {isAdd && <Button icon="plus">추가</Button>}
            </div>
          )}

          <ul>
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
                  <div
                    id={`multi-dropdown-option-${value.id}-${value.name}`}
                    onClick={() => toggleOption(value)}
                  >
                    <Text
                      color={
                        selectedOptions?.some(
                          (selected) => selected.id === value.id,
                        )
                          ? 'athens-gray'
                          : 'black'
                      }
                    >
                      {value.name}
                    </Text>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
