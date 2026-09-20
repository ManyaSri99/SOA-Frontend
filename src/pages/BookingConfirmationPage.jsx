import { Link } from 'react-router-dom';

const BookingConfirmationPage = () => (
  <div className="page-shell">
    <div className="card" style={{ padding: '28px', textAlign: 'center' }}>
      <h2>Booking confirmed</h2>
      <p>Your stay has been reserved successfully. A confirmation has been sent to your email.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
        <Link className="btn btn-primary" to="/my-bookings">View bookings</Link>
        <Link className="btn btn-light" to="/">Back home</Link>
      </div>
    </div>
  </div>
);

export default BookingConfirmationPage;
