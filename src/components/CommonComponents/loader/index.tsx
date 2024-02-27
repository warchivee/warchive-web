export default function Loader() {
  return (
    <div>
      <div className="loader" />
    </div>
  );
}

export function PageLoader() {
  return (
    <div
      style={{
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="loader" />
    </div>
  );
}

export function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={`loading-overlay ${isLoading ? 'visible' : ''}`}>
      <div className="loader" />
    </div>
  );
}
