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

const ManagerFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const storedFeedback = (() => {
      try {
        return JSON.parse(localStorage.getItem('grandvista_customer_feedback') || '[]');
      } catch {
        return [];
      }
    })();

    setFeedbacks(Array.isArray(storedFeedback) ? storedFeedback : []);
  }, []);

  return (
    <div className="dashboard-shell">
      <Sidebar items={managerItems} />
      <div className="page-shell">
        <div className="card" style={{ padding: '22px' }}>
          <h2>Customer feedback</h2>
          {feedbacks.length ? (
            feedbacks.map((feedback) => (
              <div key={feedback.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '14px', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <strong>{feedback.customerName || 'Customer'}</strong>
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '10px', color: '#334155', fontSize: '0.92rem' }}>
                  <span>Overall: {feedback.overallExperience || 0}/5</span>
                  <span>Room service: {feedback.roomService || 0}/5</span>
                  <span>Cleanliness: {feedback.cleanliness || 0}/5</span>
                  <span>Support: {feedback.staffSupport || 0}/5</span>
                  <span>Recommend: {feedback.recommend || 'N/A'}</span>
                </div>

                <p style={{ marginTop: '12px', marginBottom: 0, color: '#0f172a' }}>
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

export default ManagerFeedbackPage;
