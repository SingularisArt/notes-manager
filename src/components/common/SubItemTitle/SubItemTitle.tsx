import React from "react";
import "./SubItemTitle.css";

type SubItemTitleProps = {
  title: string;
}

const SubItemTitle: React.FC<SubItemTitleProps> = ({ title }) => {
  return (
    <div className="sub-item-title">
      {title}
    </div>
  );
};

export default SubItemTitle;
