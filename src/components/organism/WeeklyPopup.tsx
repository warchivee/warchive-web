// joy conponents
import {
  Button,
  Card,
  Checkbox,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Tooltip,
  Typography,
} from '@mui/joy';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullhorn,
  faPalette,
  faPenFancy,
  faBook,
  faLaptop,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

// utils
import weeklyPopupHandler from '@utils/weeklyPopup.util';

export default function WeeklyPopup() {
  const [open, setOpen] = useState(false);
  const [closeWeekly, setCloseWeekly] = useState(false);

  const handleClose = () => {
    if (closeWeekly) {
      weeklyPopupHandler.set();
    } else {
      weeklyPopupHandler.delete();
    }

    setOpen(false);
  };

  useEffect(() => {
    const isClose = weeklyPopupHandler.isSettingClose();
    setOpen(!isClose);
    setCloseWeekly(isClose);
  }, []);

  return (
    <>
      <Tooltip
        title="현재 신입 팀원 모집 중!"
        variant="soft"
        placement="top-end"
        size="lg"
        onClick={() => {
          setOpen(true);
        }}
        sx={{
          background: 'white',
        }}
      >
        <IconButton
          variant="soft"
          color="primary"
          sx={{
            background: '#9023D5',
            color: 'white',
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 10,
            borderRadius: '50%',
            boxShadow:
              'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.15) 0px 8px 30px',
            width: '60px',
            height: '60px',
            ' &:hover': {
              width: '65px',
              height: '65px',
              transition: 'width .1s, height .1s',
              webkitTransition: 'width .1s, height .1s' /* Safari */,
            },
          }}
        >
          <FontAwesomeIcon icon={faBullhorn} style={{ fontSize: '25px' }} />
        </IconButton>
      </Tooltip>

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
            width: '80%',
            maxWidth: '400px',
            minWidth: '300px',
            maxHeight: '80%',
          }}
        >
          <ModalClose variant="plain" />

          <Typography
            textAlign="center"
            level="body-sm"
            sx={{
              position: 'relative',
              margin: '0 -30px 0 -31px',
              padding: '10px 0',
              background: '#590091',
              border: 'none',
              width: '60%',
              color: 'white',

              '&::before': {
                content: "''",
                position: 'absolute',
                borderStyle: 'solid',
                borderColor: 'transparent',
                bottom: '-10px',
                borderWidth: '0 10px 10px 0',
                borderRightColor: '#590091',
                left: 0,
              },
            }}
          >
            ONLY FOR YOU
          </Typography>

          <Stack
            overflow="scroll"
            height="100%"
            justifyContent="space-between"
            gap={2}
          >
            <Stack alignItems="center">
              <Typography level="body-xs" textColor="#59009180">
                {`'여성에게는 여성의 이야기가 필요합니다'`}
              </Typography>
              <Typography
                level="h4"
                textColor="#590091"
                sx={{
                  boxShadow: 'inset 0 -13px 0 #E8D6EB',
                }}
              >
                와카이브 신규 팀원 모집 공고
              </Typography>
            </Stack>
            <Stack>
              <Typography level="body-xs" textColor="black">
                * 별도의 운영비 없이 팀원 개인의 시간을 내어 진행하고 있습니다.
              </Typography>
              <Typography level="body-xs" textColor="black">
                * 여성서사에 관심이 많은 생물학적 여성에 한해 누구나 신청
                가능합니다.
              </Typography>
            </Stack>

            <Stack sx={{ color: 'black' }} gap={2}>
              <Card variant="soft">
                <Stack>
                  <Stack direction="row" gap={0.5} alignItems="center">
                    <FontAwesomeIcon icon={faLaptop} />
                    <Typography fontWeight="bold">개발팀</Typography>
                  </Stack>

                  <Typography level="body-sm">
                    - 와카이브 유지보수 (React)
                  </Typography>
                  <Typography level="body-sm">
                    - 와카이브: PLAY 신규 컨텐츠 개발 (Svelte)
                  </Typography>
                </Stack>
              </Card>
              <Card variant="soft">
                <Stack>
                  <Stack direction="row" gap={0.5} alignItems="center">
                    <FontAwesomeIcon icon={faPenFancy} />
                    <Typography fontWeight="bold">리뷰팀</Typography>
                  </Stack>

                  <Typography level="body-sm">
                    - 와카이브: 아티클 여성서사 리뷰 작성
                  </Typography>
                </Stack>
              </Card>
              <Card variant="soft">
                <Stack>
                  <Stack direction="row" gap={0.5} alignItems="center">
                    <FontAwesomeIcon icon={faBook} />
                    <Typography fontWeight="bold">데이터팀</Typography>
                  </Stack>

                  <Typography level="body-sm">
                    - 여성서사 데이터 수집 및 검수
                  </Typography>
                </Stack>
              </Card>
            </Stack>
            <Stack>
              <Button
                variant="soft"
                onClick={() => {
                  window.open(
                    'https://heavenly-geese-701.notion.site/2bfd3e7b37f84dc6b1c291d94719e976',
                  );
                }}
              >
                모집공고 바로가기
              </Button>
            </Stack>
          </Stack>

          <Checkbox
            checked={closeWeekly}
            onChange={(e) => {
              setCloseWeekly(e.target.checked);
            }}
            variant="soft"
            size="sm"
            sx={{
              position: 'absolute',
              left: '5px',
              bottom: '-25px',
              color: 'white',
            }}
            label="일주일 동안 보지 않기"
          />
        </ModalDialog>
      </Modal>
    </>
  );
}
