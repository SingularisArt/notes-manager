import React from "react";

import { AxisModel } from "@syncfusion/ej2-react-charts";
import LineChart from "components/common/Charts/LineChart";
import { CourseData } from "utils/redux";

type GraphDataItem = {
  day: string;
  hour: number;
};

type GraphData = {
  [key: string]: GraphDataItem[];
};

type GraphProp = {
  data: GraphData;
  height: string;
  xAxis: AxisModel;
  yAxis: AxisModel;
  name: string;
  xName: string;
  yName: string;
};

const Graph: React.FC<GraphProp> = ({ data, height, xAxis, yAxis, name, xName, yName }) => {
  const { courseData } = CourseData();
  let currentWeekData = data[courseData.week];
  if (data[courseData.week] === undefined) currentWeekData = {};

  return (
    <LineChart
      data={currentWeekData}
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
