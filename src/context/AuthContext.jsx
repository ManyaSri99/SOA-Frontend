import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const rawUser = localStorage.getItem('grandvista_user');
    try {
      return rawUser ? JSON.parse(rawUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('grandvista_token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('grandvista_token', token);
    } else {
      localStorage.removeItem('grandvista_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('grandvista_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('grandvista_user');
    }
  }, [user]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('grandvista_user');
    localStorage.removeItem('grandvista_token');
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
