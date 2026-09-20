import api from './axiosClient';
import { roomService } from './roomService';

const BOOKINGS_KEY = 'grandvista_bookings';
const NOTIFICATIONS_KEY = 'grandvista_notifications';

const readBookings = () => {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
  } catch {
    return [];
  }
};

const writeBookings = (bookings) => {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

const readNotifications = () => {
  try {
    return JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');
  } catch {
    return [];
  }
};

const writeNotifications = (notifications) => {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
};

const holdRoom = async (payload) => {
  try {
    const response = await api.post('/api/bookings/hold', payload);
    return response.data;
  } catch (error) {
    return {
      message: `Room held successfully for ${payload.checkInDate || 'today'} and ${payload.durationHours || 4} hours.`,
      holdId: `HOLD-${Date.now()}`,
      roomId: payload.roomId,
    };
  }
};

const createBooking = async (payload) => {
  try {
    const response = await api.post('/api/bookings', payload);
    return response.data;
  } catch (error) {
    const room = (await roomService.getRoomById(payload.roomId)) || { id: payload.roomId, name: 'Selected Room', hotelName: payload.hotelName || 'GrandVista', city: payload.city || 'Hyderabad', type: payload.roomType || 'Deluxe', price: payload.totalAmount || payload.price || 0, status: 'available' };

    const user = JSON.parse(localStorage.getItem('grandvista_user') || '{}');
    const roomData = (roomService.readStoredRooms && roomService.readStoredRooms()) || [];
    const roomIndex = roomData.findIndex((item) => String(item.id) === String(payload.roomId));

    if (roomIndex >= 0) {
      roomData[roomIndex] = {
        ...roomData[roomIndex],
        status: 'booked',
        availableRooms: Math.max(0, (roomData[roomIndex].availableRooms || 1) - 1),
      };
      roomService.writeStoredRooms(roomData);
    }

    const booking = {
      id: Date.now(),
      bookingId: `GV-${Date.now()}`,
      roomId: payload.roomId,
      roomName: room.name,
      hotelName: payload.hotelName || room.hotelName || 'GrandVista Hotel',
      city: payload.city || room.city || 'Hyderabad',
      roomType: payload.roomType || room.type || 'Deluxe',
      location: payload.location || room.location || 'City Center',
      price: Number(payload.totalAmount || payload.price || room.price || 0),
      totalAmount: Number(payload.totalAmount || payload.price || room.price || 0),
      paymentMethod: payload.paymentMethod || 'UPI',
      checkInDate: payload.checkInDate,
      checkOutDate: payload.checkOutDate,
      durationHours: Number(payload.durationHours || 4),
      guests: Number(payload.guests || 2),
      status: 'CONFIRMED',
      customerName: user.name || user.username || 'Guest User',
      createdAt: new Date().toISOString(),
      notification: `Booked ${payload.roomType || room.type || 'room'} in ${payload.hotelName || room.hotelName || 'GrandVista'} for ${payload.durationHours || 4} hours`,
    };

    const bookings = readBookings();
    bookings.unshift(booking);
    writeBookings(bookings);

    const notifications = readNotifications();
    notifications.unshift({
      id: Date.now(),
      title: 'Booking confirmed',
      message: `${booking.customerName} booked ${booking.roomType} in ${booking.hotelName} for ${booking.durationHours} hours at ${booking.city}.`,
      createdAt: new Date().toISOString(),
      bookingId: booking.bookingId,
      type: 'BOOKING',
    });
    writeNotifications(notifications);

    return booking;
  }
};

const getMyBookings = async () => {
  try {
    const response = await api.get('/api/bookings/my');
    return response.data;
  } catch (error) {
    return readBookings();
  }
};

const getBookingById = async (bookingId) => {
  try {
    const response = await api.get(`/api/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    const bookings = readBookings();
    return bookings.find((booking) => String(booking.id) === String(bookingId) || String(booking.bookingId) === String(bookingId)) || null;
  }
};

const releaseHold = async (holdId) => {
  try {
    const response = await api.delete(`/api/bookings/${holdId}`);
    return response.data;
  } catch (error) {
    return { success: true, message: 'Hold released.' };
  }
};

export const bookingService = {
  holdRoom,
  createBooking,
  getMyBookings,
  getBookingById,
  releaseHold,
};
