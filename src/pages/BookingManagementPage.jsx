import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const managerItems = [
  { to: '/manager/dashboard', label: 'Overview' },
  { to: '/manager/rooms', label: 'Manage Rooms' },
  { to: '/manager/availability', label: 'Availability' },
  { to: '/manager/pricing', label: 'Pricing' },
  { to: '/manager/bookings', label: 'Bookings' },
  { to: '/manager/feedback', label: 'Feedback' },
  { to: '/manager/revenue', label: 'Revenue' },
  { to: '/manager/alerts', label: 'Alerts' },
];

const BookingManagementPage = () => {
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    try {
      const storedBookings = JSON.parse(localStorage.getItem('grandvista_bookings') || '[]');
      const storedFeedback = JSON.parse(localStorage.getItem('grandvista_customer_feedback') || '[]');
      setBookings(Array.isArray(storedBookings) ? storedBookings : []);
      setFeedbacks(Array.isArray(storedFeedback) ? storedFeedback : []);
    } catch {
      setBookings([]);
      setFeedbacks([]);
    }
  }, []);

  return (
    <div className="dashboard-shell">
      <Sidebar items={managerItems} />
      <div className="page-shell">
        <div className="card" style={{ padding: '22px' }}>
          <h2>Booking management</h2>
          {bookings.length ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                  <th>Guest</th>
                  <th>Stay</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id || booking.bookingId}>
                    <td>{booking.customerName || 'Guest'}</td>
                    <td>{booking.durationHours || 4} hours</td>
                    <td>{booking.status || 'PENDING'}</td>
                    <td>₹{Number(booking.totalAmount || booking.price || 0).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No bookings available yet.</p>
          )}
        </div>

        <div className="card" style={{ padding: '22px', marginTop: '20px' }}>
          <h3>Submitted customer feedback</h3>
          {feedbacks.length ? (
            feedbacks.map((feedback) => (
              <div key={feedback.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 16px', marginTop: '12px', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <strong>{feedback.customerName || 'Customer'}</strong>
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px', color: '#334155' }}>
                  <span>Overall: {feedback.overallExperience || 0}/5</span>
                  <span>Room service: {feedback.roomService || 0}/5</span>
                  <span>Cleanliness: {feedback.cleanliness || 0}/5</span>
                  <span>Support: {feedback.staffSupport || 0}/5</span>
                </div>
                <p style={{ marginTop: '10px', marginBottom: 0, color: '#0f172a' }}>
                  {feedback.comments || 'No additional comments provided.'}
                </p>
              </div>
            ))
          ) : (
            <p>No customer feedback submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManagementPage;
