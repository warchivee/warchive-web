import { WataType } from 'src/types/wata.type';
import { Box } from '@mui/joy';
import WataCard from './WataCard';

export default function WataCardList({ watas = [] }: { watas: WataType[] }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(300px, auto))"
      columnGap="1rem"
      rowGap="1rem"
      width="100%"
      justifyContent="center"
    >
      {watas?.map((wata: WataType) => (
        <WataCard key={`wata-${wata.id}`} wata={wata} />
      ))}
    </Box>
  );
}
