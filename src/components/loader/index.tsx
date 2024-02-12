export default function Loader() {
  return (
    <div>
      <span className="loader" />
    </div>
  );
}

export function PageLoader() {
  return (
    <div
      style={{
        width: '100%',
        padding: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span className="loader" />
    </div>
  );
}
