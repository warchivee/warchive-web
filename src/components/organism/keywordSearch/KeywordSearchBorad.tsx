import { useState } from 'react';

import { Title } from '@components/CommonComponents/text';
import classNames from 'classnames';
import { useSearchKeywords } from 'src/hooks/useSearchKeywords';
import { KeywordListType, KeywordType } from 'src/types/wata.type';
import { useSuspenseQuery } from '@tanstack/react-query';
import IndexedDBUtil, { KEYWORD_STORE } from '@utils/indexedDB/indexedDB.util';
import { Box, Stack, Typography } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import SelectKeywordList from '@components/organism/keywordSearch/SelectKeywordList';
import SelectedKeywordView from '@components/organism/keywordSearch/SelectedKeywordView';

const indexedDB = IndexedDBUtil.getInstance();

export default function KeywordSearchBorad() {
  const { data: keywords } = useSuspenseQuery<KeywordListType[]>({
    queryKey: ['getKeywords'],
    queryFn: () => indexedDB.getItems<KeywordListType[]>(KEYWORD_STORE),
  });

  const { hasSelectedKeywords, selectCategory } = useSearchKeywords();

  const [tab, setTab] = useState<number>(0);
  const [tabOpen, setTabOpen] = useState<boolean>(false);

  const handleTab = (category: KeywordListType, index: number) => {
    const isCurrentTab = tab === index;

    if (isCurrentTab) {
      // 현재 탭을 한번 더 클릭한 경우 검색어 초기화하지 않고 탭을 열고 닫기만 한다.
      setTabOpen(!tabOpen);
      return;
    }

    setTab(isCurrentTab ? tab : index);
    setTabOpen(true);
    selectCategory({
      id: category.id,
      name: category.name,
    } as KeywordType);
  };

  return (
    <div className="keyword-search-board">
      {keywords && keywords?.length > 0 && (
        <>
          {/* 카테고리 탭 */}
          <div className="tabs">
            <div
              className="control"
              onClick={() => {
                setTabOpen(!tabOpen);
              }}
              aria-hidden="true"
            >
              <Title type="h5" color="white">
                키워드로 검색
              </Title>
              {tabOpen ? (
                <FontAwesomeIcon style={{ color: 'white' }} icon={faAngleUp} />
              ) : (
                <FontAwesomeIcon
                  style={{ color: 'white' }}
                  icon={faAngleDown}
                />
              )}
            </div>

            {/* 카테고리 탭 */}
            {keywords?.map((category: KeywordListType, index: number) => (
              <div
                className={classNames('tab', { select: tab === index })}
                key={`category-${category.id}`}
                onClick={() => {
                  handleTab(category, index);
                }}
                aria-hidden="true"
              >
                <Typography level="body-sm" textColor="white" noWrap>
                  {category.name}
                </Typography>
              </div>
            ))}
          </div>
          {/* 키워드 리스트 */}
          <Box
            width="100%"
            sx={{ background: '#9023D5', display: tabOpen ? 'flex' : 'none' }}
          >
            <Stack
              direction="row"
              gap={2}
              width="100%"
              maxHeight="300px"
              maxWidth="1000px"
              margin="0 auto"
              padding="2rem 1rem"
            >
              <SelectKeywordList
                type="genres"
                keywords={keywords[tab]?.genres}
              />
              <SelectKeywordList
                type="platforms"
                keywords={keywords[tab]?.platforms}
              />
              <SelectKeywordList
                type="keywords"
                keywords={keywords[tab]?.keywords}
              />
            </Stack>
          </Box>
          {/* 선택한 키워드 리스트 */}
          {tabOpen || hasSelectedKeywords() ? (
            <Box width="100%" maxWidth="1000px">
              <SelectedKeywordView />
            </Box>
          ) : null}
        </>
      )}
    </div>
  );
}
