import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stack, Typography } from '@mui/joy';

export default function Empty({
  icon,
  title,
  content,
}: {
  icon: IconDefinition;
  title: string;
  content: JSX.Element;
}) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={2}
      height="100%"
      minHeight={300}
    >
      <FontAwesomeIcon size="3x" icon={icon} color="#170c1e" />
      <Typography level="h3">{title}</Typography>

      {content}
    </Stack>
  );
}
