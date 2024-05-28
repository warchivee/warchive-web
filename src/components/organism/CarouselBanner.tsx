/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, IconButton, Stack, Typography } from '@mui/joy';

import BannerPlay from '@assets/banner/mbti.png';

import BannerReview1 from '@assets/banner/telegram.png';
import BannerReview2 from '@assets/banner/gugyeong.png';

import BannerInterview1 from '@assets/banner/자유별.png';
import BannerInterview2 from '@assets/banner/여생1.png';

import BannerRecruit from '@assets/banner/구인.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function calculatePercentage(part: number, whole: number) {
  return (part / whole) * 100;
}

const banners = [
  {
    title: '여성서사 주인공 성향 테스트',
    description: '내가 여성서사 작품에 들어간다면 누구일까?',
    backgroundStartColor: '#170C1E',
    backgroundEndColor: '#666666A6',
    textBackgroundColor: '#170C1E',
    color: 'white',
    src: BannerPlay,
    href: 'https://play.womynarchive.com/womyn-character-test',
  },
  {
    subject: '와카이브 아티클 : 나 잡으려고 텔레그램 가입했어?',
    title: '아직 디지털 성범죄는 끝나지 않았다 : 추적단 불꽃, 2년 간의 추적기',
    description: '‘N번방·박사방’  텔레그램 성 착취 사건 이후 5년',
    backgroundStartColor: '#192970',
    backgroundEndColor: '#192970',
    textBackgroundColor: '#192970',
    color: 'white',
    src: BannerReview1,
    href: 'https://article.womynarchive.com/review/telegram/',
    type: 'review',
  },
  {
    subject: '와카이브 아티클 : 구경이',
    title: '“ 솔직히 , 죽여도  되죠? ”',
    description:
      '만약 당신에게 범죄자를 뒤탈 없이 완벽하게 죽일 기회가 온다면?',
    backgroundStartColor: '#CECECE',
    backgroundEndColor: '#CECECE00',
    textBackgroundColor: '#CECECE',
    color: 'black',
    src: BannerReview2,
    href: 'https://article.womynarchive.com/review/inspector-koo/',
  },
  {
    subject: '와카이브 아티클 : 자유별',
    title: '도망친 곳에는 천국이 있었다',
    description: '〈불효녀로 행복하기〉 저자, 자유별 인터뷰를 만나보세요.',
    backgroundStartColor: '#ECEEC9',
    backgroundEndColor: '#D2D7AC33',
    textBackgroundColor: '#ECEEC9',
    color: 'black',
    src: BannerInterview1,
    href: 'https://article.womynarchive.com/interview/jayoobyul/',
  },
  {
    subject: '와카이브 아티클 : 프로젝트 여생',
    title: '정상에서 보자!\n그런데, 정상이 어디 있는데요?',
    description: '프로젝트 여생의 전시 비하인드, 와카이브에서만.',
    backgroundStartColor: '#B0D8AE',
    backgroundEndColor: '#FFFFFF00',
    textBackgroundColor: '#B0D8AE4D',
    color: 'black',
    src: BannerInterview2,
    href: 'https://article.womynarchive.com/interview/yeosaeng/',
  },

  {
    title: 'ONLY FOR YOU\n지금, 와카이브 신규 팀원 모집중',
    backgroundStartColor: '#590091',
    backgroundEndColor: '#D388FF14',
    textBackgroundColor: '#5900914D',
    color: 'white',
    src: BannerRecruit,
    href: 'https://womynarchive.notion.site/75138cd619284d739f16f474d100b81f',
  },
];

function SamplePrevArrow(props: {
  className?: any;
  onClick?: any;
  direction?: any;
}) {
  const { className, onClick, direction } = props;
  return (
    <IconButton
      className={className}
      sx={{
        position: 'absolute',
        background: 'white !important',
        borderRadius: '50%',
        boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.25)',
        right: direction === 'right' ? '-15px !important' : '',
        left: direction === 'left' ? '-15px !important' : '',
        zIndex: '1',
        minHeight: '30px',
        minWidth: '30px',
        top: '48% !important',
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={direction === 'right' ? faAngleRight : faAngleLeft}
        style={{
          color: 'black',
          width: '50%',
          height: '50%',
        }}
      />
    </IconButton>
  );
}

export default function CarouselBanner() {
  const [index, setIndex] = useState(0);
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <SamplePrevArrow direction="right" />,
    prevArrow: <SamplePrevArrow direction="left" />,
  };

  return (
    <Box
      width="100%"
      maxWidth="900px"
      margin="0 auto"
      marginTop="1rem"
      padding="0 1rem"
    >
      <Slider
        {...settings}
        beforeChange={(currentSlide: number, nextSlide: number) =>
          setIndex(nextSlide)
        }
      >
        {banners?.map((item) => (
          <div key={`banner-${item.title}`}>
            <Stack
              height="150px"
              direction={item?.type === 'review' ? 'row-reverse' : 'row'}
              justifyContent="space-between"
              position="relative"
              onClick={() => {
                window.open(item.href);
              }}
              sx={{
                cursor: 'pointer',
              }}
            >
              {/* 레이아웃용 빈 box */}
              <Box />

              {/* 배너 글 */}
              <Stack
                zIndex="4"
                justifyContent="center"
                padding="0 2rem"
                position="absolute"
                height="100%"
                gap={0.5}
                sx={{
                  '@media (max-width: 600px)': {
                    textShadow: `-1px 0px 10px ${item.textBackgroundColor}
                    , 0px 1px 10px ${item.textBackgroundColor}
                    , 1px 0px 10px ${item.textBackgroundColor}
                    , 0px -1px 10px ${item.textBackgroundColor}`,
                    padding: '0 1.5rem',
                  },
                }}
              >
                {item?.subject && (
                  <Typography
                    level="body-xs"
                    fontWeight="400"
                    textColor={item.color}
                    textAlign={item?.type === 'review' ? 'right' : 'left'}
                    sx={{
                      wordBreak: 'keep-all',
                    }}
                  >
                    {item.subject}
                  </Typography>
                )}

                <Stack>
                  {item.title?.split('\n')?.map((titleText, i: number) => (
                    <Typography
                      lineHeight={1.2}
                      key={`banner-title-${i + 1}`}
                      level="body-lg"
                      fontWeight="bolder"
                      textColor={item.color}
                      textAlign={item?.type === 'review' ? 'right' : 'left'}
                      sx={{
                        wordBreak: 'keep-all',
                      }}
                    >
                      {titleText}
                    </Typography>
                  ))}
                </Stack>

                {item?.description && (
                  <Typography
                    level="body-xs"
                    fontWeight="400"
                    textColor={item.color}
                    textAlign={item?.type === 'review' ? 'right' : 'left'}
                    sx={{
                      wordBreak: 'keep-all',
                    }}
                  >
                    {item.description}
                  </Typography>
                )}
              </Stack>
              {/* 배경색 */}
              <Box
                borderRadius="20px"
                width="100%"
                height="100%"
                zIndex="2"
                position="absolute"
                sx={{
                  background: `linear-gradient(90deg, ${item.backgroundStartColor} 30%, ${item.backgroundEndColor} 80%, ${item.backgroundEndColor} 100%)`,
                }}
              />

              {/* 배너 이미지 */}
              {item?.type === 'review' ? (
                <Box
                  width="100%"
                  height="180px"
                  zIndex="3"
                  position="absolute"
                  top="-30px"
                  sx={{
                    background: `url(${item.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    '@media (max-width: 600px)': {
                      width: '100%',
                      height: '150px',
                      top: '-5px',
                      left: '-20px',
                    },
                  }}
                />
              ) : (
                <Box
                  width="380px"
                  height="150px"
                  borderRadius="20px"
                  zIndex="1"
                  sx={{
                    background: `linear-gradient(
                  to left, 
                    rgba(255,255,255,0) 10%, 
                    rgba(255,255,255,0.1) 50%,
                    rgba(255,255,255,0.5) 85%,
                    rgba(255,255,255,1) 100%),
                    url(${item.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    '@media (max-width: 600px)': {
                      marginLeft: '50px',
                      background: `linear-gradient(
                  to left, 
                    rgba(255,255,255,0) 10%, 
                    rgba(255,255,255,0.5) 50%,
                    rgba(255,255,255,1) 100%),
                    url(${item.src})`,
                    },
                  }}
                />
              )}

              <Box
                width="90%"
                height="2px"
                position="absolute"
                sx={{
                  left: 0,
                  right: 0,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  background: `linear-gradient(90deg, rgba(0,0,0,1) ${calculatePercentage(index + 1, banners?.length)}%, rgba(255,255,255,1) ${calculatePercentage(index + 1, banners?.length)}%)`,
                  bottom: '10px',
                  opacity: 0.7,
                  zIndex: 3,
                }}
              />
            </Stack>
          </div>
        ))}
      </Slider>
    </Box>
  );
}
