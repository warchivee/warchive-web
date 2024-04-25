import { Button, Stack } from '@mui/joy';
import useSearchKeywords from 'src/hooks/useSearchKeywords';
import { SearchKeywordsKeyType } from 'src/types/serchKeyword.type';
import SelectKeywordChip from '../chip/SelectKeywordChip';

export default function SelectedKeywordView() {
  const {
    searchKeywords,
    resetSearchKeywords,
    includeKeyword,
    hasSelectedKeywords,
  } = useSearchKeywords();

  const renderKeywords = (type: SearchKeywordsKeyType) =>
    searchKeywords[type]?.map((keyword) => (
      <div key={`selectd-keyword-${keyword.id}`}>
        <SelectKeywordChip
          type={type}
          keyword={keyword}
          checked={includeKeyword(type, keyword)}
          remove
        />
      </div>
    ));

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      padding="10px 10px"
      gap={2}
      sx={{ background: '#590091', position: 'sticky', top: '0px' }}
    >
      <Stack
        direction="row"
        flex={1}
        gap={1}
        sx={{
          overflowX: 'scroll',
          overflowY: 'hidden',
        }}
      >
        {renderKeywords('genres')}
        {renderKeywords('platforms')}
        {renderKeywords('keywords')}
      </Stack>

      {hasSelectedKeywords() && (
        <div>
          <Button
            sx={{
              borderRadius: '20px',
              height: 'max-content',
              fontSize: '12px',
            }}
            size="sm"
            variant="soft"
            onClick={() => {
              resetSearchKeywords();
            }}
          >
            초기화
          </Button>
        </div>
      )}
    </Stack>
  );
}
