import { WataType } from 'src/types/wata.type';
import { Grid } from '@mui/joy';
import WataCard from './WataCard';

export default function WataCardList({ watas = [] }: { watas: WataType[] }) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {watas?.map((wata: WataType) => (
        <Grid key={`wata-${wata.id}`}>
          <WataCard wata={wata} />
        </Grid>
      ))}
    </Grid>
  );
}
