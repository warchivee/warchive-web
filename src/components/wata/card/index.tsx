import Button from '@components/button';
import { Text, Title } from '@components/text';
import {
  KeywordType,
  SearchKeywordType,
  ValueLabelType,
  WataType,
} from '@utils/common.type';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { searchKeywordState } from 'src/data/search.atom';

interface WataCardProps {
  wata: WataType;
  handleBookmark: () => void;
}

export default function WataCard({ wata, handleBookmark }: WataCardProps) {
  const navigate = useNavigate();
  const [searchKeywords, setSearchKeywords] =
    useRecoilState(searchKeywordState);

  const handleClickKeyword = (newValue: SearchKeywordType) => {
    setSearchKeywords(newValue);
    navigate('/');
  };

  const renderHashTag = (type: KeywordType, keyword: ValueLabelType) => {
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
        aria-hidden="true"
      >
        <Text key={`hashtag-${keyword.value}`} color="gray">
          #{keyword.label}
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
          <Text color="gray">{wata.creator}</Text>
        </div>

        <div className="hashTags">
          {renderHashTag('genres', wata.genre)}
          {wata?.keywords?.map((keyword: ValueLabelType) =>
            renderHashTag('keywords', keyword),
          )}
        </div>
      </div>

      <div
        className="body"
        style={{
          backgroundImage: `url(${wata.thumbnail})`,
        }}
      >
        <div className="platforms">
          {wata?.platforms?.map(
            (platform: { value: string; label: string; url: string }) => (
              <a
                key={`hashtag-${platform.value}`}
                href={platform.url}
                target="_blank"
                aria-label="플랫폼으로 이동"
                rel="noreferrer"
              >
                <Text color="white">#{platform.label}</Text>
              </a>
            ),
          )}
        </div>

        {wata?.cautions.length !== 0 && (
          <div className="cautions">
            {wata?.cautions?.map((caution: ValueLabelType) => (
              <Text key={`hashtag-${caution.value}`} color="selago">
                #{caution.label}
              </Text>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
