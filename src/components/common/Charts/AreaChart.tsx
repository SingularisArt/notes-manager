import React from "react";
import colorConfigs from "configs/colorConfigs";
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart as AreaComp, Area, Legend } from "recharts";

type AreaChartProp = {
  data: string[],
  width?: number,
  height?: number,
  dataKey?: string,
  legend?: boolean,
};

const AreaChart: React.ComponentProps<AreaChartProp> = ({
  data,
  width = 500,
  height = 500,
  dataKey = "line",
  legend = true
}) => {
  return (
    <AreaComp width={width} height={height} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke={colorConfigs.graph.cartesianGridStroke} />
      <Tooltip />
      {legend ? <Legend /> : null}
      <Area type="monotone" dataKey={dataKey} stroke={colorConfigs.graph.stroke} fill={colorConfigs.graph.fill} />
    </AreaComp>
  );
};

export default AreaChart;
