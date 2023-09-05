import React from 'react';
import colorConfigs from 'configs/colorConfigs';
import {
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Legend,
  AxisModel,
} from '@syncfusion/ej2-react-charts';

type LineChartProps = {
  data: {
    day: string;
    hour: number;
  }[];
  id?: string;
  height?: string;
  width?: number;
  thickness?: number;
  xAxis: AxisModel;
  yAxis: AxisModel;
  name: string;
  xName: string;
  yName: string;
  marker?: AxisModel;
  legend?: AxisModel;
};

const LineChart: React.FC<LineChartProps> = ({
  data,
  id = '',
  height = '450px',
  width = 0,
  thickness = 3,
  xAxis,
  yAxis,
  name,
  xName,
  yName,
  marker = {
    dataLabel: {
      visible: false,
    },
  },
  legend = { visible: false },
}) => {
  return (
    <ChartComponent
      id={id}
      height={height}
      chartArea={{ border: { width: width } }}
      primaryXAxis={xAxis}
      primaryYAxis={yAxis}
      legendSettings={legend}
    >
      <Inject
        services={[ColumnSeries, DataLabel, LineSeries, Category, Legend]}
      />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName={xName}
          yName={yName}
          name={name}
          marker={marker}
          width={thickness}
          fill={colorConfigs.graph.stroke}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
