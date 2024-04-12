// joy components
import { Box, Grid, Stack, Typography } from '@mui/joy';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import useModal from 'src/hooks/useModal';
import { unlinkKakao } from 'src/services/kakao.api';
import userUtil from '@utils/user.util';

export default function Footer() {
  const [openWithdrawalModal] = useModal();

  return (
    <footer style={{ zIndex: 1, position: 'relative', marginTop: '2rem' }}>
      <Box sx={{ background: '#170c1e' }} padding="2rem 1rem">
        <Grid
          container
          maxWidth="1000px"
          margin="0 auto"
          justifyContent="space-between"
          alignItems="flex-end"
          gap={3}
        >
          <Grid>
            <Stack gap={1}>
              <Typography level="body-sm" textColor="text.tertiary">
                팀 와카이브
              </Typography>
              <Typography level="body-xs" textColor="text.tertiary">
                team.warchive@gmail.com
              </Typography>
              <a
                href="https://womynarchive.notion.site/ae89f36ef66b498a80e5b5dca798cc9a?pvs=4"
                target="_blank"
                rel="noreferrer"
              >
                <Typography level="body-xs" textColor="text.tertiary">
                  와카이브 팀원 소개 페이지 바로가기
                </Typography>
              </a>

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
                <Link to="/service">
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

                {!userUtil.isAdmin() && (
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
                후원계좌
              </Typography>
              <Typography level="body-xs" textColor="text.tertiary">
                신한은행 110-428-228720 ㅇㅈㅇ
              </Typography>
            </Stack>

            <Stack gap={1}>
              <Typography level="body-sm" textColor="text.tertiary">
                와카이브의 다른 프로젝트
              </Typography>
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
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
}
