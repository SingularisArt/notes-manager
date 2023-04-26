import React from "react";

import FigureCard from "../../../components/common/FigureCard/FigureCard";

type TodoProp = {
  data: {
    title: string;
    figure_path: string;
  }[];
};

const Figure: React.FC<TodoProp> = ({ data }) => {
  return <FigureCard cards={ data } />
};

export default Figure;
