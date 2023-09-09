import React from 'react';
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-kanban';

import { todoData } from '../../data';
import { CourseData } from 'utils/redux';

import Item from 'components/common/Item';
import ItemTitle from 'components/common/ItemTitle/ItemTitle';
import SubItemTitle from 'components/common/SubItemTitle/SubItemTitle';

type TaskStatus = 'In Progress' | 'Todo' | 'Done';

type Task = {
  Id: string;
  Title: string;
  Summary: string;
  Status: TaskStatus;
};

type TodosProps = {
  grid: {
    headerText: string;
    keyField: string;
    allowToggle: boolean;
  }[];
};

const Todos: React.FC<TodosProps> = ({ grid }) => {
  const { courseData } = CourseData();
  const currentWeek = courseData.week;
  const currentWeekData = todoData[currentWeek];

  return (
    <Item minHeight={0}>
      <ItemTitle title="Todos" settingIcon={false} />
      <div style={{ lineHeight: 2.5 }}>
        <SubItemTitle title="Weekly To Do's" />

        <KanbanComponent
          id="kanban"
          keyField="Status"
          dataSource={currentWeekData}
          cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
        >
          <ColumnsDirective>
            {grid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
        </KanbanComponent>
      </div>
    </Item>
  );
};

export default Todos;
