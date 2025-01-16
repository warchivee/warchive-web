/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, IconButton, Stack, Typography } from '@mui/joy';

import Banner from '@assets/banner/RiU.png';

import BannerPlay1 from '@assets/banner/award.png';
import BannerPlay2 from '@assets/banner/nomorecorset.png';
import BannerPlay3 from '@assets/banner/worldcup.png';

import BannerReview1 from '@assets/banner/indefenceofwitches.png';
import BannerReview2 from '@assets/banner/bluecollarwomen.png';

import BannerRecruit from '@assets/banner/구인.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function calculatePercentage(part: number, whole: number) {
  return (part / whole) * 100;
}

const bannerStyle: Record<string, any> = {
  normal: {
    direction: 'row',
    textAlign: 'left',
    description: true,
    bgGradient: true,
    imgType: 'gradientImg',
  },
  normalFlat: {
    direction: 'row',
    textAlign: 'left',
    description: true,
    bgGradient: false,
    imgType: 'img',
  },
  normalReview: {
    direction: 'row',
    textAlign: 'left',
    description: false,
    bgGradient: true,
    imgType: 'gradientImg',
  },
  review: {
    direction: 'row-reverse',
    textAlign: 'right',
    description: false,
    bgGradient: false,
    imgType: 'mock',
  },
};

/**
 * Type 설명
 * 일반 배너 : mormal (그라데이션 배경에 글이 왼쪽에 있는 배너)
 * 단색 배경에 일반 배너 : normalFLat (단색 배경에 글이 왼쪽에 있는 배너)
 * 리뷰 배너 : review (책 목업 이미지가 왼쪽에 있는 단색 배경의 배너)
 * 리뷰 배너인데 일반 배너와 형태가 같음 : normalReview (리뷰인데 일반 배너와 같은 형태)
 */
const banners = [
  {
    title: '2024 여성서사 베스트 콤비 어워드 개최!',
    description: '올해 여러분의 마음을 울린 최고의 여성 듀오는 누구인가요?',
    backgroundStartColor: '#DEB500',
    backgroundEndColor: '#DEB500',
    textBackgroundColor: '#DEB500',
    color: 'white',
    src: BannerPlay1,
    href: 'https://play.womynarchive.com/best-duo-award-2024',
    type: 'normalFlat',
  },
  {
    title: '대학 내 래디컬의 계보 기록 프로젝트',
    description:
      '한국 여성주의 운동의 순간이 사라지지 않도록 , 뜨거운 활동의 순간을 보존하다',
    backgroundStartColor: '#482091',
    backgroundEndColor: '#FFFFFF00',
    textBackgroundColor: '#482091',
    color: 'white',
    src: Banner,
    href: 'https://article.womynarchive.com/Radicals-in-University',
    type: 'normal',
  },
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
    type: 'normal',
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
    type: 'normal',
  },
  {
    subject: '와카이브 아티클 : 나, 블루칼라 여자',
    title: '신체적 ‘차이’만 생각해도 되는 블루칼라 현장을 꿈꾸며',
    description: '각자의 자리에서 고군분투하고 있을 여성 노동자들에게',
    backgroundStartColor: '#002178',
    backgroundEndColor: '#002178',
    textBackgroundColor: '#002178',
    color: 'white',
    src: BannerReview2,
    type: 'review',
    href: 'https://article.womynarchive.com/review/blue-collar-women/',
  },
  {
    subject: '와카이브 아티클 : 마녀',
    title: '마녀 : 남들보다 튀는 여자들의 목을 쳐라',
    description:
      '화형의 시대부터 21세기까지, 마녀들의 후손을 위한 페미니즘 바이블',
    backgroundStartColor: '#261E1B',
    backgroundEndColor: '#261E1B',
    textBackgroundColor: '#261E1B',
    color: 'white',
    src: BannerReview1,
    type: 'review',
    href: 'https://article.womynarchive.com/review/in-defence-of-witches/',
  },
  {
    title: 'ONLY FOR YOU\n지금, 와카이브 신규 팀원 모집중',
    backgroundStartColor: '#590091',
    backgroundEndColor: '#D388FF14',
    textBackgroundColor: '#5900914D',
    color: 'white',
    src: BannerRecruit,
    href: 'https://womynarchive.notion.site/75138cd619284d739f16f474d100b81f',
    type: 'normal',
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
              direction={bannerStyle[item.type].direction}
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
                    textAlign={bannerStyle[item.type].textAlign}
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
                      textAlign={bannerStyle[item.type].textAlign}
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
                    className={
                      bannerStyle[item.type].description ? `hidden` : ''
                    }
                    level="body-xs"
                    fontWeight="400"
                    textColor={item.color}
                    textAlign={bannerStyle[item.type].textAlign}
                    sx={{
                      wordBreak: 'keep-all',
                      '@media(max-width: 400px)': {
                        '&.hidden': {
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
                  background: bannerStyle[item.type].bgGradient
                    ? `linear-gradient(90deg, ${item.backgroundStartColor} 0%, ${item.backgroundStartColor} 50%, ${item.backgroundEndColor} 75%,  transparent 100%), url(${item.src})`
                    : `linear-gradient(90deg, ${item.backgroundStartColor} 0%, ${item.backgroundStartColor} 100%)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right',
                  '@media (max-width: 600px)': {
                    background: bannerStyle[item.type].bgGradient
                      ? `linear-gradient(90deg, ${item.backgroundStartColor} 0%,  transparent 100%), url(${item.src})`
                      : `linear-gradient(90deg, ${item.backgroundStartColor} 0%, ${item.backgroundStartColor} 100%)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '0% center',
                    backgroundSize: 'cover',
                  },
                }}
              />

              {/* 배너 그래디언트 방식 아닐 때 이미지 렌더링 */}
              {/* eslint-disable-next-line no-nested-ternary */}
              {bannerStyle[item.type].imgType === 'mock' ? (
                <Box
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
              ) : bannerStyle[item.type].imgType === 'img' ? (
                <Box
                  width="100%"
                  height="100%"
                  minWidth="300px"
                  zIndex="3"
                  position="absolute"
                  sx={{
                    background: `url(${item.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'right',
                  }}
                />
              ) : (
                <Box />
              )}

              {/* 배너 순서 바 */}
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
