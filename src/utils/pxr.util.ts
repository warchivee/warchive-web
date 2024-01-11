const baseSize = 16; // 1rem = 16px;

export const pxToRem = (px: number): number => px / baseSize;

export const pxToRemString = (px: number): string => `${pxToRem(px)}rem`;
