import { ValueType } from "@syncfusion/ej2-react-charts";

export const graphData = {
  1: [
    { day: 'Mon', hour: 9 },
    { day: 'Tue', hour: 1 },
    { day: 'Wed', hour: 6 },
    { day: 'Thu', hour: 0 },
    { day: 'Fri', hour: 2 },
    { day: 'Sat', hour: 4 },
    { day: 'Sun', hour: 2 }
  ],
  2: [
    { day: 'Mon', hour: 8 },
    { day: 'Tue', hour: 8 },
    { day: 'Wed', hour: 1 },
    { day: 'Thu', hour: 5 },
    { day: 'Fri', hour: 4 },
    { day: 'Sat', hour: 6 },
    { day: 'Sun', hour: 5 }
  ],
  3: [
    { day: 'Mon', hour: 2 },
    { day: 'Tue', hour: 0 },
    { day: 'Wed', hour: 1 },
    { day: 'Thu', hour: 2 },
    { day: 'Fri', hour: 5 },
    { day: 'Sat', hour: 2 },
    { day: 'Sun', hour: 2 }
  ],
  4: [
    { day: 'Mon', hour: 9 },
    { day: 'Tue', hour: 4 },
    { day: 'Wed', hour: 1 },
    { day: 'Thu', hour: 7 },
    { day: 'Fri', hour: 2 },
    { day: 'Sat', hour: 7 },
    { day: 'Sun', hour: 7 }
  ],
  5: [
    { day: 'Mon', hour: 9 },
    { day: 'Tue', hour: 2 },
    { day: 'Wed', hour: 9 },
    { day: 'Thu', hour: 9 },
    { day: 'Fri', hour: 9 },
    { day: 'Sat', hour: 3 },
    { day: 'Sun', hour: 8 }
  ],
  6: [
    { day: 'Mon', hour: 6 },
    { day: 'Tue', hour: 1 },
    { day: 'Wed', hour: 6 },
    { day: 'Thu', hour: 9 },
    { day: 'Fri', hour: 2 },
    { day: 'Sat', hour: 5 },
    { day: 'Sun', hour: 6 }
  ],
  7: [
    { day: 'Mon', hour: 1 },
    { day: 'Tue', hour: 2 },
    { day: 'Wed', hour: 8 },
    { day: 'Thu', hour: 5 },
    { day: 'Fri', hour: 9 },
    { day: 'Sat', hour: 3 },
    { day: 'Sun', hour: 1 }
  ],
  8: [
    { day: 'Mon', hour: 4 },
    { day: 'Tue', hour: 6 },
    { day: 'Wed', hour: 7 },
    { day: 'Thu', hour: 9 },
    { day: 'Fri', hour: 0 },
    { day: 'Sat', hour: 7 },
    { day: 'Sun', hour: 0 }
  ],
  9: [
    { day: 'Mon', hour: 4 },
    { day: 'Tue', hour: 2 },
    { day: 'Wed', hour: 7 },
    { day: 'Thu', hour: 1 },
    { day: 'Fri', hour: 5 },
    { day: 'Sat', hour: 5 },
    { day: 'Sun', hour: 7 }
  ],
  10: [
    { day: 'Mon', hour: 1 },
    { day: 'Tue', hour: 4 },
    { day: 'Wed', hour: 4 },
    { day: 'Thu', hour: 8 },
    { day: 'Fri', hour: 4 },
    { day: 'Sat', hour: 9 },
    { day: 'Sun', hour: 7 }
  ],
  11: [
    { day: 'Mon', hour: 4 },
    { day: 'Tue', hour: 6 },
    { day: 'Wed', hour: 5 },
    { day: 'Thu', hour: 8 },
    { day: 'Fri', hour: 4 },
    { day: 'Sat', hour: 6 },
    { day: 'Sun', hour: 3 }
  ],
  12: [
    { day: 'Mon', hour: 9 },
    { day: 'Tue', hour: 1 },
    { day: 'Wed', hour: 1 },
    { day: 'Thu', hour: 1 },
    { day: 'Fri', hour: 4 },
    { day: 'Sat', hour: 3 },
    { day: 'Sun', hour: 7 }
  ]
};

export const xAxis = { valueType: "Category" as ValueType };
export const yAxis = { labelFormat: "{value} hr" as ValueType };

export const examData = [
  {
    name: "Exam 1",
    dueDate: "2023-04-20",
    grade: "100%",
    sections: [
      { name: "Section 1", status: 2, date: "2023-04-20" },
      { name: "Section 2", status: 2, date: "2023-04-20" },
      { name: "Section 3", status: 2, date: "2023-04-20" },
      { name: "Section 4", status: 2, date: "2023-04-20" },
      { name: "Section 5", status: 2, date: "2023-04-20" },
      { name: "Section 6", status: 2, date: "2023-04-20" },
      { name: "Section 7", status: 2, date: "2023-04-20" },
      { name: "Section 8", status: 2, date: "2023-04-20" },
      { name: "Section 9", status: 2, date: "2023-04-20" },
      { name: "Section 10", status: 2, date: "2023-04-20" },
    ],
  },
  {
    name: "Exam 2",
    dueDate: "2024-05-27",
    grade: "NA",
    sections: [
      { name: "Section 11", status: 0, date: "2023-04-20" },
      { name: "Section 12", status: 0, date: "2023-04-20" },
      { name: "Section 13", status: 0, date: "2023-04-20" },
      { name: "Section 14", status: 0, date: "2023-04-20" },
      { name: "Section 15", status: 0, date: "2023-04-20" },
      { name: "Section 16", status: 0, date: "2023-04-20" },
      { name: "Section 17", status: 0, date: "2023-04-20" },
      { name: "Section 18", status: 0, date: "2023-04-20" },
      { name: "Section 19", status: 0, date: "2023-04-20" },
    ],
  },
];

export const assignmentData = [
  {
    name: "Graded Assignment 1",
    submitted: true,
    dueDate: "2023-03-01",
    grade: "100",
  },
];

export const gridData = [
  { headerText: "To Do", keyField: "Todo", allowToggle: true },
  { headerText: "In Progress", keyField: "In Progress", allowToggle: true },
  { headerText: "Done", keyField: "Done", allowToggle: true },
];

export const todoData = [
  {
    Id: "Task 1",
    Title: "In Progress Task",
    Summary: "Complete the task that is in progress",
    Status: "In Progress",
  },
  {
    Id: "Task 2",
    Title: "Todo Task",
    Summary: "Complete the task that is in todo",
    Status: "Todo",
  },
  {
    Id: "Task 3",
    Title: "Done Task",
    Summary: "Complete the task that is in done.",
    Status: "Done",
  },
];
