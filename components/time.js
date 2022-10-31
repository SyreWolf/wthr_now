import { useState, useEffect } from 'react'

const Time = (props) => {
  const [time, setTime] = useState('XX:XX:XX');

  const options = { weekday: 'long', year: 'numeric', day: 'numeric', month: 'long' };
  const today = new Date();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString());
    }, 1000);
  }, []);

  return <span>{time} - {today.toLocaleDateString("en-GB", options)}</span>;
}

export default Time;
