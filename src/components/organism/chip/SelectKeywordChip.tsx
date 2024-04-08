// joy components
import { Chip } from '@mui/joy';
import ChipDelete from '@mui/joy/ChipDelete';

// utils
import useSearchKeywords from 'src/hooks/useSearchKeywords';
import { SearchKeywordsKeyType } from 'src/types/serchKeyword.type';
import { KeywordType } from 'src/types/wata.type';

export default function SelectKeywordChip({
  type,
  keyword,
  remove,
  checked = false,
}: {
  type: SearchKeywordsKeyType;
  keyword: KeywordType;
  remove?: boolean;
  checked?: boolean;
}) {
  const { updateSearchKeywords } = useSearchKeywords();

  const getVariant = () => {
    if (remove) {
      return 'outlined';
    }
    if (checked) {
      return 'soft';
    }
    return 'plain';
  };

  const handleChage = () => {
    updateSearchKeywords(type, keyword);
  };

  return (
    <Chip
      onClick={handleChage}
      variant={getVariant()}
      color="primary"
      size="sm"
      sx={{
        color: !checked || remove ? '#EBDBF3' : '',
        '& button': { borderColor: '#EBDBF3' },
      }}
      endDecorator={
        remove ? (
          <ChipDelete sx={{ color: '#EBDBF3' }} onDelete={handleChage} />
        ) : null
      }
    >
      {keyword.name}
    </Chip>
  );
}
