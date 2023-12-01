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
    progress: 0,
    url: "",
    collapse: false,
    collapseData: [],
  },
  {
    name: "Graded Assignment 2",
    submitted: true,
    dueDate: "2023-03-01",
    grade: "100",
    progress: 1,
    url: "",
    collapse: false,
    collapseData: [],
  },
  {
    name: "Graded Assignment 3",
    submitted: false,
    dueDate: "2023-12-31",
    grade: "NA",
    progress: 1,
    url: "",
    collapse: true,
    collapseData: [
      {
        name: "Graded Assignment 3.1",
        submitted: true,
        dueDate: "2023-12-31",
        grade: "50",
        url: "",
        progress: "done",
        collapse: false,
        collapseData: [],
      },
      {
        name: "Graded Assignment 3.2",
        submitted: false,
        dueDate: "2023-12-31",
        grade: "NA",
        url: "",
        progress: 0,
        collapse: false,
        collapseData: [],
      },
    ],
  },
  {
    name: "Graded Assignment 4",
    submitted: false,
    dueDate: "2023-12-31",
    grade: "NA",
    progress: 1,
    url: "",
    collapse: false,
  },
];

export const gridData = [
  { headerText: "To Do", keyField: "Todo", allowToggle: true },
  { headerText: "In Progress", keyField: "In Progress", allowToggle: true },
  { headerText: "Done", keyField: "Done", allowToggle: true },
];

export const todoData = {
  1: [
    {
      Id: "Task 1 (Week 1)",
      Title: "Todo Task (Week 1)",
      Summary: "Complete the task that is in todo (Week 1).",
      Status: "Todo",
    },
    {
      Id: "Task 2 (Week 1)",
      Title: "In Progress Task (Week 1)",
      Summary: "Complete the task that is in progress (Week 1).",
      Status: "In Progress",
    },
    {
      Id: "Task 3 (Week 1)",
      Title: "Done Task (Week 1)",
      Summary: "Complete the task that is in done (Week 1).",
      Status: "Done",
    },
  ],
  2: [
    {
      Id: "Task 1 (Week 2)",
      Title: "Todo Task (Week 2)",
      Summary: "Complete the task that is in todo (Week 2).",
      Status: "Todo",
    },
    {
      Id: "Task 2 (Week 2)",
      Title: "In Progress Task (Week 2)",
      Summary: "Complete the task that is in progress (Week 2).",
      Status: "In Progress",
    },
    {
      Id: "Task 3 (Week 2)",
      Title: "Done Task (Week 2)",
      Summary: "Complete the task that is in done (Week 2).",
      Status: "Done",
    },
  ],
  3: [
    {
      Id: "Task 1 (Week 3)",
      Title: "Todo Task (Week 3)",
      Summary: "Complete the task that is in todo (Week 3).",
      Status: "Todo",
    },
    {
      Id: "Task 2 (Week 3)",
      Title: "In Progress Task (Week 3)",
      Summary: "Complete the task that is in progress (Week 3).",
      Status: "In Progress",
    },
    {
      Id: "Task 3 (Week 3)",
      Title: "Done Task (Week 3)",
      Summary: "Complete the task that is in done (Week 3).",
      Status: "Done",
    },
  ],
  // do that for 12 weeks
  4: [
    {
      Id: "Task 1 (Week 4)",
      Title: "Todo Task (Week 4)",
      Summary: "Complete the task that is in todo (Week 4).",
      Status: "Todo",
    },
    {
      Id: "Task 2 (Week 4)",
      Title: "In Progress Task (Week 4)",
      Summary: "Complete the task that is in progress (Week 4).",
      Status: "In Progress",
    },
    {
      Id: "Task 3 (Week 4)",
      Title: "Done Task (Week 4)",
      Summary: "Complete the task that is in done (Week 4).",
      Status: "Done",
    },
  ],
  5: [
    {
      Id: "Task 1 (Week 5)",
      Title: "Todo Task (Week 5)",
      Summary: "Complete the task that is in todo (Week 5).",
      Status: "Todo",
    },
    {
      Id: "Task 2 (Week 5)",
      Title: "In Progress Task (Week 5)",
      Summary: "Complete the task that is in progress (Week 5).",
      Status: "In Progress",
    },
    {
      Id: "Task 3 (Week 5)",
      Title: "Done Task (Week 5)",
      Summary: "Complete the task that is in done (Week 5).",
      Status: "Done",
    },
  ],
  6: [
    {
      Id: "Task 1 (Week 6)",
      Title: "Todo Task (Week 6)",
      Summary: "Complete the task that is in todo (Week 6).",
      Status: "Todo",
    },
    {
      Id: "Task 2 (Week 6)",
      Title: "In Progress Task (Week 6)",
      Summary: "Complete the task that is in progress (Week 6).",
      Status: "In Progress",
    },
    {
      Id: "Task 3 (Week 6)",
      Title: "Done Task (Week 6)",
      Summary: "Complete the task that is in done (Week 6).",
      Status: "Done",
    },
  ],
  7: [
    {
      Id: "Task 1 (Week 7)",
      Title: "Todo Task (Week 7)",
      Summary: "Complete the task that is in todo (Week 7).",
      Status: "Todo",
    },
    {
      Id: "Task 2 (Week 7)",
      Title: "In Progress Task (Week 7)",
      Summary: "Complete the task that is in progress (Week 7).",
      Status: "In Progress",
    },
    {
      Id: "Task 3 (Week 7)",
      Title: "Done Task (Week 7)",
      Summary: "Complete the task that is in done (Week 7).",
      Status: "Done",
    },
  ],
  8: [
    {
      Id: "Task 1 (Week 8)",
      Title: "Todo Task (Week 8)",
      Summary: "Complete the task that is in todo (Week 8).",
      Status: "Todo",
    },
    {
      Id: "Task 2 (Week 8)",
      Title: "In Progress Task (Week 8)",
      Summary: "Complete the task that is in progress (Week 8).",
      Status: "In Progress",
    },
    {
      Id: "Task 3 (Week 8)",
      Title: "Done Task (Week 8)",
      Summary: "Complete the task that is in done (Week 8).",
      Status: "Done",
    },
  ],
  9: [
    {
      Id: "Task 1 (Week 9)",
      Title: "Todo Task (Week 9)",
      Summary: "Complete the task that is in todo (Week 9).",
      Status: "Todo",
    },
    {
      Id: "Task 2 (Week 9)",
      Title: "In Progress Task (Week 9)",
      Summary: "Complete the task that is in progress (Week 9).",
      Status: "In Progress",
    },
    {
      Id: "Task 3 (Week 9)",
      Title: "Done Task (Week 9)",
      Summary: "Complete the task that is in done (Week 9).",
      Status: "Done",
    },
  ],
  10: [
    {
      Id: "Task 1 (Week 10)",
      Title: "Todo Task (Week 10)",
      Summary: "Complete the task that is in todo (Week 10).",
      Status: "Todo",
    },
    {
      Id: "Task 2 (Week 10)",
      Title: "In Progress Task (Week 10)",
      Summary: "Complete the task that is in progress (Week 10).",
      Status: "In Progress",
    },
    {
      Id: "Task 3 (Week 10)",
      Title: "Done Task (Week 10)",
      Summary: "Complete the task that is in done (Week 10).",
      Status: "Done",
    },
  ],
  11: [
    {
      Id: "Task 1 (Week 11)",
      Title: "Todo Task (Week 11)",
      Summary: "Complete the task that is in todo (Week 11).",
      Status: "Todo",
    },
    {
      Id: "Task 2 (Week 11)",
      Title: "In Progress Task (Week 11)",
      Summary: "Complete the task that is in progress (Week 11).",
      Status: "In Progress",
    },
    {
      Id: "Task 3 (Week 11)",
      Title: "Done Task (Week 11)",
      Summary: "Complete the task that is in done (Week 11).",
      Status: "Done",
    },
  ],
  12: [
    {
      Id: "Task 1 (Week 12)",
      Title: "Todo Task (Week 12)",
      Summary: "Complete the task that is in todo (Week 12).",
      Status: "Todo",
    },
    {
      Id: "Task 2 (Week 12)",
      Title: "In Progress Task (Week 12)",
      Summary: "Complete the task that is in progress (Week 12).",
      Status: "In Progress",
    },
    {
      Id: "Task 3 (Week 12)",
      Title: "Done Task (Week 12)",
      Summary: "Complete the task that is in done (Week 12).",
      Status: "Done",
    },
  ],
};
