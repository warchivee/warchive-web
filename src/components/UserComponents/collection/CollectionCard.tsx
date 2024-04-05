import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  SearchKeywordsKeyType,
  SearchKeywordsType,
} from 'src/types/serchKeyword.type';
import { useEffect, useRef, useState } from 'react';
import { KeywordType, PlatformType, WataType } from 'src/types/wata.type';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import searchKeywordAtom from 'src/stores/searchKeyword.atom';

import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Chip from '@mui/joy/Chip';
import { Box, IconButton, Tooltip } from '@mui/joy';
import Icon from '@components/CommonComponents/icon';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

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
  const [openInfo, setOpenInfo] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const openEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
    setOpenInfo(false);
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
      <Typography
        key={`wata-card-${type}-${keyword.id}`}
        onClick={() => handleClickKeyword(newValue)}
        sx={{ cursor: 'pointer' }}
        level="body-sm"
        textColor="text.tertiary"
      >
        #{keyword.name}
      </Typography>
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
      setOpenInfo(false);
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
    <Stack
      direction="row"
      alignItems="flex-end"
      borderBottom="1px solid #d3d3d3"
    >
      <Box
        sx={{
          width: '105px',
          height: '150px',
          boxShadow: '4px -4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img
          width="100%"
          height="100%"
          className="image"
          src={wata.thumbnail_card}
          alt={wata.title}
        />
      </Box>

      <Stack
        direction="column"
        gap={1}
        padding="10px 0 10px 20px"
        height="100%"
        width="100%"
        flex={1}
      >
        <Stack direction="column" gap="5px" height="100%">
          <Typography level="title-md">{wata.title}</Typography>
          <Stack direction="row" gap={1} alignItems="center">
            <Typography textColor="text.tertiary" level="body-sm">
              {wata.category.name}
            </Typography>
            <Typography
              level="body-xs"
              fontWeight={300}
              textColor="text.tertiary"
            >
              |
            </Typography>
            <Typography textColor="text.tertiary" level="body-sm">
              {wata.genre.name}
            </Typography>
          </Stack>
        </Stack>

        <Tooltip
          arrow
          open={openInfo}
          variant="outlined"
          placement="bottom-start"
          sx={{ background: 'white' }}
          title={
            <Card variant="plain" sx={{ background: 'white' }} ref={popupRef}>
              <Typography level="title-md">작가/감독</Typography>
              <Typography textColor="text.tertiary" level="body-sm">
                {wata.creators}
              </Typography>

              <Typography level="title-md">키워드</Typography>
              <Stack direction="row" gap={1} flexWrap="wrap">
                {renderHashTag('genres', wata.genre)}
                {wata?.keywords?.map((keyword: KeywordType) =>
                  renderHashTag('keywords', keyword),
                )}
              </Stack>
              {wata?.cautions.length !== 0 && (
                <>
                  <Typography level="title-md">주의키워드</Typography>
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {wata?.cautions?.map((caution: KeywordType) => (
                      <Typography
                        key={`hashtag-${caution.id}`}
                        level="body-sm"
                        textColor="text.tertiary"
                      >
                        #{caution.name}
                      </Typography>
                    ))}
                  </Stack>
                </>
              )}

              <Typography level="title-md">플랫폼</Typography>
              <Stack direction="row" gap={1} flexWrap="wrap">
                {wata?.platforms?.map((platform: PlatformType) => (
                  <Chip
                    size="sm"
                    key={`hashtag-${platform.id}`}
                    slotProps={{
                      action: {
                        component: 'a',
                        href: platform.url,
                        target: '_blank',
                      },
                    }}
                  >
                    {platform.name}
                  </Chip>
                ))}
              </Stack>
            </Card>
          }
        >
          <IconButton
            variant="soft"
            size="sm"
            sx={{
              gap: '0.5rem',
              background: '#F0F0F0',
              color: '#020202',
              borderRadius: '5px',
            }}
            onClick={() => {
              setOpenInfo(!openInfo);
            }}
          >
            <Icon type="caret-down" color="black" size="normal" />
            작품 정보
          </IconButton>
        </Tooltip>
      </Stack>

      <Box height="100%" paddingTop="5px">
        <IconButton
          onClick={() => {
            moveCollection();
          }}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </IconButton>
      </Box>
    </Stack>
  );
}
