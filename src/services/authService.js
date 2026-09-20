import api from './axiosClient';
import { normalizeRole } from '../utils/helpers';

const demoUsers = {
  kiran: {
    username: 'kiran',
    name: 'Kiran',
    email: 'kiran@example.com',
    role: 'CUSTOMER',
    password: 'kiran123',
  },
  manager: {
    username: 'manager',
    name: 'Manager',
    email: 'manager@example.com',
    role: 'HOTEL_MANAGER',
    password: 'manager123',
  },
  admin: {
    username: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    role: 'ADMIN',
    password: 'admin123',
  },
};

const USERS_KEY = 'grandvista_registered_users';

const readRegisteredUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeRegisteredUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getLocalUser = (username) => {
  const key = (username || '').trim().toLowerCase();
  if (!key) return null;

  const users = readRegisteredUsers();
  return users[key] || null;
};

const buildUserResponse = (user) => ({
  token: `demo-token-${String(user.role || 'CUSTOMER').toLowerCase()}`,
  user: {
    username: user.username,
    name: user.name || user.username,
    email: user.email || `${(user.username || 'guest').toLowerCase()}@example.com`,
    role: normalizeRole(user.role || 'CUSTOMER'),
  },
});

const login = async (credentials) => {
  const username = (credentials?.username || '').trim().toLowerCase();
  const password = credentials?.password || '';

  const localUser = getLocalUser(username);
  if (localUser && password === localUser.password) {
    return buildUserResponse(localUser);
  }

  const fallbackUser = demoUsers[username];
  if (fallbackUser && password === fallbackUser.password) {
    return buildUserResponse(fallbackUser);
  }

  try {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const register = async (payload) => {
  const username = (payload.username || '').trim();
  const email = (payload.email || '').trim();
  const password = payload.password || '';
  const role = normalizeRole(payload.role || 'CUSTOMER');

  if (!username || !email || !password) {
    throw new Error('Username, email, and password are required.');
  }

  const users = readRegisteredUsers();
  const usernameKey = username.toLowerCase();

  if (users[usernameKey]) {
    throw new Error('This username is already in use.');
  }

  const user = {
    username,
    name: payload.name || username,
    email,
    password,
    role,
  };

  users[usernameKey] = user;
  writeRegisteredUsers(users);

  return buildUserResponse(user);
};

const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/auth/me');
    return response.data;
  } catch (error) {
    const storedUser = localStorage.getItem('grandvista_user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    throw error;
  }
};

export const authService = {
  login,
  register,
  getCurrentUser,
};
