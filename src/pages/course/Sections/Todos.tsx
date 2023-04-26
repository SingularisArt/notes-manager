import React from 'react';
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-kanban';

import { FaCalendar, FaClock } from 'react-icons/fa';

import SubItemTitle from '../../../components/common/SubItemTitle';

type TodosProp = {
  data: {
    Id: string;
    Title: string;
    Summary: string;
    Status: string;
  }[];
  grid: {
    headerText: string;
    keyField: string;
    allowToggle: boolean;
  }[];
};

const Todos: React.FC<TodosProp> = ({ data, grid }) => {
  return (
    <div style={{ lineHeight: 2.5 }}>
      <SubItemTitle title="Weekly To Do's" />

      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={data}
        cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
      >
        <ColumnsDirective>
          {grid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};

export default Todos;
