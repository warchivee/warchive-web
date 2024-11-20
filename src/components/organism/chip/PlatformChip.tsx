// joy components
import { Chip } from '@mui/joy';

// utils
import { PlatformType } from 'src/types/wata.type';

export default function PlatformChip({ platform }: { platform: PlatformType }) {
  const isNaverPlatform = platform.name.includes('네이버');

  return (
    <Chip
      size="sm"
      variant="outlined"
      color="neutral"
      sx={{
        height: 'max-content',
        '& a': {
          backgroundColor: 'transparent',
          pointerEvents: isNaverPlatform ? 'none' : 'auto',
        },
      }}
      slotProps={{
        action: isNaverPlatform
          ? {
              component: 'a',
              href: '',
              onClick: (e: React.MouseEvent) => e.preventDefault(),
            }
          : { component: 'a', href: platform.url, target: '_blank' },
      }}
    >
      {platform.name}
    </Chip>
  );
}
