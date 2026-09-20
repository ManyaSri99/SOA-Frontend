const PaymentStatus = ({ status }) => {
  const normalized = String(status || 'PENDING').toUpperCase();
  return <span className={`payment-status ${normalized.toLowerCase()}`}>{normalized}</span>;
};

export default PaymentStatus;
