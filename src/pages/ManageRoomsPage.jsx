import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { roomService } from '../services/roomService';

const managerItems = [
  { to: '/manager/dashboard', label: 'Overview' },
  { to: '/manager/rooms', label: 'Manage Rooms' },
  { to: '/manager/availability', label: 'Availability' },
  { to: '/manager/pricing', label: 'Pricing' },
  { to: '/manager/bookings', label: 'Bookings' },
  { to: '/manager/revenue', label: 'Revenue' },
  { to: '/manager/alerts', label: 'Alerts' },
];

const ManageRoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  const loadRooms = () => {
    const storedRooms = roomService.readStoredRooms ? roomService.readStoredRooms() : [];
    setRooms(Array.isArray(storedRooms) ? storedRooms : []);
  };

  const handleDeleteRoom = async (roomId) => {
    const nextRooms = rooms.filter((room) => String(room.id) !== String(roomId));
    roomService.writeStoredRooms(nextRooms);
    loadRooms();
  };

  useEffect(() => {
    loadRooms();
    window.addEventListener('storage', loadRooms);

    return () => window.removeEventListener('storage', loadRooms);
  }, []);

  return (
    <div className="dashboard-shell">
      <Sidebar items={managerItems} />
      <div className="page-shell">
        <div className="section-header">
          <h2>Manage rooms</h2>
          <Link className="btn btn-success" to="/manager/rooms/add">Add room</Link>
        </div>
        <div className="card" style={{ padding: '22px' }}>
          {rooms.length ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                  <th>Room</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id}>
                    <td>{room.name}</td>
                    <td>{room.type || 'Deluxe'}</td>
                    <td>₹{Number(room.price || 0).toLocaleString('en-IN')}</td>
                    <td>{(room.status || 'available').toUpperCase()}</td>
                    <td style={{ display: 'flex', gap: '10px' }}>
                      <Link to={`/manager/rooms/${room.id}/edit`}>Edit</Link>
                      <button type="button" className="btn btn-danger" style={{ padding: '6px 10px', fontSize: '0.8rem' }} onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No rooms added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRoomsPage;
