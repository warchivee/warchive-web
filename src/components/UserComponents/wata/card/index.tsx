import Button from '@components/CommonComponents/button';
import { Text, Title } from '@components/CommonComponents/text';
import {
  SearchKeywordsKeyType,
  SearchKeywordsType,
} from 'src/types/serchKeyword.type';
import { KeywordType, PlatformType, WataType } from 'src/types/wata.type';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import searchKeywordAtom from 'src/atoms/search.atom';

interface WataCardProps {
  wata: WataType;
  handleBookmark: () => void;
}

export default function WataCard({ wata, handleBookmark }: WataCardProps) {
  const navigate = useNavigate();
  const [searchKeywords, setSearchKeywords] = useRecoilState(searchKeywordAtom);

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
        aria-hidden="true"
      >
        <Text key={`hashtag-${keyword.id}`} color="gray">
          #{keyword.name}
        </Text>
      </div>
    );
  };

  return (
    <div className="wata-card">
      <div className="header">
        <div className="title">
          <Title type="h3" color="white">
            {wata.title}
          </Title>
          <Button
            icon="folder-plus"
            iconColor="white"
            size="big"
            onClick={() => {
              handleBookmark();
            }}
          />
        </div>

        <div className="creator">
          <Text color="gray">{wata.creators}</Text>
        </div>

        <div className="hashTags">
          {renderHashTag('genres', wata.genre)}
          {wata?.keywords?.map((keyword: KeywordType) =>
            renderHashTag('keywords', keyword),
          )}
        </div>
      </div>

      <div
        className="body"
        style={{
          backgroundImage: `url(${wata.thumbnail_card})`,
        }}
      >
        <div className="platforms">
          {wata?.platforms?.map((platform: PlatformType) => (
            <a
              key={`hashtag-${platform.id}`}
              href={platform.url}
              target="_blank"
              aria-label="플랫폼으로 이동"
              rel="noreferrer"
            >
              <Text color="white">#{platform.name}</Text>
            </a>
          ))}
        </div>

        {wata?.cautions.length !== 0 && (
          <div className="cautions">
            {wata?.cautions?.map((caution: KeywordType) => (
              <Text key={`hashtag-${caution.id}`} color="selago">
                #{caution.name}
              </Text>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
