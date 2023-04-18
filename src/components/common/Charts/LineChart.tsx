import "react";
import { LineChart as LineComp, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const LineChart = ({ data, width=500, height=500, dataKey="line", stroke="#8884d8", fill="#8884d8", strokeWidth=3, dot=false, legend=true }) => {
  return (
    <LineComp width={width} height={height} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#ccc" />
      <Tooltip />
      {legend ? <Legend /> : null}
      <Line type="monotone" dataKey={dataKey} dot={dot} strokeWidth={strokeWidth} stroke={stroke} fill={fill}/>
    </LineComp>
  );
};

export default LineChart;
