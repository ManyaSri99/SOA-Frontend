import api from './axiosClient';

export const roomSeedData = [
  { id: 1, name: 'Kurnool Comfort Deluxe', hotelName: 'GrandVista Kurnool', city: 'Kurnool', location: 'City Center', type: 'Deluxe', capacity: 2, price: 2200, stayDurationHours: 12, stayLabel: '12-hour stay', availableRooms: 4, status: 'available', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80', description: 'A comfortable deluxe room in Kurnool with quick check-in, clean interiors, and city access.', cityInfo: 'Kurnool is a historic district city known for its heritage sites and growing urban facilities.' },
  { id: 2, name: 'Vijayawada River View', hotelName: 'Vijayawada Grand Stay', city: 'Vijayawada', location: 'Kanuru Road', type: 'Suite', capacity: 3, price: 3400, stayDurationHours: 24, stayLabel: '1-day stay', availableRooms: 3, status: 'available', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', description: 'Premium suite with river-facing vibe and modern comforts for business or family trips.', cityInfo: 'Vijayawada is a major commercial city on the Krishna River with strong transport and food culture.' },
  { id: 3, name: 'Mangalagiri Family Comfort', hotelName: 'Mangalagiri Residency', city: 'Mangalagiri', location: 'Temple Road', type: 'Family', capacity: 4, price: 2800, stayDurationHours: 12, stayLabel: '12-hour stay', availableRooms: 5, status: 'available', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80', description: 'Family-friendly room with spacious layout and smooth stay experience for temple visits.', cityInfo: 'Mangalagiri is a fast-growing town close to Vijayawada, famous for its temples and religious tourism.' },
  { id: 4, name: 'Tenali Executive Room', hotelName: 'Tenali Horizon Inn', city: 'Tenali', location: 'Main Bazaar', type: 'Standard', capacity: 2, price: 1900, stayDurationHours: 12, stayLabel: '12-hour stay', availableRooms: 6, status: 'available', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80', description: 'Budget-friendly executive room for short trips, business visits, and quick overnight stays.', cityInfo: 'Tenali is a lively town known for cultural heritage, local markets, and strong regional travel links.' },
  { id: 5, name: 'Gooty Premium Stay', hotelName: 'Gooty Grand Comfort', city: 'Gooty', location: 'Town Junction', type: 'Premium', capacity: 2, price: 2600, stayDurationHours: 24, stayLabel: '1-day stay', availableRooms: 2, status: 'available', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80', description: 'Elegant premium room with calm ambiance, ideal for travelers stopping in Gooty.', cityInfo: 'Gooty is a historic fort town with scenic surroundings and a peaceful travel atmosphere.' },
  { id: 6, name: 'Kadapa Valley Deluxe', hotelName: 'Kadapa Valley Suites', city: 'Kadapa', location: 'Rajampet Road', type: 'Deluxe', capacity: 2, price: 2400, stayDurationHours: 24, stayLabel: '1-day stay', availableRooms: 4, status: 'available', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80', description: 'Healthy and stylish deluxe stay for exploring Kadapa with a premium local stay feel.', cityInfo: 'Kadapa is the district headquarters and a key stop for travelers moving across Rayalaseema.' },
  { id: 7, name: 'Nandyal Pride Suite', hotelName: 'Nandyal Premium Stay', city: 'Nandyal', location: 'Old Town', type: 'Suite', capacity: 3, price: 3100, stayDurationHours: 24, stayLabel: '1-day stay', availableRooms: 3, status: 'available', image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80', description: 'Modern suite with extra space and comfort for family trips and long working trips.', cityInfo: 'Nandyal is a developing city with easy access to nearby hill areas and regional travel routes.' },
  { id: 8, name: 'Anantapur Business Room', hotelName: 'Anantapur Smart Inn', city: 'Anantapur', location: 'Market Area', type: 'Business', capacity: 2, price: 2100, stayDurationHours: 12, stayLabel: '12-hour stay', availableRooms: 5, status: 'available', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80', description: 'Compact, business-ready room built for short stays and work-related travel needs.', cityInfo: 'Anantapur is an important city in Rayalaseema with strong commercial activity and transport hubs.' },
  { id: 9, name: 'Rajahmundry Riverside', hotelName: 'Godavari View Hotel', city: 'Rajahmundry', location: 'Godavari Banks', type: 'Premium', capacity: 2, price: 3600, stayDurationHours: 24, stayLabel: '1-day stay', availableRooms: 2, status: 'available', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', description: 'Riverside premium accommodation ideal for relaxing evening stays and local sightseeing.', cityInfo: 'Rajahmundry is famous for the Godavari river and its scenic landscapes and temple routes.' },
  { id: 10, name: 'Nellore Coastal Stay', hotelName: 'Nellore Grand Rooms', city: 'Nellore', location: 'Beach Road', type: 'Deluxe', capacity: 2, price: 2500, stayDurationHours: 12, stayLabel: '12-hour stay', availableRooms: 4, status: 'available', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80', description: 'Easygoing deluxe stay close to transport points and beach routes in Nellore.', cityInfo: 'Nellore is a coastal city with strong cultural roots and good access to southern travel corridors.' },
  { id: 11, name: 'Tirupati Divine Deluxe', hotelName: 'Tirupati Comfort Suites', city: 'Tirupati', location: 'Balaji Colony', type: 'Family', capacity: 4, price: 3300, stayDurationHours: 24, stayLabel: '1-day stay', availableRooms: 3, status: 'available', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80', description: 'Family room suited for temple travel, comfortable for long spiritual stays and group visits.', cityInfo: 'Tirupati is one of India’s most visited pilgrimage destinations and a major religious tourism hub.' },
  { id: 12, name: 'Guntur Express Stay', hotelName: 'Guntur City Lights', city: 'Guntur', location: 'Lakshmipuram', type: 'Standard', capacity: 2, price: 2000, stayDurationHours: 12, stayLabel: '12-hour stay', availableRooms: 6, status: 'available', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80', description: 'Simple and practical room for quick stopovers, local travel, and overnight convenience.', cityInfo: 'Guntur is a major urban center in Andhra Pradesh known for trade, education, and busy transport routes.' },
];

const ROOM_STORAGE_KEY = 'grandvista_rooms';
const fallbackRoomImage = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80';

const normalizeStoredRooms = (rooms = []) => {
  const normalized = Array.isArray(rooms) ? rooms : [];

  return normalized.map((room) => {
    const seedRoom = roomSeedData.find((item) => String(item.id) === String(room.id));
    const merged = { ...seedRoom, ...room };

    if (String(merged.id) === '8') {
      merged.image = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80';
    } else if (!merged.image) {
      merged.image = seedRoom?.image || fallbackRoomImage;
    }

    return merged;
  });
};

const readStoredRooms = () => {
  try {
    const stored = localStorage.getItem(ROOM_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const normalized = normalizeStoredRooms(parsed);
      localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(normalized));
      return normalized;
    }
  } catch (error) {
    console.warn('Could not read rooms from local storage', error);
  }

  localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(roomSeedData));
  return roomSeedData;
};

const writeStoredRooms = (rooms) => {
  const normalized = normalizeStoredRooms(rooms);
  localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(normalized));
};

const getRooms = async (params = {}) => {
  try {
    const response = await api.get('/api/rooms', { params });
    return response.data;
  } catch (error) {
    const rooms = readStoredRooms();
    const city = params.city ? params.city.toLowerCase() : '';
    const type = params.type ? params.type.toLowerCase() : 'all';

    const filtered = rooms.filter((room) => {
      const matchesCity = !city || (room.city || '').toLowerCase().includes(city) || (room.location || '').toLowerCase().includes(city);
      const matchesType = type === 'all' || (room.type || '').toLowerCase() === type;
      return matchesCity && matchesType;
    });

    return filtered.length ? filtered : rooms;
  }
};

const getRoomById = async (roomId) => {
  try {
    const response = await api.get(`/api/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    const rooms = readStoredRooms();
    return rooms.find((room) => String(room.id) === String(roomId)) || null;
  }
};

const getAvailability = async () => {
  try {
    const response = await api.get('/api/rooms/availability');
    return response.data;
  } catch (error) {
    return readStoredRooms();
  }
};

const createRoom = async (payload) => {
  try {
    const response = await api.post('/api/rooms', payload);
    return response.data;
  } catch (error) {
    const rooms = readStoredRooms();
    const newRoom = { ...payload, id: Date.now(), status: payload.status || 'available', availableRooms: payload.availableRooms || 1, name: payload.name || 'New Room' };
    rooms.unshift(newRoom);
    writeStoredRooms(rooms);
    return newRoom;
  }
};

const updateRoom = async (roomId, payload) => {
  try {
    const response = await api.put(`/api/rooms/${roomId}`, payload);
    return response.data;
  } catch (error) {
    const rooms = readStoredRooms();
    const index = rooms.findIndex((room) => String(room.id) === String(roomId));
    if (index >= 0) {
      rooms[index] = { ...rooms[index], ...payload };
      writeStoredRooms(rooms);
      return rooms[index];
    }
    return payload;
  }
};

const deleteRoom = async (roomId) => {
  try {
    const response = await api.delete(`/api/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    const rooms = readStoredRooms().filter((room) => String(room.id) !== String(roomId));
    writeStoredRooms(rooms);
    return { success: true };
  }
};

export const roomService = {
  getRooms,
  getRoomById,
  getAvailability,
  createRoom,
  updateRoom,
  deleteRoom,
  readStoredRooms,
  writeStoredRooms,
};
