import React from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";

import SubItemTitle from "components/common/SubItemTitle/SubItemTitle";
import { CourseData } from "utils/redux";

type TaskStatus = "In Progress" | "Todo" | "Done";

type Task = {
  Id: string;
  Title: string;
  Summary: string;
  Status: TaskStatus;
};

type TodosProps = {
  data: {
    [week: number]: Task[];
  };
  grid: {
    headerText: string;
    keyField: string;
    allowToggle: boolean;
  }[];
};

const Todos: React.FC<TodosProps> = ({ data, grid }) => {
  const { courseData } = CourseData();
  const currentWeek = courseData.week;
  const currentWeekData = data[currentWeek];

  return (
    <div style={{ lineHeight: 2.5 }}>
      <SubItemTitle title="Weekly To Do's" />

      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={currentWeekData}
        cardSettings={{ contentField: "Summary", headerField: "Id" }}
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
