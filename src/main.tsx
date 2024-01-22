import ReactDOM from 'react-dom/client';
import App from './App';

// React.StrictMode => 2번 렌더링 원인. 프로덕트 단에서는 1번만 된다고 하는데...

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
