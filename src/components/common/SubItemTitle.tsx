import React from "react";

interface SubItemTitleProps {
  title: string;
}

const SubItemTitle: React.FC<SubItemTitleProps> = ({ title }) => {
  return (
    <div style={{
      fontSize: "17px",
      color: "#9E9C9E",
    }}>
      {title}
    </div>
  );
};

export default SubItemTitle;
