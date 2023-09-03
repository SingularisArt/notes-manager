import React from "react";

import { ValueType } from "@syncfusion/ej2-react-charts";

import LineChart from "components/common/Charts/LineChart";

type GraphProp = {
  data: {
    day: string;
    hour: number;
  }[];
  height: string;
  xAxis: ValueType;
  yAxis: ValueType;
  name: string;
  xName: string;
  yName: string;
};

const Graph: React.FC<GraphProp> = ({ data, height, xAxis, yAxis, name, xName, yName }) => {
  return (
    <LineChart
      data={data}
      height={height}
      xAxis={xAxis}
      yAxis={yAxis}
      name={name}
      xName={xName}
      yName={yName}
    />
  );
};

export default Graph;
