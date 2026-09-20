import { formatCurrency } from '../utils/helpers';

const PriceCard = ({ pricing = {} }) => {
  const basePrice = Number(pricing.basePrice || pricing.price || 2200);
  const occupancyAdjustment = Number(pricing.occupancyAdjustment || 6);
  const demandAdjustment = Number(pricing.demandAdjustment || 8);
  const weekendAdjustment = Number(pricing.weekendAdjustment || 5);
  const finalPrice = Number(pricing.finalPrice || Math.round(basePrice * (1 + occupancyAdjustment / 100 + demandAdjustment / 100 + weekendAdjustment / 100)));

  return (
    <div className="pricing-card">
      <div className="line-item"><span>Base Price</span><strong>{formatCurrency(basePrice)}</strong></div>
      <div className="line-item"><span>Occupancy Adjustment</span><strong>{occupancyAdjustment}%</strong></div>
      <div className="line-item"><span>Demand Adjustment</span><strong>{demandAdjustment}%</strong></div>
      <div className="line-item"><span>Weekend Adjustment</span><strong>{weekendAdjustment}%</strong></div>
      <div className="line-item total-line"><span>Final Price</span><strong>{formatCurrency(finalPrice)}</strong></div>
    </div>
  );
};

export default PriceCard;
