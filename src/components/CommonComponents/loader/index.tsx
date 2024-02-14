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
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span className="loader" />
    </div>
  );
}
