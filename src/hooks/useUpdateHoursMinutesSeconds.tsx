import { useState, useEffect } from "react";

const useUpdateHoursMinutesSeconds = (dueDate: string) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const update = () => {
      const currentDate = new Date();
      const dueDateTime = new Date(dueDate);
      const timeDiff = dueDateTime.getTime() - currentDate.getTime();

      if (timeDiff <= 0) {
        setTimeRemaining("00:00:00");
        return;
      }

      const hours = Math.floor(timeDiff / (60 * 60 * 1000));
      const minutes = Math.floor((timeDiff / (60 * 1000)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      setTimeRemaining(`${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    };

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [dueDate]);

  return timeRemaining;
};

export default useUpdateHoursMinutesSeconds;
