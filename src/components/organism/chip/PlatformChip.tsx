// joy components
import { Chip } from '@mui/joy';

// utils
import { PlatformType } from 'src/types/wata.type';

export default function PlatformChip({ platform }: { platform: PlatformType }) {
  return (
    <Chip
      size="sm"
      variant="outlined"
      color="neutral"
      sx={{ height: 'max-content', '& a': { backgroundColor: 'transparent' } }}
      slotProps={{
        action: { component: 'a', href: platform.url, target: '_blank' },
      }}
    >
      {platform.name}
    </Chip>
  );
}
