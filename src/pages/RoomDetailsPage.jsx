import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PriceCard from '../components/PriceCard';
import AvailabilityBadge from '../components/AvailabilityBadge';
import { roomService } from '../services/roomService';
import { pricingService } from '../services/pricingService';

const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [pricing, setPricing] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomData = await roomService.getRoomById(id);
        const fallbackRoom = roomData || roomService.readStoredRooms().find((item) => String(item.id) === String(id)) || {
          id,
          name: 'Grand Deluxe Room',
          type: 'Deluxe',
          city: 'Kurnool',
          hotelName: 'GrandVista Hotel',
          location: 'City Center',
          price: 2200,
          capacity: 2,
          availableRooms: 3,
          status: 'available',
          description: 'A comfortable and well-designed stay with premium linens, a quiet ambience, and a smooth check-in experience.',
          cityInfo: 'Kurnool is a historic district city known for its heritage landmarks, major transport access, and welcoming hospitality scene.',
          image: fallbackImage,
        };

        setRoom(fallbackRoom);

        try {
          const pricingData = await pricingService.getPricingForRoom(id, fallbackRoom);
          setPricing(pricingData || pricingService.defaultPricingForRoom(fallbackRoom, id));
        } catch {
          setPricing(pricingService.defaultPricingForRoom(fallbackRoom, id));
        }
      } catch {
        const fallbackRoom = {
          id,
          name: 'Grand Deluxe Room',
          type: 'Deluxe',
          city: 'Kurnool',
          hotelName: 'GrandVista Hotel',
          location: 'City Center',
          price: 2200,
          capacity: 2,
          availableRooms: 3,
          status: 'available',
          description: 'This stay is designed for travelers who want comfortable accommodation, easy access to city highlights, and a peaceful night experience.',
          cityInfo: 'Kurnool is a historic district city and a convenient stop for travelers exploring business routes, local attractions, and family-friendly hospitality.',
          image: fallbackImage,
        };
        setRoom(fallbackRoom);
        setPricing(pricingService.defaultPricingForRoom(fallbackRoom, id));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner label="Loading room details..." />;
  if (!room) return <div className="empty-state">Room not found.</div>;

  return (
    <div className="detail-layout">
      <div className="detail-hero card">
        <img src={room.image || fallbackImage} alt={room.name || 'Room'} />
        <div>
          <span className="eyebrow">{room.type || 'Deluxe'}</span>
          <h2>{room.name || 'Grand Deluxe'}</h2>
          <AvailabilityBadge status={room.status || 'available'} />
          <p>{room.description || 'Elegant room with premium amenities and a calm atmosphere for your stay.'}</p>

          <div style={{ marginTop: '14px', marginBottom: '14px', display: 'grid', gap: '8px' }}>
            <strong>{room.hotelName || 'GrandVista Hotel'}</strong>
            <span>{room.city || 'Kurnool'} • {room.location || 'City Center'}</span>
            <span>{room.cityInfo || 'A vibrant city destination with comfortable travel access and local hospitality.'}</span>
          </div>

          <div className="detail-specs">
            <span>{room.capacity || 2} guests</span>
            <span>{room.location || 'City Center'}</span>
            <span>{room.availableRooms || 0} rooms available</span>
          </div>

          <div style={{ marginTop: '18px', padding: '14px 16px', background: '#f3f8ff', borderRadius: '12px', border: '1px solid #dfe9ff' }}>
            <strong>Why guests love this stay</strong>
            <ul style={{ margin: '10px 0 0 18px', padding: 0, lineHeight: '1.7' }}>
              <li>Close to city attractions, local markets, and transport hubs.</li>
              <li>Comfort-focused interiors with flexible check-in and quiet, restful ambience.</li>
              <li>Ideal for short business trips, family visits, and quick city stays.</li>
            </ul>
          </div>

          <Link className="btn btn-primary" to={`/booking?roomId=${id}`} style={{ marginTop: '18px' }}>Book this room</Link>
        </div>
      </div>

      <PriceCard pricing={pricing} />
    </div>
  );
};

export default RoomDetailsPage;
