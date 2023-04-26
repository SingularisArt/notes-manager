import React from "react";
import { FaPlus } from "react-icons/fa";

import colorConfigs from "../../configs/colorConfigs";

interface Props {
  onClick: () => void;
  size?: string;
}

const Add: React.FC<Props> = ({ onClick, size = "35px" }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: colorConfigs.addButton,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        outline: "none",
        cursor: "pointer"
      }}
    >
      <FaPlus size={parseInt(size) * 0.6} color="white" />
    </button>
  );
};

export default Add;
