import Button from '@components/button';
import { Text, Title } from '@components/text';
import { ValueLabelType, WataType } from '@utils/common.type';
import { useRecoilState } from 'recoil';
import { searchKeywordState } from 'src/data/search.atom';

interface WataCardProps {
  wata: WataType;
}

export default function WataCard({ wata }: WataCardProps) {
  const [searchKeywords, setSearchKeywords] =
    useRecoilState(searchKeywordState);

  return (
    <div className="wata-card">
      <div className="header">
        <div className="title">
          <Title type="h3" color="white">
            {wata.title}
          </Title>
          <Button icon="star" iconColor="white" size="big" />
        </div>

        <div className="creator">
          <Text color="gray">{wata.creator}</Text>
        </div>

        <div className="hashTags">
          <div
            onClick={() =>
              setSearchKeywords({
                ...searchKeywords,
                searchInput: '',
                genres: [wata.genre],
                platforms: [],
                keywords: [],
              })
            }
            aria-hidden="true"
          >
            <Text key={`hashtag-${wata.genre.value}`} color="gray">
              #{wata.genre.label}
            </Text>
          </div>
          {wata?.keywords?.map((keyword: ValueLabelType) => (
            <div
              key={`wata-card-keyword-${keyword.value}`}
              onClick={() =>
                setSearchKeywords({
                  ...searchKeywords,
                  searchInput: '',
                  genres: [],
                  platforms: [],
                  keywords: [keyword],
                })
              }
              aria-hidden="true"
            >
              <Text key={`hashtag-${keyword.value}`} color="gray">
                #{keyword.label}
              </Text>
            </div>
          ))}
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
