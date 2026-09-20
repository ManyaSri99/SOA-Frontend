import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PaymentStatus from '../components/PaymentStatus';
import { bookingService } from '../services/bookingService';

const BookingDetailsPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const response = await bookingService.getBookingById(id);
        setBooking(response);
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [id]);

  if (loading) return <LoadingSpinner label="Loading booking details..." />;
  if (!booking) return <div className="empty-state">Booking not found.</div>;

  return (
    <div className="page-shell">
      <div className="card" style={{ padding: '24px' }}>
        <h2>Booking details</h2>
        <p>Reference: {booking.id}</p>
        <p>Status: <PaymentStatus status={booking.status || 'PENDING'} /></p>
        <p>Guests: {booking.guests || 2}</p>
        <p>Check-in: {booking.checkInDate}</p>
        <p>Check-out: {booking.checkOutDate}</p>
        <p>Total: ₹{booking.totalAmount || 4200}</p>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
