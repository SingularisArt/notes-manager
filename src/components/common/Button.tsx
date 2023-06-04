import React from "react";
import ToggleButton from "@mui/material/ToggleButton";

interface ButtonProps {
  value: string;
  label?: string;
  onClick?: (value: string) => void;
  selectedValue: string;
}

const Button: React.FC<ButtonProps> = ({
  value,
  label,
  onClick,
  selectedValue,
}) => {
  const handleButtonClick = () => {
    if (selectedValue === value) {
      if (onClick) onClick("none");
    } else {
      if (onClick) onClick(value);
    }
  };

  return (
    <ToggleButton
      value={value}
      key={value}
      selected={selectedValue === value}
      color="primary"
      style={{
        borderRadius: "10px",
        marginLeft: value !== "master" ? "10px" : "0",
        marginRight: value !== "none" ? "10px" : "0",
      }}
      onClick={handleButtonClick}
    >
      <div style={{ fontSize: "12px" }}>{label}</div>
    </ToggleButton>
  );
};

export default Button;
