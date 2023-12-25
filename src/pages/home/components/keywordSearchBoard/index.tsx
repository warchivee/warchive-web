import { CategoryType, ValueLabelType } from '@utils/common.type';
import { useState } from 'react';
import { Title } from '@components/text';
import classNames from 'classnames';
import Button from '@components/button/index';
import Bubbles from './bubbles';
import Bubble from './bubble';

interface KeywordSearchBoradProps {
  keywords: CategoryType[];
  selectKeywords: ValueLabelType<string>[];
  addSelectKeyword: (keyword: ValueLabelType<string>) => void;
  removeSelectKeyword: (keyword: ValueLabelType<string>) => void;
}

export default function KeywordSearchBorad({
  keywords,
  selectKeywords,
  addSelectKeyword,
  removeSelectKeyword,
}: KeywordSearchBoradProps) {
  const [tab, setTab] = useState<number>(0);
  const [tabOpen, setTabOpen] = useState<boolean>(false);
  const handleChange = (checked: boolean, keyword: ValueLabelType<string>) => {
    if (checked) {
      addSelectKeyword(keyword);
    } else {
      removeSelectKeyword(keyword);
    }
  };

  return (
    <div className="keyword-search-board">
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
        </div>

        {keywords?.map((category: CategoryType, index: number) => (
          <div
            className={classNames('tab', { select: tab === index })}
            key={category.value}
            onClick={() => {
              setTab(index);
              setTabOpen(true);
            }}
            aria-hidden="true"
          >
            <Title type="h4" color="white">
              {category.label}
            </Title>
          </div>
        ))}
      </div>

      <div className={classNames('panel-background', { hidden: !tabOpen })}>
        <div className="panel">
          <Bubbles
            key={`${keywords[tab].value}-장르`}
            title="장르"
            bubbles={keywords[tab].genres}
            handleChange={handleChange}
          />
          <div className="driven" />
          <Bubbles
            key={`${keywords[tab].value}-플랫폼`}
            title="플랫폼"
            bubbles={keywords[tab].platforms}
            handleChange={handleChange}
          />
          <div className="driven" />
          <Bubbles
            key={`${keywords[tab].value}-키워드`}
            title="키워드"
            bubbles={keywords[tab].keywords}
            handleChange={handleChange}
          />
        </div>
      </div>

      {(tabOpen || selectKeywords?.length !== 0) && (
        <div className="select-keywords">
          <div className="keywords">
            {selectKeywords?.map((keyword: ValueLabelType<string>) => (
              <Bubble
                key={keyword.value}
                value={`selected-${keyword.value}`} // selected 를 붙여주지 않으면 panel 의 키워드가 같이 조작된다.
                label={keyword.label}
                type="remove"
                size="small"
                onChange={() => {
                  removeSelectKeyword(keyword);
                }}
              />
            ))}
          </div>

          {selectKeywords?.length !== 0 && (
            <Button
              background="lavender"
              labelColor="french-lilac"
              type="round"
              size="small"
            >
              검색 초기화
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
