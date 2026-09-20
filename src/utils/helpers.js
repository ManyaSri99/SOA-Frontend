export const formatCurrency = (value) => {
  const numericValue = Number(value || 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericValue);
};

export const formatDate = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const getRoleHome = (role) => {
  if (role === 'ADMIN') return '/admin/dashboard';
  if (role === 'HOTEL_MANAGER') return '/manager/dashboard';
  return '/';
};

export const getApiErrorMessage = (error, fallback = 'Something went wrong.') => {
  const status = error?.response?.status;
  const responseMessage = error?.response?.data?.message;
  const requestUrl = error?.config?.baseURL && error?.config?.url
    ? `${error.config.baseURL}${error.config.url}`
    : error?.config?.url || 'Unknown request';

  console.error('API error details:', {
    status,
    responseMessage,
    requestUrl,
    error,
  });

  if (status) {
    const statusText = responseMessage ? `${status}: ${responseMessage}` : `HTTP ${status}`;
    return `${statusText} | Request: ${requestUrl}`;
  }

  if (error?.response?.status === 409) {
    return 'Room availability changed. Please select another room.';
  }

  if (error?.code === 'ERR_NETWORK' || error?.message === 'Network Error') {
    return `Network error: unable to reach ${requestUrl}. Please confirm the API Gateway is running on http://localhost:8080 and that CORS is enabled.`;
  }

  return fallback;
};

export const normalizeRole = (role) => {
  const normalized = String(role || 'CUSTOMER').trim().toUpperCase();

  if (normalized === 'HOTEL MANAGER' || normalized === 'HOTEL_MANAGER') return 'HOTEL_MANAGER';
  if (normalized === 'CUSTOMER' || normalized === 'CUSTOM') return 'CUSTOMER';

  return 'CUSTOMER';
};

export const statusTone = (status) => {
  const map = {
    available: 'success',
    held: 'warning',
    booked: 'danger',
    pending: 'warning',
    success: 'success',
    failed: 'danger',
    refunded: 'secondary',
  };

  return map[status?.toLowerCase?.()] || 'secondary';
};

export const getAvailabilityClass = (status) => {
  if (status === 'available') return 'available';
  if (status === 'held') return 'held';
  if (status === 'booked') return 'booked';
  return 'neutral';
};
