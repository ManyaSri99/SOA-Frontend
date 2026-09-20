const AvailabilityBadge = ({ status }) => {
  const text = status === 'available' ? 'Available' : status === 'held' ? 'Temporarily Held' : status === 'booked' ? 'Booked' : 'Unknown';
  return <span className={`badge ${status || 'neutral'}`}>{text}</span>;
};

export default AvailabilityBadge;
