// joy conponents
import {
  faArrowDown,
  faEnvelope,
  faPenFancy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
  Input,
  Textarea,
  Select,
  Option,
  Divider,
  Button,
} from '@mui/joy';

import emailjs from '@emailjs/browser';
import useSnackbar from 'src/hooks/useSnackbar';
import { useState } from 'react';

export default function MailModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [openSnackbar] = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [contents, setContents] = useState({
    category: '',
    title: '',
    creators: '',
    content: '',
  });

  const handleClose = () => {
    if (loading) {
      return;
    }

    setContents({
      category: '',
      title: '',
      creators: '',
      content: '',
    });

    onClose();
  };

  return (
    <Modal
      open={open}
      sx={{
        background: '#00000080',
      }}
      onClose={handleClose}
    >
      <ModalDialog
        layout="center"
        sx={{
          minWidth: '375px',
          maxWidth: '500px',
          overflowY: 'scroll',
        }}
      >
        <ModalClose variant="plain" />
        <Stack
          alignItems="center"
          gap={1}
          justifyContent="center"
          height="150px"
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{
              color: 'white',
              fontSize: '35px',
              background: `linear-gradient(158deg, #C30DFE 0%, #5F2ADE 100%)`,
              padding: '1.3rem',
              borderRadius: '50%',
            }}
          />
          <Stack alignItems="center">
            <Typography level="body-md" fontWeight="500">
              남들에게 알리고 싶은
            </Typography>
            <Typography level="h3" fontWeight="800">
              나만의{' '}
              <Typography
                sx={{
                  background: `linear-gradient(158deg, #C30DFE 0%, #5F2ADE 90%)`,
                  color: 'transparent',
                  '-webkitBackgroundClip': 'text',
                }}
              >
                여성서사
              </Typography>{' '}
              를 추천해주세요!
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ margin: '1rem 0' }} />

        <Stack gap={1}>
          <Stack direction="row" gap={1}>
            <FontAwesomeIcon icon={faPenFancy} style={{ color: 'black' }} />
            <Typography level="body-sm" textColor="black">
              와카이브에서 제보받는 여성서사의 기준
            </Typography>
          </Stack>
          <Card variant="soft">
            <Typography level="body-xs" textColor="#9023D5">
              - 여성이 주연일 것
              <br />- 조연급 여성이 다수 등장할 것
              <br /> - 대상화된 여성이 아니거나, 기존에 많이 등장한 적 없는
              다양한 형태의 여성일 것
              <br /> - 비여성의 비중, 혹은 로맨스가 부각되지 않을 것
              <br /> - 여성의 도구화 혹은 불행포르노가 주가 되지 않을 것
            </Typography>

            <Typography level="body-xs" sx={{ textDecoration: 'underline' }}>
              * 저작권 문제로 인해 정식 출판, 출시된 컨텐츠만 등록합니다.
            </Typography>
          </Card>
        </Stack>
        <Stack gap={1}>
          <Stack direction="row" gap={1}>
            <FontAwesomeIcon icon={faPenFancy} style={{ color: 'black' }} />
            <Typography level="body-sm" textColor="black">
              작품 정보
            </Typography>
          </Stack>
          <Select
            variant="soft"
            size="sm"
            placeholder="선택해주세요."
            value={contents.category}
            onChange={(e, newValue: string | null) => {
              setContents({
                ...contents,
                category: newValue ?? '',
              });
            }}
            indicator={<FontAwesomeIcon icon={faArrowDown} />}
            startDecorator={
              <Typography level="body-sm" textColor="tertiary">
                *카테고리
              </Typography>
            }
          >
            <Option value="게임">게임</Option>
            <Option value="공연/전시">공연전시</Option>
            <Option value="서적">서적</Option>
            <Option value="만화">만화</Option>
            <Option value="영상">영상</Option>
          </Select>
          <Input
            fullWidth
            variant="soft"
            color="neutral"
            value={contents.title}
            onChange={(e) => {
              setContents({
                ...contents,
                title: e.target.value,
              });
            }}
            startDecorator={
              <Typography level="body-sm" textColor="tertiary">
                *작품명
              </Typography>
            }
          />
          <Input
            fullWidth
            variant="soft"
            color="neutral"
            value={contents.creators}
            onChange={(e) => {
              setContents({
                ...contents,
                creators: e.target.value,
              });
            }}
            startDecorator={
              <Typography level="body-sm" textColor="tertiary">
                *작가/감독
              </Typography>
            }
          />
          <Textarea
            sx={{ width: '100%' }}
            variant="soft"
            maxRows={2}
            minRows={2}
            color="neutral"
            value={contents.content}
            onChange={(e) => {
              setContents({
                ...contents,
                content: e.target.value,
              });
            }}
            startDecorator={
              <Typography level="body-sm" textColor="tertiary">
                간단 소개
              </Typography>
            }
          />
        </Stack>
        <Divider sx={{ margin: '1rem 0' }} />
        <Button
          loading={loading}
          onClick={async (e) => {
            e.preventDefault();

            if (
              contents.category === '' ||
              contents.creators === '' ||
              contents.title === ''
            ) {
              openSnackbar({
                message: '작품 정보를 입력해주세요.',
              });
              return;
            }

            try {
              setLoading(true);

              await emailjs.send('warchive', 'warchive_template', contents, {
                publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
              });

              openSnackbar({
                message: '추천작을 와카이브로 전송했어요.',
              });

              setContents({
                category: '',
                title: '',
                creators: '',
                content: '',
              });

              onClose();
            } catch (error) {
              openSnackbar({
                message:
                  '메일을 전송하지 못했습니다. 오류가 계속되면 와카이브에 문의 바랍니다.',
              });
            }

            setLoading(false);
          }}
        >
          보내기
        </Button>
      </ModalDialog>
    </Modal>
  );
}
