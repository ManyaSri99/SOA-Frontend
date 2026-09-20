import { useState } from 'react';
import { paymentService } from '../services/paymentService';
import ErrorMessage from '../components/ErrorMessage';
import PaymentStatus from '../components/PaymentStatus';

const PaymentPage = () => {
  const [form, setForm] = useState({ bookingId: '', amount: 4200, method: 'CARD' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handlePay = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await paymentService.createPayment({ ...form, amount: Number(form.amount) });
      setResult(response);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="card" style={{ padding: '24px' }}>
        <h2>Payment</h2>
        <ErrorMessage message={error} />
        <form className="auth-form" onSubmit={handlePay}>
          <label>
            Booking ID
            <input type="text" name="bookingId" value={form.bookingId} onChange={handleChange} required />
          </label>
          <label>
            Amount
            <input type="number" name="amount" value={form.amount} onChange={handleChange} required />
          </label>
          <label>
            Method
            <select name="method" value={form.method} onChange={handleChange}>
              <option value="CARD">Card</option>
              <option value="UPI">UPI</option>
              <option value="NETBANKING">Net Banking</option>
            </select>
          </label>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Pay now'}
          </button>
        </form>
      </div>

      {result ? (
        <div className="card" style={{ padding: '24px' }}>
          <h3>Payment status</h3>
          <PaymentStatus status={result.status || 'PENDING'} />
          <p>Transaction ID: {result.transactionId || result.id}</p>
        </div>
      ) : null}
    </div>
  );
};

export default PaymentPage;
