// joy components
import { Chip } from '@mui/joy';

// utils
import useSearchKeywords from 'src/hooks/useSearchKeywords';
import { SearchKeywordsKeyType } from 'src/types/serchKeyword.type';
import { KeywordType } from 'src/types/wata.type';

export default function KeywordChip({
  type,
  keyword,
  search = true,
}: {
  keyword: KeywordType;
  type: SearchKeywordsKeyType;
  search?: boolean;
}) {
  const { selectKeyword } = useSearchKeywords();
  const handleClick = () => {
    if (!search) {
      return;
    }
    selectKeyword(type, keyword);
  };

  return (
    <Chip
      size="sm"
      variant="plain"
      onClick={handleClick}
      sx={{ padding: 0, '&:hover': { color: 'white' } }}
    >
      #{keyword.name}
    </Chip>
  );
}
