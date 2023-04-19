import React from "react";
import ToggleButton from "@mui/material/ToggleButton";

interface ButtonProps {
  value: string;
  label?: string;
  color?: string;
  selectedColor?: string;
  onButtonSelect?: (value: string) => void;
  selectedValue: string;
}

const Button: React.FC<ButtonProps> = ({
  value,
  label,
  color,
  selectedColor,
  onButtonSelect,
  selectedValue
}) => {
  const handleButtonClick = () => {
    if (selectedValue === value) {
      if (onButtonSelect) onButtonSelect("none");
    } else {
      if (onButtonSelect) onButtonSelect(value);
    }
  };

  return (
    <ToggleButton
      value={value}
      key={value}
      style={{
        border: `2px solid ${color}`,
        borderRadius: "10px",
        color: selectedValue === value ? "white" : color,
        backgroundColor: selectedValue === value ? selectedColor : "white",
        marginLeft: value !== "master" ? "10px" : "0",
        marginRight: value !== "none" ? "10px" : "0",
      }}
      onClick={handleButtonClick}
    >
      <div style={{ fontSize: "10px" }}>{label}</div>
    </ToggleButton>
  );
};

export default Button;
