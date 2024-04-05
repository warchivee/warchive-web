import { Button, Card, IconButton, Stack, Tooltip, Typography } from '@mui/joy';
import CopyToClipboard from 'react-copy-to-clipboard';
import useCollection from 'src/hooks/useCollections';
import kakaotalk_logo from '@assets/logos/kakaotalk.png';
import twitter_logo from '@assets/logos/twitter.png';
import facebook_logo from '@assets/logos/facebook.png';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import useSnackbar from 'src/hooks/useSnackbar';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export default function ShareCollectionButtons() {
  const { getCollection } = useCollection();
  const popupRef = useRef<HTMLDivElement>(null);
  const [openInfo, setOpenInfo] = useState(false);
  const [openSnackbar] = useSnackbar();

  const shareUrlBase = window.location.href;

  const { title } = getCollection();
  const description = getCollection().note;
  const url = `${shareUrlBase}/${getCollection()?.shared_id}`;

  const imageSize = {
    width: '28px',
    height: '28px',
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef?.current?.contains(event.target as Node)
    ) {
      setOpenInfo(false);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.body.removeChild(script);

      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tooltip
      arrow
      open={openInfo}
      variant="outlined"
      placement="bottom-start"
      sx={{ background: 'white' }}
      title={
        <Card variant="plain" sx={{ background: 'white' }} ref={popupRef}>
          <Stack gap={2}>
            <Typography level="body-md" fontWeight="bolder">
              공유하기
            </Typography>
            <Stack flexDirection="row" gap={1.5}>
              <Stack>
                <IconButton
                  onClick={() => {
                    if (window.Kakao) {
                      const kakao = window.Kakao;

                      if (!kakao.isInitialized()) {
                        kakao.init(import.meta.env.VITE_KAKAO_KEY);
                      }

                      kakao.Link.sendDefault({
                        objectType: 'feed',
                        content: {
                          title,
                          description,
                          imageUrl: '이미지 url',
                          link: {
                            mobileWebUrl: url,
                            webUrl: url,
                          },
                        },
                        buttons: [
                          {
                            title: 'title',
                            link: {
                              mobileWebUrl: url,
                              webUrl: url,
                            },
                          },
                        ],
                      });
                    }
                  }}
                >
                  <img
                    src={kakaotalk_logo}
                    alt="카카오톡으로 공유하기"
                    style={imageSize}
                  />
                </IconButton>
                <Typography level="body-xs">카카오톡</Typography>
              </Stack>

              <Stack>
                <IconButton
                  onClick={() => {
                    const sendText = `와카이브 - ${getCollection().title}`;
                    window.open(
                      `https://twitter.com/intent/tweet?text=${sendText}&hashtags=와카이브,와카이브컬렉션,여성서사&url=${url}`,
                    );
                  }}
                >
                  <img
                    src={twitter_logo}
                    alt="트위터로 공유하기"
                    style={imageSize}
                  />
                </IconButton>
                <Typography level="body-xs">트위터</Typography>
              </Stack>

              <Stack>
                <IconButton
                  onClick={() => {
                    window.open(
                      `http://www.facebook.com/sharer/sharer.php?u=${url}`,
                    );
                  }}
                >
                  <img
                    src={facebook_logo}
                    alt="페이스북으로 공유하기"
                    style={imageSize}
                  />
                </IconButton>
                <Typography level="body-xs">페이스북</Typography>
              </Stack>

              <Stack>
                <CopyToClipboard
                  text={url}
                  onCopy={() => {
                    openSnackbar({
                      message:
                        '공유 링크가 복사되었습니다! 원하는 곳에 공유해보세요.',
                    });
                  }}
                >
                  <IconButton>
                    <FontAwesomeIcon
                      icon={faLink}
                      style={{
                        background: '#F0F0F0',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        padding: '6px',
                      }}
                    />
                  </IconButton>
                </CopyToClipboard>
                <Typography level="body-xs">링크복사</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      }
    >
      <Button
        variant="soft"
        size="sm"
        sx={{
          width: 'max-content',
          background: '#F0F0F0',
          color: '#020202',
          gap: '0.5rem',
          borderRadius: '20px',
        }}
        onClick={() => {
          setOpenInfo(!openInfo);
        }}
      >
        <FontAwesomeIcon icon={faShareNodes} />
        <Typography level="body-xs" textColor="black">
          나만 보기 아까운 작품이 있다면?
        </Typography>
      </Button>
    </Tooltip>
  );
}
