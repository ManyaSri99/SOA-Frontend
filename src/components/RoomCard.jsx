import { Link } from 'react-router-dom';
import AvailabilityBadge from './AvailabilityBadge';
import { formatCurrency } from '../utils/helpers';

const RoomCard = ({ room }) => (
  <article className="room-card">
    <div className="room-image">
      <img
        src={room.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80'}
        alt={room.name || 'Room'}
      />
      <AvailabilityBadge status={room.status || room.availabilityStatus || 'available'} />
    </div>

    <div className="room-body">
      <div className="room-header-row">
        <div>
          <h3>{room.name || 'Deluxe Suite'}</h3>
          <p>{room.type || 'Deluxe'} · {room.capacity || 2} Guests</p>
        </div>
        <span className="room-price">{formatCurrency(room.price || room.basePrice || 3000)}</span>
      </div>

      <p className="room-description">
        {room.description || 'Elegant stay with premium amenities and scenic city views.'}
      </p>

      <div className="room-meta-row">
        <span>{room.location || 'City Center'}</span>
        <span>{room.stayLabel || `${room.stayDurationHours || 12}-hour stay`}</span>
      </div>

      <div className="room-meta-row">
        <span>{room.cityInfo || 'Comfortable city stay with booking support.'}</span>
        <span>{room.availableRooms || room.available || 0} available</span>
      </div>

      <div className="room-actions">
        <Link className="btn btn-outline" to={`/rooms/${room.id || room.roomId || 1}`}>View Details</Link>
        <Link className="btn btn-primary" to={`/booking?roomId=${room.id || room.roomId || 1}`}>Book Now</Link>
      </div>
    </div>
  </article>
);

export default RoomCard;
