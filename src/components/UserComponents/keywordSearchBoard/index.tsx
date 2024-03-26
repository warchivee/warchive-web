import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Title } from '@components/CommonComponents/text';
import classNames from 'classnames';
import Button from '@components/CommonComponents/button/index';
import Icon from '@components/CommonComponents/icon';
import { useSearchKeywords } from 'src/hooks/useSearchKeywords';
import { SearchKeywordsKeyType } from 'src/types/serchKeyword.type';
import wataListSelector from 'src/atoms/wata.atom';
import { KeywordListType, KeywordType } from 'src/types/wata.type';
import CheckKeywordBubble from './checkKeywordBubble';
import CheckKeywordBubbles from './checkKeywordBubbles';

export default function KeywordSearchBorad() {
  const { categories } = useRecoilValue(wataListSelector);
  const [tab, setTab] = useState<number>(0);
  const [tabOpen, setTabOpen] = useState<boolean>(false);
  const {
    searchKeywords,
    updateSearchKeywords,
    resetSearchKeywords,
    hasSelectedKeywords,
  } = useSearchKeywords();

  const handleTab = (index: number) => {
    // 현재 탭을 한번 더 클릭한 경우 검색어 초기화하지 않고 탭을 열고 닫기만 한다.

    const isCurrentTab = tab === index;

    if (!isCurrentTab) {
      resetSearchKeywords(categories[index]);
    }

    setTab(isCurrentTab ? tab : index);
    setTabOpen(isCurrentTab ? !tabOpen : true);
  };

  const renderBubbles = (
    id: number,
    title: string,
    bubbleType: SearchKeywordsKeyType,
    bubbles: KeywordType[],
  ) => (
    <CheckKeywordBubbles
      key={`list-${bubbleType}`}
      title={title}
      bubbleType={bubbleType}
      bubbles={bubbles}
      selectedBubbles={searchKeywords[bubbleType]}
      handleChange={updateSearchKeywords}
    />
  );
  const renderRemoveKeywordBubbles = (
    keywords: KeywordType[],
    type: SearchKeywordsKeyType,
  ) =>
    keywords?.map((keyword) => (
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
        {categories?.map((category: KeywordListType, index: number) => (
          <div
            className={classNames('tab', { select: tab === index })}
            key={`category-${category.id}`}
            onClick={() => handleTab(index)}
            aria-hidden="true"
          >
            <Title type="h5" color="white">
              {category.name}
            </Title>
          </div>
        ))}
      </div>

      {/* 키워드 리스트 */}
      <div className={classNames('panel-background', { hidden: !tabOpen })}>
        <div className="panel">
          {renderBubbles(
            categories[tab].id,
            '장르',
            'genres',
            categories[tab].genres,
          )}
          <div className="driven" />
          {renderBubbles(
            categories[tab].id,
            '플랫폼',
            'platforms',
            categories[tab].platforms,
          )}
          <div className="driven" />
          {renderBubbles(
            categories[tab].id,
            '키워드',
            'keywords',
            categories[tab].keywords,
          )}
        </div>
      </div>

      {/* 선택한 키워드 리스트 */}
      {tabOpen || hasSelectedKeywords() ? (
        <div className="select-keywords">
          <div className="keywords">
            {renderRemoveKeywordBubbles(searchKeywords.genres, 'genres')}
            {renderRemoveKeywordBubbles(searchKeywords.platforms, 'platforms')}
            {renderRemoveKeywordBubbles(searchKeywords.keywords, 'keywords')}
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
