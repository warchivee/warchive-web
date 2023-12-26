import Button from '@components/button';
import { Text } from '@components/text';
import classNames from 'classnames';
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
}: PaginationProps) {
  return (
    <div className="pagination">
      <div className={classNames('control', { hidden: currentPage <= 3 })}>
        <Button
          icon="angles-left"
          onClick={() => {
            onChange(1);
          }}
        />
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
      </div>
      <div
        className={classNames('control', {
          hidden: currentPage + 2 >= maxPage,
        })}
      >
        <Button
          icon="angles-right"
          onClick={() => {
            onChange(maxPage);
          }}
        />
      </div>
    </div>
  );
}
