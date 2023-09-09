import React from 'react';
import { AxisModel } from '@syncfusion/ej2-react-charts';
import { CourseData } from 'utils/redux';

import Item from 'components/common/Item';
import ItemTitle from 'components/common/ItemTitle/ItemTitle';
import LineChart from 'components/common/Graph';

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

const Graph: React.FC<GraphProp> = ({
  data,
  height,
  xAxis,
  yAxis,
  name,
  xName,
  yName,
}) => {
  const { courseData } = CourseData();
  let currentWeekData = data[courseData.week];
  if (data[courseData.week] === undefined) currentWeekData = {};

  return (
    <Item minHeight={0} add={false}>
      <ItemTitle title="Study Graph" settingIcon={false} />
      <LineChart
        data={currentWeekData}
        height={height}
        xAxis={xAxis}
        yAxis={yAxis}
        name={name}
        xName={xName}
        yName={yName}
      />
    </Item>
  );
};

export default Graph;
