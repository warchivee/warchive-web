/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, IconButton, Stack, Typography } from '@mui/joy';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Banner, getBannerApi } from 'src/services/banner.api';

function calculatePercentage(part: number, whole: number) {
  return (part / whole) * 100;
}

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
  const [banners, setBanners] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchBanners = async () => {
      const data = await getBannerApi();

      const pickRandom = (arr: Banner[], count: number) =>
        arr.sort(() => Math.random() - 0.5).slice(0, count);

      const selected = [
        ...pickRandom(
          data.filter((b) => b.type === 'PLAY'),
          3,
        ),
        ...pickRandom(
          data.filter((b) => ['INTERVIEW', 'REVIEW'].includes(b.type)),
          3,
        ),
      ];

      setBanners(selected);
    };

    fetchBanners();
  }, []); // 빈 배열: 최초 마운트 시 1회만 호출

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
        {banners?.map((item: Banner) => {
          const textAlign = item.style === 'MOCK' ? 'right' : 'left';
          return (
            <div key={`banner-${item.title}`}>
              <Stack
                height="150px"
                direction={item.style === 'MOCK' ? 'row-reverse' : 'row'}
                justifyContent="space-between"
                position="relative"
                onClick={() => {
                  window.open(item.url);
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
                      textShadow: `-1px 0px 10px ${item.text_color}
                    , 0px 1px 10px #${item.bg_end_color}
                    , 1px 0px 10px #${item.bg_end_color}
                    , 0px -1px 10px #${item.bg_end_color}`,
                      padding: '0 1.5rem',
                    },
                  }}
                >
                  {item?.sub_title && (
                    <Typography
                      level="body-xs"
                      fontWeight="400"
                      textColor={item.text_color}
                      textAlign={textAlign}
                      sx={{
                        wordBreak: 'keep-all',
                      }}
                    >
                      {item.sub_title}
                    </Typography>
                  )}

                  <Stack>
                    {item.title?.split('\n')?.map((titleText, i: number) => (
                      <Typography
                        lineHeight={1.2}
                        key={`banner-title-${i + 1}`}
                        level="body-lg"
                        fontWeight="bolder"
                        textColor={item.text_color}
                        textAlign={textAlign}
                        sx={{
                          wordBreak: 'keep-all',
                        }}
                      >
                        {titleText}
                      </Typography>
                    ))}
                  </Stack>

                  {item?.intro && (
                    <Typography
                      className={!item.intro ? `hidden` : ''}
                      level="body-xs"
                      fontWeight="400"
                      textColor={item.text_color}
                      textAlign={textAlign}
                      sx={{
                        wordBreak: 'keep-all',
                        '@media(max-width: 400px)': {
                          '&.hidden': {
                            display: 'none',
                          },
                        },
                      }}
                    >
                      {item.intro}
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
                    background: `linear-gradient(
                    90deg, #${item.bg_start_color} 0%, #${item.bg_start_color} 50%, #${item.bg_end_color} 100%) ${item.style === 'BLEND' ? `, url(${item.image})` : ''}`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right',
                    '@media (max-width: 600px)': {
                      background: `linear-gradient(90deg, #${item.bg_start_color} 0%, #${item.bg_end_color} 100%) ${item.style === 'BLEND' ? `, url(${item.image})` : ''}`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '0% center',
                      backgroundSize: 'cover',
                    },
                  }}
                />

                {/* eslint-disable-next-line no-nested-ternary */}
                {item.style === 'MOCK' ? (
                  <Box
                    width="100%"
                    height="180px"
                    zIndex="3"
                    position="absolute"
                    top="-30px"
                    sx={{
                      background: `url(${item.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      '@media (max-width: 600px)': {
                        height: '150px',
                        top: '-5px',
                        left: '-20px',
                      },
                    }}
                  />
                ) : item.style === 'NORMAL' ? (
                  <Box
                    width="100%"
                    height="100%"
                    minWidth="300px"
                    zIndex="3"
                    position="absolute"
                    sx={{
                      background: `url(${item.image})`,
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
          );
        })}
      </Slider>
    </Box>
  );
}
