import api from './axiosClient';

const createPayment = async (payload) => {
  const response = await api.post('/api/payments', payload);
  return response.data;
};

const getPaymentById = async (paymentId) => {
  const response = await api.get(`/api/payments/${paymentId}`);
  return response.data;
};

export const paymentService = {
  createPayment,
  getPaymentById,
};
