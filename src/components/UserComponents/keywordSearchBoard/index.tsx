import { ValueLabelType } from 'src/types/common.type';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Title } from '@components/CommonComponents/text';
import classNames from 'classnames';
import Button from '@components/CommonComponents/button/index';
import Icon from '@components/CommonComponents/icon';
import { useSearchKeywords } from 'src/hooks/useSearchKeywords';
import keywordListSelector from 'src/atoms/keyword.atom';
import {
  KeywordByCategoryType,
  SearchKeywordsKeyType,
} from 'src/types/serchKeyword.type';
import CheckKeywordBubble from './checkKeywordBubble';
import CheckKeywordBubbles from './checkKeywordBubbles';

export default function KeywordSearchBorad() {
  const wataAllKeywords = useRecoilValue(keywordListSelector);
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
      resetSearchKeywords({
        label: wataAllKeywords[index].label,
        value: wataAllKeywords[index].value,
      });
    }

    setTab(isCurrentTab ? tab : index);
    setTabOpen(isCurrentTab ? !tabOpen : true);
  };

  const renderBubbles = (
    key: string,
    title: string,
    bubbleType: SearchKeywordsKeyType,
    bubbles: ValueLabelType[],
  ) => (
    <CheckKeywordBubbles
      key={`${key}-${title}`}
      title={title}
      bubbleType={bubbleType}
      bubbles={bubbles}
      selectedBubbles={searchKeywords[bubbleType]}
      handleChange={updateSearchKeywords}
    />
  );

  const renderRemoveKeywordBubbles = (
    keywords: ValueLabelType[],
    type: SearchKeywordsKeyType,
  ) =>
    keywords?.map((keyword) => (
      <CheckKeywordBubble
        key={keyword.value}
        value={`selected-${keyword.value}`}
        label={keyword.label}
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
        {wataAllKeywords?.map(
          (keywordBycategory: KeywordByCategoryType, index: number) => (
            <div
              className={classNames('tab', { select: tab === index })}
              key={keywordBycategory.value}
              onClick={() => handleTab(index)}
              aria-hidden="true"
            >
              <Title type="h5" color="white">
                {keywordBycategory.label}
              </Title>
            </div>
          ),
        )}
      </div>

      {/* 키워드 리스트 */}
      <div className={classNames('panel-background', { hidden: !tabOpen })}>
        <div className="panel">
          {renderBubbles(
            wataAllKeywords[tab].value,
            '장르',
            'genres',
            wataAllKeywords[tab].genres,
          )}
          <div className="driven" />
          {renderBubbles(
            wataAllKeywords[tab].value,
            '플랫폼',
            'platforms',
            wataAllKeywords[tab].platforms,
          )}
          <div className="driven" />
          {renderBubbles(
            wataAllKeywords[tab].value,
            '키워드',
            'keywords',
            wataAllKeywords[tab].keywords,
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
              검색 초기화
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
