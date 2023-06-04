import React, { useState } from "react";
import { useSelector } from "react-redux";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import sizeConfigs from "../../configs/sizeConfigs";

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

  const isSidebarEnabled = useSelector((state: RootState) => state.isSidebarEnabled.enabled);
  const mainContentWidth = isSidebarEnabled ? `calc(100% - ${sizeConfigs.sidebar.width})` : "100%";
  const shift = isSidebarEnabled ? sizeConfigs.sidebar.width : "0px";

  return (
    <footer
      style={{
        position: "fixed",
        bottom: "0",
        backgroundColor: "white",
        textAlign: "center",
        paddingTop: "0.5em",
        paddingBottom: "0.5em",
        width: mainContentWidth,
        left: shift,
        borderTop: "1px solid #8a8a8a",
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "left 0.3s, width 0.3s",
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
