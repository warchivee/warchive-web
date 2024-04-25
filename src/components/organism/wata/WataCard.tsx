import { useState } from 'react';

// components
import AddScrapbooksModal from '@components/organism/scrapbook/AddScrapbookItemModal';
import KeywordChip from '@components/organism/chip/KeywordChip';
import PlatformChip from '@components/organism/chip/PlatformChip';

// joy components
import Skeleton from '@mui/joy/Skeleton';
import { Box, IconButton, Stack, Typography } from '@mui/joy';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';

// utils
import { KeywordType, PlatformType, WataType } from 'src/types/wata.type';
import { checkLogin } from 'src/services/auth.api';
import useModal from 'src/hooks/useModal';
import useCropThumbnail from 'src/hooks/useCropThumbnail';
import { useNavigate } from 'react-router-dom';

export default function WataCard({ wata }: { wata: WataType }) {
  const [isOpenScrapbookAddModel, setIsScrapbookAddModal] =
    useState<boolean>(false);
  const [openLoginModal] = useModal();
  const cropThumbnail = useCropThumbnail(wata, 'card');
  const navigate = useNavigate();

  const handleAddScrapbook = () => {
    if (!checkLogin()) {
      openLoginModal({
        title: '스크랩북에 추가하기',
        confirmTitle: '로그인하기',
        cancelTitle: '닫기',
        onConfirm: () => {
          navigate('/login');
        },
        message: '스크랩북을 이용하려면 로그인이 필요해요.',
      });
      return;
    }

    setIsScrapbookAddModal(true);
  };

  return (
    <Stack
      height="12.5rem"
      width="18.75rem"
      sx={{
        boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Stack
        borderRadius="10px 10px 0 0"
        padding="10px"
        height="max-content"
        sx={{ background: '#170c1e' }}
      >
        <Stack direction="row" justifyContent="space-between" gap={1}>
          <Typography
            level={wata.title.length >= 30 ? 'title-sm' : 'title-md'}
            textColor="white"
          >
            {wata.title}
          </Typography>
          <IconButton
            size="sm"
            onClick={handleAddScrapbook}
            sx={{ minHeight: 'max-content', justifyContent: 'flex-end' }}
          >
            <FontAwesomeIcon color="white" icon={faBookBookmark} />
          </IconButton>
        </Stack>

        <Typography level="body-sm" noWrap>
          {wata.creators}
        </Typography>

        <Stack
          direction="row"
          gap={0.5}
          justifyContent="flex-end"
          flexWrap="wrap"
        >
          <KeywordChip keyword={wata.genre} type="genres" />
          {wata?.keywords?.map((keyword: KeywordType) => (
            <KeywordChip
              key={`wata-card-${wata.id}-keyword-${keyword.id}`}
              keyword={keyword}
              type="keywords"
            />
          ))}
        </Stack>
      </Stack>

      <Box flex={1} position="relative">
        <Skeleton variant="overlay" loading={cropThumbnail === undefined}>
          <img
            loading="lazy"
            decoding="async"
            src={cropThumbnail}
            alt={`${wata.title}`}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              position: 'absolute',
              contentVisibility: 'auto',
            }}
          />
        </Skeleton>
        <Stack
          position="absolute"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            alignContent="center"
            height="100%"
            width="100%"
            padding="10px"
            gap={1}
            sx={{
              background: '#170c1e',
              opacity: '0',
              transition: 'all 0.3s',

              '&:hover': {
                opacity: '0.8',
              },
            }}
          >
            {wata?.platforms?.map((platform: PlatformType) => (
              <PlatformChip
                key={`wata-card-${wata.id}-platform-${platform.id}`}
                platform={platform}
              />
            ))}
          </Stack>

          {wata?.cautions.length !== 0 && (
            <Stack
              direction="row"
              height="fit-content"
              marginTop="auto"
              width="100%"
              alignItems="center"
              justifyContent="center"
              padding="5px"
              gap={0.5}
              sx={{ background: '#170c1e', opacity: '0.8' }}
            >
              {wata?.cautions?.map((caution: KeywordType) => (
                <Typography
                  key={`wata-card-${wata.id}-caution-${caution.id}`}
                  level="body-xs"
                  textColor="white"
                >
                  ⚠️ {caution.name}
                </Typography>
              ))}
            </Stack>
          )}
        </Stack>
      </Box>

      <AddScrapbooksModal
        title="스크랩북에 추가하기"
        wata={wata}
        isOpen={isOpenScrapbookAddModel}
        onClose={() => setIsScrapbookAddModal(false)}
      />
    </Stack>
  );
}
