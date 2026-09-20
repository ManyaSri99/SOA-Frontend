const DemandAlert = ({ type, message }) => (
  <div className={`alert-banner ${type || 'info'}`}>
    <strong>{type || 'Info'}</strong>
    <span>{message}</span>
  </div>
);

export default DemandAlert;
