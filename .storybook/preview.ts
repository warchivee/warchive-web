import type { Preview } from '@storybook/react';
import '@styles/index.scss'; // 스타일 적용을 위해 global css 를 import 한다.

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
