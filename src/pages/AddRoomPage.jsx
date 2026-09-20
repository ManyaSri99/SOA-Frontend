import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomService } from '../services/roomService';

const AddRoomPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: 'Skyline Suite',
    type: 'Deluxe',
    price: '4200',
    city: 'Kurnool',
    hotelName: 'GrandVista Hotel',
    location: 'City Center',
    status: 'available',
    availableRooms: 3,
    capacity: 2,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = {
        name: form.name,
        type: form.type,
        price: Number(form.price || 0),
        city: form.city,
        hotelName: form.hotelName,
        location: form.location,
        status: form.status,
        availableRooms: Number(form.availableRooms || 1),
        capacity: Number(form.capacity || 2),
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
      };

      await roomService.createRoom(payload);
      navigate('/manager/rooms');
    } catch (err) {
      setError('Unable to save the room. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="card" style={{ padding: '24px' }}>
        <h2>Add room</h2>
        {error ? <div className="error-message">{error}</div> : null}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Room name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Room type
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Family">Family</option>
              <option value="Business">Business</option>
              <option value="Premium">Premium</option>
            </select>
          </label>
          <label>
            City
            <input type="text" name="city" value={form.city} onChange={handleChange} required />
          </label>
          <label>
            Base price
            <input type="number" name="price" value={form.price} onChange={handleChange} required />
          </label>
          <button type="submit" className="btn btn-success" disabled={saving}>
            {saving ? 'Saving room...' : 'Save room'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoomPage;
