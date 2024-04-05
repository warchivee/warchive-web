import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import wataListState from 'src/stores/wata.atom';
import { getSharedCollectionApi } from 'src/services/collection.api';
import { CollectionType } from 'src/types/collection.type';
import WataCollectionList from '@components/UserComponents/collection/CollectionList';
import { Box, Stack, Typography } from '@mui/joy';
import { useSuspenseQuery } from '@tanstack/react-query';
import Header from 'src/layouts/Header';
import Footer from 'src/layouts/Footer';

const getDatas = async (id: string | undefined): Promise<CollectionType> => {
  if (id) {
    const result = await getSharedCollectionApi(id);
    return result;
  }

  return {
    id: -1,
    shared_id: '',
    title: '',
    note: '',
    items: [],
  } as CollectionType;
};

export default function ShareCollections() {
  const { sharedId } = useParams();

  const watas = useRecoilValue(wataListState);

  const { data: collection } = useSuspenseQuery<CollectionType>({
    queryKey: ['shared-collections', sharedId],
    queryFn: () => getDatas(sharedId),
  });

  return (
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
