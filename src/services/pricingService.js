import api from './axiosClient';

const defaultPricingForRoom = (room, roomId) => {
  const basePrice = Number(room?.price || room?.basePrice || 2200);
  const occupancyAdjustment = Number(room?.occupancyAdjustment || 6);
  const demandAdjustment = Number(room?.demandAdjustment || 8);
  const weekendAdjustment = Number(room?.weekendAdjustment || 5);
  const finalPrice = Math.round(basePrice * (1 + occupancyAdjustment / 100 + demandAdjustment / 100 + weekendAdjustment / 100));

  return {
    roomId: roomId || room?.id,
    basePrice,
    occupancyAdjustment,
    demandAdjustment,
    weekendAdjustment,
    finalPrice,
    discount: 'Early booking discount applied',
    note: `${room?.city || 'This city'} offers a comfortable stay with flexible room pricing.`,
  };
};

const getPricingForRoom = async (roomId, room = null) => {
  try {
    const response = await api.get(`/api/pricing/${roomId}`);
    const pricing = response.data || {};

    if (pricing.finalPrice || pricing.basePrice) {
      return {
        ...defaultPricingForRoom({ ...room, price: pricing.basePrice || room?.price || 2200, occupancyAdjustment: pricing.occupancyAdjustment || 6, demandAdjustment: pricing.demandAdjustment || 8, weekendAdjustment: pricing.weekendAdjustment || 5 }, roomId),
        ...pricing,
      };
    }

    return defaultPricingForRoom(room || { price: 2200 }, roomId);
  } catch (error) {
    return defaultPricingForRoom(room || { price: 2200 }, roomId);
  }
};

const getRecommendations = async () => {
  try {
    const response = await api.get('/api/pricing/recommendations');
    return response.data;
  } catch (error) {
    return [];
  }
};

export const pricingService = {
  getPricingForRoom,
  getRecommendations,
  defaultPricingForRoom,
};
