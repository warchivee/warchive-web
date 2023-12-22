// className 으로 스타일을 적용할 수 없는 컴포넌트를 위한 color record (svg 등)

export type ColorType =
  | 'black'
  | 'white'
  | 'gray'
  | 'ebony'
  | 'french-lilac'
  | 'alabaster'
  | 'sunglow'
  | 'blue-violet'
  | 'lavender'
  | 'purple'
  | 'vivid-violet'
  | 'selago';

export const ColorCodes: Record<ColorType, string> = {
  black: '#020202',
  white: '#ffffff',
  gray: '##A29EA5',
  ebony: '#170c1e',
  'french-lilac': '#ebdbf3',
  alabaster: '#fbfbfb',
  sunglow: '#ffcd27',
  'blue-violet': '#9023d5',
  lavender: '#b169dd',
  purple: '#590091',
  'vivid-violet': '#783b99',
  selago: '#efe0fd',
};
