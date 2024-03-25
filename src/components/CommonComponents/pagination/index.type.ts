export interface PaginationProps {
  currentPage: number;
  maxPage: number;
  onChange?: (changePage: number) => void;
  input?: boolean;
}
