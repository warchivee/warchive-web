// joy components
import { Grid, Stack, Typography } from '@mui/joy';

// utils
import { SearchKeywordsKeyType } from 'src/types/serchKeyword.type';
import { KeywordType } from 'src/types/wata.type';
import useSearchKeywords from 'src/hooks/useSearchKeywords';

// components
import SelectKeywordChip from '../chip/SelectKeywordChip';

export default function SelectKeywordList({
  type,
  keywords,
}: {
  type: SearchKeywordsKeyType;
  keywords: KeywordType[];
}) {
  const { includeKeyword } = useSearchKeywords();

  const title: Record<SearchKeywordsKeyType, string> = {
    genres: '장르',
    keywords: '키워드',
    platforms: '플랫폼',
  };

  return (
    <Stack flex={1} gap={2}>
      <Typography level="title-md" textColor="white">
        {title[type]}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {keywords?.map((keyword) => (
          <Grid key={`select-keyword-${keyword.id}`} xs={12} sm={6} md={6}>
            <SelectKeywordChip
              type={type}
              keyword={keyword}
              checked={includeKeyword(type, keyword)}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
