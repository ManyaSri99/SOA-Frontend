import api from './axiosClient';

const getManagerDashboard = async () => {
  const response = await api.get('/api/dashboard/manager');
  return response.data;
};

export const dashboardService = {
  getManagerDashboard,
};
