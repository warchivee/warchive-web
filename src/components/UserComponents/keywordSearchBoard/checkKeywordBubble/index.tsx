import { Chip } from '@mui/joy';
import ChipDelete from '@mui/joy/ChipDelete';
import { CheckKeywordBubbleProps } from '../index.type';

export default function CheckKeywordBubble({
  label = '키워드',
  type = 'default',
  checked = false,
  onChange = () => {},
}: CheckKeywordBubbleProps) {
  const getVariant = () => {
    if (type === 'remove') {
      return 'outlined';
    }
    if (checked) {
      return 'soft';
    }
    return 'plain';
  };

  return (
    <Chip
      onClick={(e) => onChange(e)}
      variant={getVariant()}
      color="primary"
      size="sm"
      sx={{
        color: checked ? '' : '#EBDBF3',
        '& button': { borderColor: '#EBDBF3' },
      }}
      endDecorator={
        type === 'remove' ? (
          <ChipDelete sx={{ color: '#EBDBF3' }} onDelete={(e) => onChange(e)} />
        ) : null
      }
    >
      {label}
    </Chip>
  );
}
