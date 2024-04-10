import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import wataListState from 'src/stores/wata.atom';
import { getSharedCollectionApi } from 'src/services/collection.api';
import { CollectionType } from 'src/types/collection.type';
import WataCollectionList from '@components/organism/collection/CollectionList';
import { Box, Stack, Typography } from '@mui/joy';
import { useSuspenseQuery } from '@tanstack/react-query';
import Header from '@components/organism/Header';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSurprise } from '@fortawesome/free-regular-svg-icons';

const getDatas = async (
  id: string | undefined,
): Promise<CollectionType | undefined> => {
  if (id) {
    try {
      const result = await getSharedCollectionApi(id);
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

export default function ShareCollections() {
  const { sharedId } = useParams();

  const watas = useRecoilValue(wataListState);

  const { data: collection } = useSuspenseQuery<CollectionType | undefined>({
    queryKey: ['shared-collections', sharedId],
    queryFn: () => getDatas(sharedId),
  });

  return !collection || collection?.id === -1 ? (
    <Stack height="calc(100vh - 68px)" minHeight="667px">
      <Header />
      <Stack justifyContent="center" alignItems="center" gap={2} height="100%">
        <FontAwesomeIcon size="4x" icon={faFaceSurprise} color="#170c1e" />
        <Typography level="h3">앗, 공유할 컬렉션이 없어요!</Typography>
        <Typography>없어진 컬렉션이거나 없는 컬렉션이에요.</Typography>
      </Stack>
    </Stack>
  ) : (
    <div className="share-collections">
      <Header />
      <Box
        sx={{
          height: '350px',
          backgroundImage: `url(${watas?.find((wata) => wata.id === collection?.items[0])?.thumbnail_card})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
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
            backdropFilter: 'blur(10px) brightness(40%)',
            WebkitBackdropFilter: 'blur(10px) brightness(40%)',
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
                {collection?.title}
              </Typography>
              <Typography level="body-sm" sx={{ color: '#D9D9D9' }}>
                {collection?.note}
              </Typography>
            </Stack>

            <Stack>
              {/* <Button variant="plain" sx={{ color: '#D9D9D9' }}>
                내 컬렉션에 추가
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
        <WataCollectionList
          watas={watas?.filter((wata) => collection?.items?.includes(wata.id))}
        />
      </Box>
    </div>
  );
}
