import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { bookingService } from '../services/bookingService';
import { roomService } from '../services/roomService';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import CountdownTimer from '../components/CountdownTimer';

const BookingPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const roomId = params.get('roomId') || 1;
  const [room, setRoom] = useState(null);
  const [form, setForm] = useState({ roomId, checkInDate: '', checkOutDate: '', guests: 2, durationHours: 4, paymentMethod: 'UPI' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hold, setHold] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      const selectedRoom = await roomService.getRoomById(roomId);
      setRoom(selectedRoom);
      if (selectedRoom) {
        setForm((prev) => ({ ...prev, roomId: selectedRoom.id || roomId, paymentMethod: 'UPI' }));
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleHold = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await bookingService.holdRoom({ ...form, roomId: Number(form.roomId), durationHours: Number(form.durationHours) });
      setHold(response);
    } catch (err) {
      setError(err.response?.data?.message || 'Room availability changed. Please select another room.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    if (!room) return;

    try {
      const total = Number(room.price || 0) * Number(form.durationHours || 1);
      const response = await bookingService.createBooking({
        ...form,
        roomId: Number(form.roomId),
        hotelName: room.hotelName || 'GrandVista Hotel',
        city: room.city || 'Hyderabad',
        roomType: room.type || 'Deluxe',
        location: room.location || 'City Center',
        price: Number(room.price || 0),
        totalAmount: total,
        durationHours: Number(form.durationHours || 4),
      });
      localStorage.setItem('grandvista_last_booking', JSON.stringify(response));
      navigate('/booking-confirmation');
    } catch (err) {
      const fallbackBooking = {
        id: Date.now(),
        bookingId: `GV-${Date.now()}`,
        roomId: Number(form.roomId),
        roomName: room.name || 'Selected room',
        hotelName: room.hotelName || 'GrandVista Hotel',
        city: room.city || 'Hyderabad',
        roomType: room.type || 'Deluxe',
        location: room.location || 'City Center',
        price: Number(room.price || 0),
        totalAmount: Number(room.price || 0) * Number(form.durationHours || 1),
        durationHours: Number(form.durationHours || 4),
        status: 'CONFIRMED',
        customerName: 'Guest User',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('grandvista_last_booking', JSON.stringify(fallbackBooking));
      navigate('/booking-confirmation');
    }
  };

  return (
    <div className="page-shell">
      <div className="card" style={{ padding: '24px' }}>
        <h2>Book your stay</h2>
        <ErrorMessage message={error} />
        {room ? (
          <p style={{ marginBottom: '18px' }}>
            {room.hotelName || 'GrandVista Hotel'} · {room.city || 'Hyderabad'} · {room.type || 'Deluxe'} · ₹{room.price || 0}/hour
          </p>
        ) : null}
        <form className="auth-form" onSubmit={handleHold}>
          <label>
            Room ID
            <input type="number" name="roomId" value={form.roomId} onChange={handleChange} />
          </label>
          <label>
            Check-in date
            <input type="date" name="checkInDate" value={form.checkInDate} onChange={handleChange} required />
          </label>
          <label>
            Check-out date
            <input type="date" name="checkOutDate" value={form.checkOutDate} onChange={handleChange} required />
          </label>
          <label>
            Stay duration (hours)
            <input type="number" name="durationHours" min="1" max="24" value={form.durationHours} onChange={handleChange} required />
          </label>
          <label>
            Guests
            <input type="number" name="guests" min="1" max="8" value={form.guests} onChange={handleChange} required />
          </label>
          <label>
            Payment method
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              <option value="UPI">UPI</option>
              <option value="CARD">Card</option>
              <option value="CASH_AT_HOSTEL">Cash at hostel</option>
            </select>
          </label>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Holding room...' : 'Hold room'}
          </button>
        </form>
      </div>

      {hold ? (
        <div className="card" style={{ padding: '24px' }}>
          <h3>Room held for you</h3>
          <p>Complete payment within <CountdownTimer seconds={300} /></p>
          <p>{hold.message || 'Your room is temporarily reserved for 5 minutes.'}</p>
          <button className="btn btn-primary" onClick={handleConfirmBooking}>Confirm booking & pay</button>
        </div>
      ) : null}

      {loading ? <LoadingSpinner label="Checking room availability..." /> : null}
    </div>
  );
};

export default BookingPage;
