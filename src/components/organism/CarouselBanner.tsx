/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, IconButton, Stack, Typography } from '@mui/joy';

import Banner from '@assets/banner/bookclub.png';

import BannerPlay1 from '@assets/banner/carolineandcaroline.png';
import BannerPlay2 from '@assets/banner/nomorecorset.png';
import BannerPlay3 from '@assets/banner/worldcup.png';

import BannerReview1 from '@assets/banner/jeongnyeon.png';
import BannerReview2 from '@assets/banner/unnatural.png';

import BannerRecruit from '@assets/banner/구인.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function calculatePercentage(part: number, whole: number) {
  return (part / whole) * 100;
}

const banners = [
  {
    title: '자유로움을 패션에 담다 : NO MORE CORSET',
    description:
      '탈코 후 옷입기가 고민이라면? 다양한 개성을 담아낸 탈코 룩북이 딱!',
    backgroundStartColor: '#9A7A68',
    backgroundEndColor: '#C7AD9E00',
    textBackgroundColor: '#9A7A68',
    color: 'white',
    src: BannerPlay2,
    href: 'https://nomore-corset.womynarchive.com/',
  },
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
    title: '오싹한 탈출 게임, ‘캐롤린과 캐롤린’ 플레이',
    description: '연구소를 지키는 살인경비로봇들로부터 탈출하라',
    backgroundStartColor: '#031D2A',
    backgroundEndColor: '#06516900',
    textBackgroundColor: '#031D2A',
    color: 'white',
    src: BannerPlay1,
    href: 'https://zep.us/play/D6gb3K',
  },
  {
    title: '2024 여성서사 등장인물 월드컵, 지금 개최!',
    description:
      '고르기 어려운 나의 최애, 당신의 원픽 여성서사 최애캐를 골라보세요',
    backgroundStartColor: '#8BCC00',
    backgroundEndColor: '#BFD7AC00',
    textBackgroundColor: '#5C8001',
    color: 'white',
    src: BannerPlay3,
    href: 'https://play.womynarchive.com/character-worldcup',
  },
  {
    subject: '와카이브 아티클 : 정년이',
    title: '시대를 초월한 기념비적인 여성서사, 정년이',
    description: '2024 년, 다시 펼쳐지는 여성들의 무대',
    backgroundStartColor: '#6B5A3E',
    backgroundEndColor: '#6C5A4200',
    textBackgroundColor: '#6B5A3E',
    color: 'white',
    src: BannerReview1,
    href: 'https://article.womynarchive.com/review/jeongnyeon/',
    type: 'review-movie',
  },
  {
    subject: '와카이브 아티클 : 언내추럴',
    title: '레몬향과 함께 퍼지는 따스한 위로, 언내추럴',
    description: '부조리한 세상을 바꾸어 나가는 올곧은 진심',
    backgroundStartColor: '#FAECAC',
    backgroundEndColor: '#FFFEDF00',
    textBackgroundColor: '#FAECAC',
    color: 'black',
    src: BannerReview2,
    href: 'https://article.womynarchive.com/review/unnatural/',
    type: 'review-movie',
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
                    className={item?.type?.includes('review') ? `review` : ''}
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
                  background:
                    item?.type === 'review'
                      ? `linear-gradient(90deg, ${item.backgroundStartColor} 0%, ${item.backgroundStartColor} 100%)`
                      : `linear-gradient(90deg, ${item.backgroundStartColor} 0%, ${item.backgroundStartColor} 50%, ${item.backgroundEndColor} 75%,  transparent 100%), url(${item.src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right',
                  '@media (max-width: 600px)': {
                    background:
                      item?.type === 'review'
                        ? `linear-gradient(90deg, ${item.backgroundStartColor} 0%, ${item.backgroundStartColor} 100%)`
                        : `linear-gradient(90deg, ${item.backgroundStartColor} 0%,  transparent 100%), url(${item.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '0% center',
                    backgroundSize: 'cover',
                  },
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
                <Box />
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
