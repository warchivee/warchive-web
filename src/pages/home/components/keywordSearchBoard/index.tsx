import { CategoryType, KeywordType, ValueLabelType } from '@utils/common.type';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Title } from '@components/text';
import classNames from 'classnames';
import Button from '@components/button/index';
import Icon from '@components/icon';
import { useSearchKeywords } from 'src/hooks/useSearchKeywords';
import { keywordListState } from 'src/data/keyword.atom';
import CheckKeywordBubble from './checkKeywordBubble';
import CheckKeywordBubbles from './checkKeywordBubbles';

export default function KeywordSearchBorad() {
  const wataAllKeywords = useRecoilValue(keywordListState);
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
    bubbleType: KeywordType,
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
    type: KeywordType,
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

        {wataAllKeywords?.map((category: CategoryType, index: number) => (
          <div
            className={classNames('tab', { select: tab === index })}
            key={category.value}
            onClick={() => handleTab(index)}
            aria-hidden="true"
          >
            <Title type="h4" color="white">
              {category.label}
            </Title>
          </div>
        ))}
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
              type="round"
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
