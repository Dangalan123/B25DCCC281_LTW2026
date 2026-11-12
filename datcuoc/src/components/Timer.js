import React, { useEffect } from 'react';

function Timer({ timeLeft, setTimeLeft, onTimeout }) {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout, setTimeLeft]);

  const isLowTime = timeLeft <= 5;

  return (
    <div style={{ fontSize: '18px', fontWeight: 'bold', color: isLowTime ? 'red' : '#1f2937', marginBottom: '16px' }}>
      Còn lại {timeLeft} giây
    </div>
  );
}

export default Timer;