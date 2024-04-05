import { useState } from 'react';

import { Title } from '@components/CommonComponents/text';
import classNames from 'classnames';
import Button from '@components/CommonComponents/button/index';
import Icon from '@components/CommonComponents/icon';
import { useSearchKeywords } from 'src/hooks/useSearchKeywords';
import { SearchKeywordsKeyType } from 'src/types/serchKeyword.type';
import { KeywordListType, KeywordType } from 'src/types/wata.type';
import { useSuspenseQuery } from '@tanstack/react-query';
import IndexedDBUtil, { KEYWORD_STORE } from '@utils/indexedDB/indexedDB.util';
import { Typography } from '@mui/joy';
import CheckKeywordBubble from './checkKeywordBubble';
import CheckKeywordBubbles from './checkKeywordBubbles';

const indexedDB = IndexedDBUtil.getInstance();

function Bubbles({
  title,
  bubbleType,
  bubbles,
}: {
  title: string;
  bubbleType: SearchKeywordsKeyType;
  bubbles: KeywordType[];
}) {
  const { searchKeywords, updateSearchKeywords } = useSearchKeywords();

  return (
    <CheckKeywordBubbles
      key={`list-${bubbleType}`}
      title={title}
      bubbleType={bubbleType}
      bubbles={bubbles}
      selectedBubbles={searchKeywords[bubbleType]}
      handleChange={updateSearchKeywords}
    />
  );
}

const SelectedBubbles = ({
  selectedKeywords,
  type,
}: {
  selectedKeywords: KeywordType[];
  type: SearchKeywordsKeyType;
}) => {
  const { updateSearchKeywords } = useSearchKeywords();

  return selectedKeywords?.map((keyword) => (
    <CheckKeywordBubble
      key={`selected-${type}-${keyword.id}`}
      value={`selected-${type}-${keyword.id}`}
      label={keyword.name}
      type="remove"
      onChange={() => {
        updateSearchKeywords(type, keyword);
      }}
    />
  ));
};

export default function KeywordSearchBorad() {
  const { data: keywords } = useSuspenseQuery<KeywordListType[]>({
    queryKey: ['getKeywords'],
    queryFn: () => indexedDB.getItems<KeywordListType[]>(KEYWORD_STORE),
  });

  const [tab, setTab] = useState<number>(0);
  const [tabOpen, setTabOpen] = useState<boolean>(false);
  const { searchKeywords, resetSearchKeywords, hasSelectedKeywords } =
    useSearchKeywords();
  const handleTab = (index: number) => {
    // 현재 탭을 한번 더 클릭한 경우 검색어 초기화하지 않고 탭을 열고 닫기만 한다.

    const isCurrentTab = tab === index;

    if (!isCurrentTab) {
      resetSearchKeywords(keywords[index]);
    }

    setTab(isCurrentTab ? tab : index);
    setTabOpen(isCurrentTab ? !tabOpen : true);
  };

  return (
    <div className="keyword-search-board">
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
          <Icon size="small" color="white" type={tabOpen ? 'up' : 'down'} />
        </div>

        {/* 카테고리 탭 */}
        {keywords?.map((category: KeywordListType, index: number) => (
          <div
            className={classNames('tab', { select: tab === index })}
            key={`category-${category.id}`}
            onClick={() => handleTab(index)}
            aria-hidden="true"
          >
            <Typography level="body-sm" textColor="white" noWrap>
              {category.name}
            </Typography>
          </div>
        ))}
      </div>

      {/* 키워드 리스트 */}
      <div className={classNames('panel-background', { hidden: !tabOpen })}>
        <div className="panel">
          <Bubbles
            title="장르"
            bubbleType="genres"
            bubbles={keywords[tab].genres}
          />

          <div className="driven" />

          <Bubbles
            title="플랫폼"
            bubbleType="platforms"
            bubbles={keywords[tab].platforms}
          />

          <div className="driven" />

          <Bubbles
            title="키워드"
            bubbleType="keywords"
            bubbles={keywords[tab].keywords}
          />
        </div>
      </div>

      {/* 선택한 키워드 리스트 */}
      {tabOpen || hasSelectedKeywords() ? (
        <div className="select-keywords">
          <div className="keywords">
            <SelectedBubbles
              selectedKeywords={searchKeywords.genres}
              type="genres"
            />
            <SelectedBubbles
              selectedKeywords={searchKeywords.platforms}
              type="platforms"
            />
            <SelectedBubbles
              selectedKeywords={searchKeywords.keywords}
              type="keywords"
            />
          </div>

          {hasSelectedKeywords() && (
            <Button
              background="lavender"
              labelColor="french-lilac"
              border="round"
              size="small"
              onClick={() => {
                resetSearchKeywords();
              }}
            >
              초기화
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
