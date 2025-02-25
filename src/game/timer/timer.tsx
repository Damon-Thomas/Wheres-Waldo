import { useEffect, useState } from "react";

export default function Timer() {
  const [currentTime, setCurrentTime] = useState(new Date().getSeconds());
  const [startTime] = useState(Date.now());
  useEffect(() => {
    const time = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      setCurrentTime(elapsedTime);
    }, 1000);
    return () => clearInterval(time);
  }, [startTime]);

  return <p className="text-xl font-bold">{`${currentTime} seconds`}</p>;
}
