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
        spacing={3}
        sx={{
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {keywords
          ?.filter(
            (keyword, index, self) =>
              self.findIndex((k) => k.name === keyword.name) === index, // 키워드 중복 제거
          )
          .sort((a, b) => {
            const aOrderTop = a?.order_top ?? false;
            const bOrderTop = b?.order_top ?? false;

            if (bOrderTop && !aOrderTop) return 1;
            if (aOrderTop && !bOrderTop) return -1;

            return a.name.localeCompare(b.name, 'ko');
          })
          ?.filter((k) => k.name !== '플랫폼없음')
          ?.map((keyword) => (
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
