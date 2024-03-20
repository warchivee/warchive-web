import Button from '@components/CommonComponents/button';
import { Text, Title } from '@components/CommonComponents/text';
import Icon from '@components/CommonComponents/icon';
import { ValueLabelType } from 'src/types/common.type';
import {
  SearchKeywordsKeyType,
  SearchKeywordsType,
} from 'src/types/serchKeyword.type';
import { useState } from 'react';
import { PlatformType, WataType } from 'src/types/wata.type';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import searchKeywordAtom from 'src/atoms/search.atom';

interface WataCardProps {
  wata: WataType;
  handleCollection: () => void;
  deleteCollection: () => void;
}

export default function WataCollectionCard({
  wata,
  handleCollection,
  deleteCollection,
}: WataCardProps) {
  const navigate = useNavigate();
  const [searchKeywords, setSearchKeywords] = useRecoilState(searchKeywordAtom);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  const openEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
    setIsInfoModalVisible(false);
  };

  const openInfoModal = () => {
    setIsEditModalVisible(false);
    setIsInfoModalVisible(!isInfoModalVisible);
  };

  const handleClickKeyword = (newValue: SearchKeywordsType) => {
    setSearchKeywords(newValue);
    navigate('/');
  };

  const renderTag = (type: SearchKeywordsKeyType, keyword: ValueLabelType) => {
    return (
      <div key={`wata-card-${type}-${keyword.value}`}>
        {type !== 'genres' && '/'}
        {keyword.label}
      </div>
    );
  };

  const renderHashTag = (
    type: SearchKeywordsKeyType,
    keyword: ValueLabelType,
  ) => {
    const newValue = {
      ...searchKeywords,
      searchInput: '',
      genres: type === 'genres' ? [keyword] : [],
      platforms: [],
      keywords: type === 'keywords' ? [keyword] : [],
    };

    return (
      <div
        key={`wata-card-${type}-${keyword.value}`}
        onClick={() => handleClickKeyword(newValue)}
        style={{ cursor: 'pointer' }}
      >
        <Text key={`hashtag-${keyword.value}`} color="gray" size="small">
          #{keyword.label}
        </Text>
      </div>
    );
  };

  const deleteFromCollection = () => {
    deleteCollection();
    openEditModal();
  };

  const moveCollection = () => {
    handleCollection();
    openEditModal();
  };

  return (
    <div className="wata-col-card">
      <div className="body">
        <div className="left">
          <img className="image" src={wata.thumbnail} alt={wata.title}></img>
        </div>
        <div className="center">
          <div className="title">{wata.title}</div>
          <div className="info">
            <div className="creator">{wata.creator}</div>
            <div className="division">|</div>
            <div className="tags">
              {renderTag('genres', wata.genre)}
              {wata?.keywords?.map((keyword: ValueLabelType) =>
                renderTag('keywords', keyword),
              )}
            </div>
          </div>
          <div className="info-button">
            <button
              type="button"
              className="custom-button"
              onClick={() => {
                openInfoModal();
              }}
            >
              <div className="icon-box">
                <Icon type="caret-down" color="black" size="big" />
              </div>
              <Text size="big" color="black">
                작품 정보
              </Text>
            </button>

            {/* <Button
              children="작품 정보"
              icon="caret-down"
              iconColor="black"
              background="light-gray"
              size="big"
              width="full"
              onClick={() => {
                openInfoModal();
              }}
            ></Button> */}
            {isInfoModalVisible && (
              <div className="info-modal">
                <div className="modal-area">
                  <div className="keyword">
                    <div className="title">
                      <Text children="키워드" color="black" size="big"></Text>
                    </div>
                    <div className="content">
                      {renderHashTag('genres', wata.genre)}
                      {wata?.keywords?.map((keyword: ValueLabelType) =>
                        renderHashTag('keywords', keyword),
                      )}
                    </div>
                  </div>
                  <div className="warning">
                    <div className="title">
                      <Text
                        children="주의 키워드"
                        color="black"
                        size="big"
                      ></Text>
                    </div>
                    <div className="content">
                      {wata?.cautions.length !== 0 && (
                        <div className="cautions">
                          {wata?.cautions?.map((caution: ValueLabelType) => (
                            <Text
                              key={`hashtag-${caution.value}`}
                              color="gray"
                              size="small"
                            >
                              #{caution.label}
                            </Text>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="platform">
                    <div className="title">
                      <Text
                        children="볼 수 있는 곳"
                        color="black"
                        size="big"
                      ></Text>
                    </div>
                    <div className="content">
                      {wata?.platforms?.map((platform: PlatformType) => (
                        <a
                          key={`hashtag-${platform.value}`}
                          href={platform.url}
                          target="_blank"
                          aria-label="플랫폼으로 이동"
                          rel="noreferrer"
                        >
                          <Button
                            key={`hashtag-${platform.label}`}
                            labelColor="black"
                            background="light-gray"
                            border="round"
                            size="small"
                          >
                            {platform.label}
                          </Button>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="info-button-mobile">
            <Button
              children="작품 정보"
              icon="caret-down"
              iconColor="black"
              background="light-gray"
              size="small"
              width="full"
              onClick={() => {
                openInfoModal();
              }}
            ></Button>
            {isInfoModalVisible && (
              <div className="info-modal">
                <div className="modal-area">
                  <div className="keyword">
                    <div className="title">
                      <Text children="키워드" color="black" size="big"></Text>
                    </div>
                    <div className="content">
                      {renderHashTag('genres', wata.genre)}
                      {wata?.keywords?.map((keyword: ValueLabelType) =>
                        renderHashTag('keywords', keyword),
                      )}
                    </div>
                  </div>
                  <div className="warning">
                    <div className="title">
                      <Text
                        children="주의 키워드"
                        color="black"
                        size="big"
                      ></Text>
                    </div>
                    <div className="content">
                      {wata?.cautions.length !== 0 && (
                        <div className="cautions">
                          {wata?.cautions?.map((caution: ValueLabelType) => (
                            <Text
                              key={`hashtag-${caution.value}`}
                              color="gray"
                              size="small"
                            >
                              #{caution.label}
                            </Text>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="platform">
                    <div className="title">
                      <Text
                        children="볼 수 있는 곳"
                        color="black"
                        size="big"
                      ></Text>
                    </div>
                    <div className="content">
                      {wata?.platforms?.map((platform: PlatformType) => (
                        <a
                          key={`hashtag-${platform.value}`}
                          href={platform.url}
                          target="_blank"
                          aria-label="플랫폼으로 이동"
                          rel="noreferrer"
                        >
                          <Button
                            key={`hashtag-${platform.label}`}
                            labelColor="black"
                            background="light-gray"
                            border="round"
                            size="small"
                          >
                            {platform.label}
                          </Button>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="right">
          <Button
            icon="vertical-dots"
            iconColor="gray"
            size="big"
            onClick={() => {
              openEditModal();
            }}
          />
          {isEditModalVisible && (
            <div className="edit-modal">
              <div className="modal-area">
                <div className="modal-text">
                  <Button
                    size="big"
                    children="이 컬렉션에서 삭제하기"
                    onClick={() => deleteFromCollection()}
                  ></Button>
                </div>
                <div className="modal-text">
                  <Button
                    size="big"
                    children="컬렉션 이동하기"
                    onClick={() => moveCollection()}
                  ></Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bottom"></div>
    </div>
  );
}
