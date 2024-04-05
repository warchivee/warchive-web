import { useState } from 'react';
import { Text } from '@components/CommonComponents/text';
import classNames from 'classnames';
import { IconButton } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Input from '../input';
import { PaginationProps } from './index.type';

const getPageArange = (currentPage: number, maxPage: number): number[] => {
  const size = 5;

  const startPage = Math.max(1, Math.min(currentPage - 2, maxPage - size + 1));
  const endPage = Math.min(startPage + size - 1, maxPage);

  const numberArray = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return numberArray;
};

export default function Pagination({
  currentPage,
  maxPage,
  onChange = () => {},
  input = false,
}: PaginationProps) {
  const [inputPage, setInputPage] = useState<number>(0);

  return (
    <div className="pagination">
      <div className={classNames('control', { hidden: currentPage <= 3 })}>
        <IconButton
          onClick={() => {
            onChange(1);
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </IconButton>
      </div>

      <div className="pages">
        {getPageArange(currentPage, maxPage)?.map((page: number) => (
          <div
            key={`page-${page}`}
            className={classNames({ active: page === currentPage })}
            onClick={() => {
              onChange(page);
            }}
            aria-hidden="true"
          >
            <Text size="big">{page}</Text>
          </div>
        ))}

        {input && (
          <Input
            type="number"
            value={inputPage}
            isResetButton={false}
            onChange={(value) => setInputPage(+value)}
            onEnter={() => {
              onChange(inputPage);
            }}
            width="60px"
          />
        )}
      </div>
      <div
        className={classNames('control', {
          hidden: currentPage + 2 >= maxPage,
        })}
      >
        <IconButton
          onClick={() => {
            onChange(maxPage);
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </IconButton>
      </div>
    </div>
  );
}
