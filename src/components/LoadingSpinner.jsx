const LoadingSpinner = ({ label = 'Loading...' }) => (
  <div className="loading-shell">
    <div className="spinner" aria-label="Loading" />
    <span>{label}</span>
  </div>
);

export default LoadingSpinner;
