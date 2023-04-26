import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  currentWeek: number;
  maxWeeks: number;
}

const WeekCounter: React.FC<Props> = ({ currentWeek, maxWeeks }) => {
  const [week, setWeek] = useState(currentWeek);

  const handlePrevWeek = () => {
    if (week > 1) {
      setWeek((prevWeek) => prevWeek - 1);
    }
  };

  const handleNextWeek = () => {
    if (week < maxWeeks) {
      setWeek((prevWeek) => prevWeek + 1);
    }
  };

  return (
    <footer
      style={{
        position: "fixed",
        bottom: "0",
        backgroundColor: "white",
        textAlign: "center",
        paddingTop: "0.5em",
        paddingBottom: "0.5em",
        width: "calc(100% - 250px)",
        left: "250px",
        borderTop: "1px solid #8a8a8a",
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          outline: "none",
          padding: "0",
        }}
        onClick={handlePrevWeek}
        disabled={week === 1}
      >
        <FaChevronLeft style={{ fontSize: "20px" }} />
      </button>
      <span style={{ margin: "0 16px" }}>Week {week}</span>
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          outline: "none",
          padding: "0",
        }}
        onClick={handleNextWeek}
        disabled={week === maxWeeks}
      >
        <FaChevronRight style={{ fontSize: "20px" }} />
      </button>
    </footer>
  );
};

export default WeekCounter;
