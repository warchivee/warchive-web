import Button from '@components/CommonComponents/button';
import { Text, Title } from '@components/CommonComponents/text';
import {
  SearchKeywordsKeyType,
  SearchKeywordsType,
} from 'src/types/serchKeyword.type';
import { useEffect, useRef, useState } from 'react';
import { KeywordType, PlatformType, WataType } from 'src/types/wata.type';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import searchKeywordAtom from 'src/stores/search.atom';

interface WataCardProps {
  wata: WataType;
  handleCollection: () => void;
}

export default function WataCollectionCard({
  wata,
  handleCollection,
}: WataCardProps) {
  const navigate = useNavigate();
  const [searchKeywords, setSearchKeywords] = useRecoilState(searchKeywordAtom);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

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

  const renderHashTag = (type: SearchKeywordsKeyType, keyword: KeywordType) => {
    const newValue = {
      ...searchKeywords,
      searchInput: '',
      genres: type === 'genres' ? [keyword] : [],
      platforms: [],
      keywords: type === 'keywords' ? [keyword] : [],
    };

    return (
      <div
        key={`wata-card-${type}-${keyword.id}`}
        onClick={() => handleClickKeyword(newValue)}
        style={{ cursor: 'pointer' }}
        aria-hidden
      >
        <Text key={`hashtag-${keyword.id}`} color="gray" size="small">
          #{keyword.name}
        </Text>
      </div>
    );
  };

  const moveCollection = () => {
    handleCollection();
    openEditModal();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef?.current?.contains(event.target as Node)
    ) {
      openInfoModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wata-col-card">
      <div className="body">
        <img className="image" src={wata.thumbnail_card} alt={wata.title} />

        <div className="center">
          <div className="infos">
            <Title type={wata.title.length > 15 ? 'h4' : 'h3'}>
              {wata.title}
            </Title>
            <Text color="gray">{wata.creators}</Text>
            <div className="info">
              <Text color="gray">{wata.category.name}</Text>
              <Text color="gray">|</Text>
              <Text color="gray">{wata.genre.name}</Text>
            </div>
          </div>

          <div className="info-button">
            <Button
              background="light-gray"
              icon="caret-down"
              width="full"
              onClick={() => {
                openInfoModal();
              }}
            >
              작품 정보
            </Button>
            {isInfoModalVisible && (
              <div className="info-modal" ref={popupRef}>
                <div className="modal-area">
                  <div className="keyword">
                    <div className="title">
                      <Text color="black" size="big">
                        키워드
                      </Text>
                    </div>
                    <div className="content">
                      {renderHashTag('genres', wata.genre)}
                      {wata?.keywords?.map((keyword: KeywordType) =>
                        renderHashTag('keywords', keyword),
                      )}
                    </div>
                  </div>
                  {wata?.cautions.length !== 0 && (
                    <div className="warning">
                      <div className="title">
                        <Text color="black" size="big">
                          주의 키워드
                        </Text>
                      </div>
                      <div className="content">
                        <div className="cautions">
                          {wata?.cautions?.map((caution: KeywordType) => (
                            <Text
                              key={`hashtag-${caution.id}`}
                              color="gray"
                              size="small"
                            >
                              #{caution.name}
                            </Text>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="platform">
                    <div className="title">
                      <Text color="black" size="big">
                        볼 수 있는 곳
                      </Text>
                    </div>
                    <div className="content">
                      {wata?.platforms?.map((platform: PlatformType) => (
                        <a
                          key={`hashtag-${platform.id}`}
                          href={platform.url}
                          target="_blank"
                          aria-label="플랫폼으로 이동"
                          rel="noreferrer"
                        >
                          <Button
                            key={`hashtag-${platform.id}`}
                            labelColor="black"
                            background="light-gray"
                            border="round"
                            size="small"
                          >
                            {platform.name}
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
              moveCollection();
            }}
          />
        </div>
      </div>
    </div>
  );
}
