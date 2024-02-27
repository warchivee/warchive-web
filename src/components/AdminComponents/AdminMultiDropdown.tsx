import { useEffect, useRef, useState } from 'react';
import Button from '@components/CommonComponents/button';
import { Text } from '@components/CommonComponents/text';
import Input from '@components/CommonComponents/input';
import classNames from 'classnames';
import { ColorType } from '@utils/color.util';

export interface DropdownOption {
  id: string | number;
  name: string;
  color?: ColorType;
}

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

  const handleButtonClick = () => {
    setInput('');
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setInput('');
    setIsOpen(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (dropdownRef.current) {
      const isClickDropdown = dropdownRef.current.contains(
        event.target as Node,
      );

      if (multiple && !isClickDropdown) {
        handleClose();
      }
    }
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
            'background-athens-gray': multiple,
          },
        )}
        onClick={handleButtonClick}
        aria-hidden="true"
      >
        {selectedOptions?.length <= 0 ? (
          <Text>선택</Text>
        ) : (
          selectedOptions?.map((option) => {
            if (multiple) {
              return (
                <div
                  className="option"
                  key={`dropdown-select-options-${option.id}`}
                >
                  <Text>{option.name}</Text>
                  <Button
                    key={`dropdown-select-options-${option.id}`}
                    icon="xmark"
                    align="reverse"
                    onClick={() => toggleOption(option)}
                  />
                </div>
              );
            }

            return (
              <Text key={`dropdown-select-options-${option.id}`}>
                {option.name}
              </Text>
            );
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
            {options.map((value, index) => {
              const isSelected = selectedOptions?.some(
                (selected) => selected.id === value.id,
              );
              return (
                <li
                  key={`dropdown-options-${index + 1}`}
                  id={`multi-dropdown-option-${value.name}`}
                  aria-hidden="true"
                  onClick={() => {
                    toggleOption(value);
                    if (!multiple) {
                      handleClose();
                    }
                  }}
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
                      aria-hidden="true"
                      className="option"
                    >
                      {multiple && (
                        <input
                          type="checkbox"
                          onChange={() => toggleOption(value)}
                          checked={isSelected}
                        />
                      )}
                      <Text color={isSelected ? 'gray' : 'black'}>
                        {value.name}
                      </Text>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
