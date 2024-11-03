// joy components
import { Box, Button, Grid, Stack, Typography } from '@mui/joy';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import useModal from 'src/hooks/useModal';
import { unlinkKakao } from 'src/services/kakao.api';
import userUtil from '@utils/user.util';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const [openWithdrawalModal] = useModal();
  return (
    <footer style={{ zIndex: 1, position: 'relative' }}>
      <Box sx={{ background: '#170c1e' }} padding="2rem 1rem">
        <Grid
          container
          maxWidth="1000px"
          margin="0 auto"
          justifyContent="space-between"
          gap={3}
        >
          <Grid>
            <Stack gap={1}>
              <Stack gap={1}>
                <Typography level="body-sm" textColor="text.tertiary">
                  팀 와카이브
                </Typography>
                <Stack>
                  <Typography level="body-xs" textColor="text.tertiary">
                    team.warchive@gmail.com
                  </Typography>
                  <a
                    href="https://heavenly-geese-701.notion.site/6a78f7624f1d47e1b8edbc4030b18a1f?pvs=4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Typography level="body-xs" textColor="text.tertiary">
                      와카이브 팀원 소개 페이지 바로가기
                    </Typography>
                  </a>
                </Stack>
              </Stack>

              <Stack direction="row" gap={2}>
                <a
                  href="https://twitter.com/Womynarchive"
                  target="_blank"
                  aria-label="트위터로 이동"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    style={{ color: '#A29EA5' }}
                    icon={faXTwitter}
                  />
                </a>
                <a
                  href="https://www.instagram.com/womynarchive/"
                  target="_blank"
                  aria-label="인스타그램으로 이동"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    style={{ color: '#A29EA5' }}
                    icon={faInstagram}
                  />
                </a>
              </Stack>

              <Stack direction="row" gap={1}>
                <Link to="/terms">
                  <Typography level="body-xs" textColor="text.tertiary">
                    이용약관
                  </Typography>
                </Link>

                <Typography level="body-xs" textColor="text.tertiary">
                  |
                </Typography>

                <Link to="/privacy">
                  <Typography level="body-xs" textColor="text.tertiary">
                    개인정보처리방침
                  </Typography>
                </Link>

                {userUtil.exist() && (
                  <>
                    <Typography level="body-xs" textColor="text.tertiary">
                      |
                    </Typography>
                    <Typography
                      level="body-xs"
                      textColor="text.tertiary"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        openWithdrawalModal({
                          title: '탈퇴하기',
                          message:
                            '탈퇴하시겠습니까?\n탈퇴 시 모든 정보가 즉시 삭제됩니다.',
                          onConfirm: async () => {
                            await unlinkKakao();
                          },
                          confirmTitle: '탈퇴하기',
                        });
                      }}
                    >
                      회원탈퇴
                    </Typography>
                  </>
                )}
              </Stack>
            </Stack>
          </Grid>

          <Grid display="flex" flexDirection="column" gap={3}>
            <Stack gap={1}>
              <Typography level="body-sm" textColor="text.tertiary">
                와카이브의 다른 프로젝트
              </Typography>
              <Stack>
                <a
                  href="https://article.womynarchive.com/"
                  target="_blank"
                  aria-label="와카이브-아티클로 이동"
                  rel="noreferrer"
                >
                  <Typography level="body-xs" textColor="text.tertiary">
                    Warchive: article
                  </Typography>
                </a>
              </Stack>
            </Stack>

            <Button
              color="primary"
              variant="soft"
              sx={{ borderRadius: '20px', gap: '5px' }}
              onClick={() => {
                window.open('https://buymeacoffee.com/warchive');
              }}
            >
              <FontAwesomeIcon icon={faCoffee} />
              와카이브 운영진에게 커피 사주기
            </Button>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
}
