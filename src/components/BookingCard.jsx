import { formatCurrency } from '../utils/helpers';

const BookingCard = ({ booking }) => (
  <div className="booking-card">
    <div className="booking-head">
      <div className="booking-summary-text">
        <h4>{booking?.roomName || booking?.room?.name || 'Room Stay'}</h4>
        <p>{booking?.checkInDate || 'Check-in'} → {booking?.checkOutDate || 'Check-out'}</p>
      </div>
      <span className="booking-amount">{formatCurrency(booking?.totalAmount || 0)}</span>
    </div>
    <div className="booking-meta">
      <span className="booking-status">{booking?.status || 'PENDING'}</span>
      <span className="booking-guests">{booking?.guests || 2} Guests</span>
    </div>
  </div>
);

export default BookingCard;
