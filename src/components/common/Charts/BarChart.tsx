import "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart as BarComp, Bar } from "recharts";

const BarChart = ({ data, width=500, height=500, dataKey="line", stroke="#8884d8", fill="#8884d8", legend=true }) => {
  return (
    <BarComp width={width} height={height} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#ccc" />
      <Tooltip />
      {legend ? <Legend /> : null}
      <Bar dataKey={dataKey} fill={fill}/>
    </BarComp>
  );
};

export default BarChart;
