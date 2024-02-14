import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import App from './App';

// React.StrictMode => 2번 렌더링 원인. 프로덕트 단에서는 1번만 된다고 하는데...

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />,
  </QueryClientProvider>,
  // </React.StrictMode>,
);
