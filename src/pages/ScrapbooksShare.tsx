import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import wataListState from 'src/stores/wata.atom';
import { getSharedScrapbookApi } from 'src/services/scrapbook.api';
import WataScrapbookList from '@components/organism/scrapbook/ScrapList';
import { Box, Stack, Typography } from '@mui/joy';
import { useSuspenseQuery } from '@tanstack/react-query';
import Header from '@components/organism/Header';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSurprise } from '@fortawesome/free-regular-svg-icons';
import { ScrapbookType } from 'src/types/scrapbooks.type';
import useCropThumbnail from 'src/hooks/useCropThumbnail';

const getDatas = async (
  id: string | undefined,
): Promise<ScrapbookType | undefined> => {
  if (id) {
    try {
      const result = await getSharedScrapbookApi(id);
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return {
            id: -1,
            shared_id: '',
            title: '',
            note: '',
            items: [],
          };
        }
      }
    }
  }

  return undefined;
};

export default function ShareScrapbooks() {
  const { sharedId } = useParams();

  const watas = useRecoilValue(wataListState);

  const { data: scrapbook } = useSuspenseQuery<ScrapbookType | undefined>({
    queryKey: ['shared-scrapbooks', sharedId],
    queryFn: () => getDatas(sharedId),
  });

  const thumbnail = useCropThumbnail(
    watas?.find((wata) => wata.id === scrapbook?.items[0]),
    'card',
  );

  return !scrapbook || scrapbook?.id === -1 ? (
    <Stack height="calc(100vh - 68px)" minHeight="667px">
      <Header />
      <Stack justifyContent="center" alignItems="center" gap={2} height="100%">
        <FontAwesomeIcon size="4x" icon={faFaceSurprise} color="#170c1e" />
        <Typography level="h3">앗, 공유할 스크랩북이 없어요!</Typography>
        <Typography>없어졌거나 없는 스크랩북이에요.</Typography>
      </Stack>
    </Stack>
  ) : (
    <div className="share-scrapbooks">
      <Header />
      <Box
        sx={{
          height: '350px',
          backgroundImage: `url(${thumbnail})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundColor: 'black',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            height: '350px',
            backdropFilter: 'blur(5px) brightness(40%)',
            WebkitBackdropFilter: 'blur(5px) brightness(40%)',
            padding: '0 1rem',
          }}
        >
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
            width="100%"
            maxWidth="1000px"
            paddingBottom="20px"
          >
            <Stack gap="10px">
              <Typography level="h2" sx={{ color: 'white' }}>
                {scrapbook?.title}
              </Typography>
              <Typography level="body-sm" sx={{ color: '#D9D9D9' }}>
                {scrapbook?.note}
              </Typography>
            </Stack>

            <Stack>
              {/* <Button variant="plain" sx={{ color: '#D9D9D9' }}>
                내 스크랩북에 추가
              </Button> */}
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          margin: '0 auto',
          width: '100%',
          maxWidth: '1000px',
          padding: '3rem 1rem',
          overflow: 'auto',
        }}
      >
        <WataScrapbookList
          watas={watas?.filter((wata) => scrapbook?.items?.includes(wata.id))}
        />
      </Box>
    </div>
  );
}
