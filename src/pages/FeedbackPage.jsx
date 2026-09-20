import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const defaultForm = {
  overallExperience: 5,
  roomService: 5,
  cleanliness: 5,
  staffSupport: 5,
  recommend: 'Yes',
  comments: ''
};

const FeedbackPage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);

  const customerName = useMemo(() => user?.name || 'Customer', [user]);
  const customerEmail = useMemo(() => user?.email || 'customer@example.com', [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const feedback = {
      id: Date.now().toString(),
      customerName,
      customerEmail,
      overallExperience: Number(form.overallExperience),
      roomService: Number(form.roomService),
      cleanliness: Number(form.cleanliness),
      staffSupport: Number(form.staffSupport),
      recommend: form.recommend,
      comments: form.comments.trim(),
      createdAt: new Date().toISOString(),
    };

    const previousFeedback = (() => {
      try {
        return JSON.parse(localStorage.getItem('grandvista_customer_feedback') || '[]');
      } catch {
        return [];
      }
    })();

    const nextFeedback = [feedback, ...previousFeedback];
    localStorage.setItem('grandvista_customer_feedback', JSON.stringify(nextFeedback));
    setSubmitted(true);
    setForm(defaultForm);
  };

  return (
    <div className="page-shell">
      <div className="card" style={{ maxWidth: '900px', margin: '0 auto', padding: '28px' }}>
        <div style={{ marginBottom: '20px' }}>
          <span className="eyebrow eyebrow-dark">Customer feedback</span>
          <h2 style={{ margin: '12px 0 8px', fontSize: '2rem' }}>Share your stay experience</h2>
          <p style={{ margin: 0, color: '#475569' }}>
            Help us improve your stay by sharing your feedback about your room, service, cleanliness and support.
          </p>
        </div>

        {submitted ? (
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '14px', padding: '18px', marginBottom: '18px', color: '#065f46' }}>
            Thank you, {customerName}. Your feedback has been submitted successfully.
          </div>
        ) : null}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Customer name</label>
              <input value={customerName} readOnly style={fieldStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Email</label>
              <input value={customerEmail} readOnly style={fieldStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Overall stay experience</label>
              <select name="overallExperience" value={form.overallExperience} onChange={handleChange} style={fieldStyle}>
                {[5, 4, 3, 2, 1].map((score) => (
                  <option key={score} value={score}>{score} / 5</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Room service quality</label>
              <select name="roomService" value={form.roomService} onChange={handleChange} style={fieldStyle}>
                {[5, 4, 3, 2, 1].map((score) => (
                  <option key={score} value={score}>{score} / 5</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Cleanliness</label>
              <select name="cleanliness" value={form.cleanliness} onChange={handleChange} style={fieldStyle}>
                {[5, 4, 3, 2, 1].map((score) => (
                  <option key={score} value={score}>{score} / 5</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Staff support</label>
              <select name="staffSupport" value={form.staffSupport} onChange={handleChange} style={fieldStyle}>
                {[5, 4, 3, 2, 1].map((score) => (
                  <option key={score} value={score}>{score} / 5</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Would you recommend this stay?</label>
            <select name="recommend" value={form.recommend} onChange={handleChange} style={fieldStyle}>
              <option value="Yes">Yes</option>
              <option value="Maybe">Maybe</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Additional comments</label>
            <textarea
              name="comments"
              value={form.comments}
              onChange={handleChange}
              placeholder="Tell us what we did well and what we can improve."
              rows={6}
              style={{ ...fieldStyle, resize: 'vertical', minHeight: '140px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary">Submit feedback</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const fieldStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid #dbeafe',
  background: '#f8fafc',
  color: '#0f172a',
  fontSize: '0.98rem'
};

export default FeedbackPage;
