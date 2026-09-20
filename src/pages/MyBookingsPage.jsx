import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookingCard from '../components/BookingCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { bookingService } from '../services/bookingService';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await bookingService.getMyBookings();
        const stored = JSON.parse(localStorage.getItem('grandvista_bookings') || '[]');
        const merged = [...stored, ...(Array.isArray(response) ? response : response?.content || [])].filter(Boolean);
        const unique = merged.filter((booking, index, arr) => index === arr.findIndex((item) => String(item.id || item.bookingId) === String(booking.id || booking.bookingId)));
        setBookings(unique);
      } catch {
        setBookings(JSON.parse(localStorage.getItem('grandvista_bookings') || '[]'));
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  if (loading) return <LoadingSpinner label="Loading your bookings..." />;

  return (
    <div className="page-shell">
      <div className="section-header">
        <h2>My bookings</h2>
        <Link to="/search">Book another room</Link>
      </div>
      <div className="rooms-grid">
        {bookings.length ? bookings.map((booking) => (
          <Link key={booking.id || booking.bookingId} to={`/bookings/${booking.id || booking.bookingId}`} style={{ color: 'inherit' }}>
            <BookingCard booking={booking} />
          </Link>
        )) : <div className="empty-state">No bookings yet. Start planning your next stay.</div>}
      </div>
    </div>
  );
};

export default MyBookingsPage;
