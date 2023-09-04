import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import sizeConfigs from "configs/sizeConfigs";
import { updateCourseData } from "store/actions/courseActions";
import { CourseData, SidebarData } from "utils/redux";

import "./WeekCounter.css";

type Props = {
  currentWeek: number;
  maxWeeks: number;
}

const WeekCounter: React.FC<Props> = ({ currentWeek, maxWeeks }) => {
  const { sidebarData } = SidebarData();
  const { dispatch } = CourseData();
  const [week, setWeek] = useState(currentWeek);

  const handlePrevWeek = () => {
    if (week > 1) {
      setWeek((prevWeek) => prevWeek - 1);
      dispatch(updateCourseData({ week: week - 1 }));
    }
  };

  const handleNextWeek = () => {
    if (week < maxWeeks) {
      setWeek((prevWeek) => prevWeek + 1);
      dispatch(updateCourseData({ week: week + 1 }));
    }
  };

  const isSidebarEnabled = sidebarData.isSidebarEnabled;
  const mainContentWidth = isSidebarEnabled ? `calc(100% - ${sizeConfigs.sidebar.width})` : "100%";
  const shift = isSidebarEnabled ? sizeConfigs.sidebar.width : "0px";

  return (
    <footer
      className="week-counter"
      style={{ width: mainContentWidth, left: shift }}
    >
      <button
        onClick={handlePrevWeek}
        disabled={week === 1}
      >
        <FaChevronLeft />
      </button>
      <span>Week {week}</span>
      <button
        onClick={handleNextWeek}
        disabled={week === maxWeeks}
      >
        <FaChevronRight />
      </button>
    </footer>
  );
};

export default WeekCounter;
