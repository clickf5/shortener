import React, { useState, useEffect } from 'react';
import moment  from 'moment';

const ActionTimer = ({ handler }: any) => {
  const [seconds, setSeconds] = useState(600);
  const timer = moment
    .utc(moment.duration(seconds, 'seconds').asMilliseconds())
    .format('mm:ss');

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 1 ) {
        handler();
      } else {
      setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <span>{timer}</span>
  );
};

export default ActionTimer;
