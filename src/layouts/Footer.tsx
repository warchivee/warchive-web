import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Stack, Typography } from '@mui/joy';

export default function Footer({ mobile = false }: { mobile?: boolean }) {
  const rightContentAlign = mobile ? 'flex-start' : 'flex-end';

  return (
    <footer>
      <div className="content">
        <Stack
          width="100%"
          direction={mobile ? 'column' : 'row'}
          justifyContent="space-between"
          gap={2}
        >
          <Stack justifyContent="space-between" gap={2}>
            <Stack gap={0.3}>
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
            </Stack>

            <Stack gap={0.3}>
              <Typography level="body-sm" textColor="text.tertiary">
                후원계좌
              </Typography>
              <Typography level="body-xs" textColor="text.tertiary">
                신한은행 110-428-228720 ㅇㅈㅇ
              </Typography>
            </Stack>
          </Stack>
          <Stack
            alignItems={rightContentAlign}
            justifyContent="space-between"
            gap={1}
          >
            <Stack alignItems={rightContentAlign}>
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

              <Stack
                marginTop={1}
                alignItems="flex-end"
                direction="row"
                gap={2}
              >
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
            </Stack>
            <Stack direction="row" gap={1} alignItems="flex-end">
              <Typography level="body-xs" textColor="text.tertiary">
                이용약관
              </Typography>
              <Typography level="body-xs" textColor="text.tertiary">
                |
              </Typography>
              <Typography level="body-xs" textColor="text.tertiary">
                개인정보처리방침
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </footer>
  );
}
