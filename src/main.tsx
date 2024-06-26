import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

import App from './App';

// React.StrictMode => 2번 렌더링 원인. 프로덕트 단에서는 1번만 된다고 하는데...

const queryClient = new QueryClient();

const warchiveTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        text: {
          tertiary: '#A29EA5',
        },
        primary: {
          plainBg: 'transparent',
          plainActiveBg: 'transparent',
          plainHoverBg: undefined,
          plainActiveColor: undefined,
          plainHoverColor: undefined,
          plainColor: '#b169dd',

          outlinedBorder: '#b169dd',
          outlinedBg: 'transparent',
          outlinedColor: '#b169dd',
          outlinedHoverBg: undefined,
          outlinedActiveBorder: '#b169dd',
          outlinedActiveBg: 'transparent',
          outlinedActiveColor: '#b169dd',

          softBorder: undefined,
          softBg: '#EBDBF3',
          softColor: '#590091',
          softHoverBg: undefined,
          softActiveBorder: undefined,
          softActiveBg: undefined,
          softActiveColor: undefined,

          solidBg: '#590091',
          solidHoverBg: undefined,
          solidActiveBg: undefined,
        },
        neutral: {
          plainBg: 'transparent',
          plainActiveBg: 'transparent',
          plainHoverBg: 'transparent',
          plainActiveColor: undefined,
          plainHoverColor: undefined,
          plainColor: '#a29ea5',

          softBorder: undefined,
          softBg: '#F0F0F0',
          softColor: '#020202',
          softHoverBg: undefined,
          softActiveBorder: undefined,
          softActiveBg: undefined,
          softActiveColor: undefined,

          outlinedBorder: 'white',
          outlinedBg: 'white',
          outlinedColor: 'white',
          outlinedHoverBg: 'rgba(255, 255, 255, 0.2)',
          outlinedHoverBorder: undefined,
          outlinedActiveBorder: undefined,
          outlinedActiveBg: 'transparent',
          outlinedActiveColor: undefined,
        },
      },
    },
  },
  fontFamily: {
    body: 'var(--font-content)',
    display: 'var(--font-content)',
    code: 'var(--font-content)',
    fallback: 'var(--font-content)',
  },
  typography: {
    'body-sm': {
      fontWeight: 500,
    },
  },
  focus: {
    default: {
      border: 'none',
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          transition: 'initial',
          borderRadius: '4px',
          fontWeight: 600,
          ...(ownerState.size === 'md' && {
            minHeight: '36px',
            fontSize: '14px',
            paddingInline: '18px',
          }),
        }),
      },
    },
    JoyModal: {
      styleOverrides: {
        root: () => ({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          WebkitBackdropFilter: 'blur(0)',
          backdropFilter: 'blur(0)',
        }),
      },
    },
    JoyTextarea: {
      styleOverrides: {
        root: () => ({
          '--Textarea-focusedInset': 'none',
          '--Textarea-focusedThickness': 'none',
          '--Textarea-focusedHighlight': 'none',
          '&:focus-within': {
            border: 'none',
          },
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: () => ({
          '--Input-focusedInset': 'none',
          '--Input-focusedThickness': 'none',
          '--Input-focusedHighlight': 'none',
        }),
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <CssVarsProvider theme={warchiveTheme}>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </CssVarsProvider>,
  // </React.StrictMode>,
);
