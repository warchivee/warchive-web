/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, IconButton, Stack, Typography } from '@mui/joy';

import Banner from '@assets/banner/bookclub.png';

import BannerPlay1 from '@assets/banner/mbti.png';
import BannerPlay2 from '@assets/banner/test.png';

import BannerReview1 from '@assets/banner/telegram.png';
import BannerReview2 from '@assets/banner/crazy.png';
import BannerReview3 from '@assets/banner/radish.png';

import BannerRecruit from '@assets/banner/구인.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function calculatePercentage(part: number, whole: number) {
  return (part / whole) * 100;
}

const banners = [
  {
    title: '익명의 독서모임, 와카이브 북클럽 OPEN',
    description:
      '독서 모임은 부담스럽고, 블로그 개설은 귀찮지만 감상은 나누고 싶은 당신을 위해',
    backgroundStartColor: '#D737C8',
    backgroundEndColor: '#BC28AE33',
    textBackgroundColor: '#D737C8',
    color: 'white',
    src: Banner,
    href: 'https://article.womynarchive.com/bookclub',
  },
  {
    title: '제 1회 여성서사 고인물 모의고사, 난 몇 등급일까?',
    description:
      '여성서사를 사랑하는 당신! 내 사랑을 한 번 확인해볼까요? 와카이브 공식 인증서로 당당한 고인물이 되어보세요.',
    backgroundStartColor: '#60492E',
    backgroundEndColor: '#E2DBD5A6',
    textBackgroundColor: '#60492E',
    color: 'white',
    src: BannerPlay2,
    href: 'https://play.womynarchive.com/master-mock-exam',
  },
  {
    title: '여성서사 주인공 성향 테스트',
    description: '내가 여성서사 작품에 들어간다면 누구일까?',
    backgroundStartColor: '#170C1E',
    backgroundEndColor: '#666666A6',
    textBackgroundColor: '#170C1E',
    color: 'white',
    src: BannerPlay1,
    href: 'https://play.womynarchive.com/womyn-character-test',
  },
  {
    subject: '와카이브 아티클: RADish  8호',
    title: '세계 최전선의 래디컬 페미니즘 잡지, <RADish> 8호',
    description: '지금 이 순간, 우리에게 필요한 담론을 가장 날카롭게 제시하다!',
    backgroundStartColor: '#53A751',
    backgroundEndColor: '#53A751',
    textBackgroundColor: '#53A751',
    color: 'white',
    src: BannerReview3,
    href: 'https://article.womynarchive.com/review/radish-no8/',
    type: 'review',
  },
  {
    subject: '와카이브 아티클: 미쳐있고 괴상하며 오만하고 똑똑한 여자들',
    title: '자기 삶의 저자인 여자는 웬만큼 다 미쳐 있다',
    description: '질병과 낙인 너머, 여성 우울에 관한 가장 치열하고 다정한 탐구',
    backgroundStartColor: '#379FBF',
    backgroundEndColor: '#379FBF',
    textBackgroundColor: '#379FBF',
    color: 'white',
    src: BannerReview2,
    type: 'review',
    href: 'https://article.womynarchive.com/review/ceai-womyn/',
  },
  {
    subject: '와카이브 아티클: 나 잡으려고 텔레그램 가입했어?',
    title: '아직, 디지털 성범죄는 끝나지 않았다\n: 추적단 불꽃 2년 간의 추적기',
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
                    className={item?.type === 'review' ? `review` : ''}
                    level="body-xs"
                    fontWeight="400"
                    textColor={item.color}
                    textAlign={item?.type === 'review' ? 'right' : 'left'}
                    sx={{
                      wordBreak: 'keep-all',
                      '@media(max-width: 400px)': {
                        '&.review': {
                          display: 'none',
                        },
                      },
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
