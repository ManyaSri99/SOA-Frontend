import { useEffect, useState } from 'react';

const CountdownTimer = ({ seconds = 300, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');
  const remainingSeconds = (timeLeft % 60).toString().padStart(2, '0');

  return <span className="countdown">{minutes}:{remainingSeconds}</span>;
};

export default CountdownTimer;
