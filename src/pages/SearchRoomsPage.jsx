import { useEffect, useState } from 'react';
import RoomCard from '../components/RoomCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { roomService } from '../services/roomService';

const SearchRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [filters, setFilters] = useState({ city: '', type: 'all' });

  const runSearch = async () => {
    setLoading(true);
    setSearched(true);

    try {
      const response = await roomService.getRooms({ city: filters.city, type: filters.type });
      const normalized = Array.isArray(response) ? response : response?.content || [];
      setRooms(normalized);
    } catch (error) {
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const cityMatch = !filters.city || (room.city || '').toLowerCase().includes(filters.city.toLowerCase()) || (room.location || '').toLowerCase().includes(filters.city.toLowerCase());
    const typeMatch = filters.type === 'all' || (room.type || '').toLowerCase() === filters.type.toLowerCase();
    return cityMatch && typeMatch;
  });

  return (
    <div className="page-shell">
      <div className="toolbar card">
        <div>
          <label>City
            <input value={filters.city} onChange={(event) => setFilters({ ...filters, city: event.target.value })} placeholder="Search city" />
          </label>
        </div>
        <div>
          <label>Room type
            <select value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value })}>
              <option value="all">All</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
              <option value="standard">Standard</option>
              <option value="family">Family</option>
              <option value="premium">Premium</option>
              <option value="business">Business</option>
            </select>
          </label>
        </div>
        <button className="btn btn-primary" type="button" onClick={runSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {loading ? <LoadingSpinner label="Searching rooms..." /> : (
        <div className="rooms-grid">
          {filteredRooms.length ? filteredRooms.map((room) => <RoomCard key={room.id || room.roomId} room={room} />) : (
            <div className="empty-state">{searched ? 'No rooms and hotels are available in your search.' : 'Search for a city and room type to find available hotels.'}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRoomsPage;
