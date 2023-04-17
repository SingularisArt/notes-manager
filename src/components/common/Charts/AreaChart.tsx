import React from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart as AreaComp, Area, Legend } from "recharts";

type AreaChartProp = {
  data: string[],
  width?: number,
  height?: number,
  dataKey?: string,
  stroke?: string,
  fill?: string,
  legend?: boolean,
};

const AreaChart: React.ComponentProps<AreaChartProp> = ({
  data,
  width = 500,
  height = 500,
  dataKey = "line",
  stroke = "#8884d8",
  fill = "#8884d8",
  legend = true
}) => {
  return (
    <AreaComp width={width} height={height} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#ccc" />
      <Tooltip />
      {legend ? <Legend /> : null}
      <Area type="monotone" dataKey={dataKey} stroke={stroke} fill={fill} />
    </AreaComp>
  );
};

export default AreaChart;
