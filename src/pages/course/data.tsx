import { ValueType } from "@syncfusion/ej2-react-charts";

export const graphData = [
  { day: "Mon", hour: 5 },
  { day: "Tue", hour: 3 },
  { day: "Wed", hour: 7 },
  { day: "Thu", hour: 4 },
  { day: "Fri", hour: 9 },
  { day: "Sat", hour: 1 },
  { day: "Sun", hour: 0 },
];

export const xAxis = { valueType: "Category" as ValueType };
export const yAxis = { labelFormat: "{value} hr" as ValueType };

export const noteData = [
  {
    name: "Master",
    texPath: "",
    pdfPath: "",
    tex: true,
    pdf: true,
    type: "lecture",
  },
  {
    name: "Lecture 1",
    texPath: "",
    pdfPath: "",
    tex: true,
    pdf: false,
    type: "lecture",
  },
  {
    name: "Lecture 2",
    texPath: "",
    pdfPath: "",
    tex: true,
    pdf: true,
    type: "lecture",
  },
  {
    name: "Lecture 3",
    texPath: "",
    pdfPath: "",
    tex: true,
    pdf: true,
    type: "lecture",
  },
  {
    name: "Lecture 4",
    texPath: "",
    pdfPath: "",
    tex: true,
    pdf: false,
    type: "lecture",
  },
  {
    name: "Lecture 5",
    texPath: "",
    pdfPath: "",
    tex: true,
    pdf: true,
    type: "lecture",
  },
  {
    name: "Lecture 6",
    texPath: "",
    pdfPath: "",
    tex: true,
    pdf: true,
    type: "lecture",
  },
  {
    name: "Lecture 7",
    texPath: "",
    pdfPath: "",
    tex: true,
    pdf: true,
    type: "lecture",
  },
  {
    name: "Lecture 8",
    texPath: "",
    pdfPath: "",
    tex: true,
    pdf: false,
    type: "lecture",
  },
  {
    name: "Lecture 9",
    texPath: "",
    pdfPath: "",
    tex: true,
    pdf: false,
    type: "lecture",
  },
  {
    name: "Lecture 10",
    texPath: "",
    pdfPath: "",
    tex: true,
    pdf: true,
    type: "lecture",
  },
  {
    name: "Lecture 1",
    texPath: "",
    pdfPath: "",
    tex: false,
    pdf: true,
    type: "online",
  },
  {
    name: "Lecture 2",
    texPath: "",
    pdfPath: "",
    tex: false,
    pdf: true,
    type: "online",
  },
  {
    name: "Lecture 3",
    texPath: "",
    pdfPath: "",
    tex: false,
    pdf: true,
    type: "online",
  },
  {
    name: "Lecture 4",
    texPath: "",
    pdfPath: "",
    tex: false,
    pdf: true,
    type: "online",
  },
  {
    name: "Lecture 5",
    texPath: "",
    pdfPath: "",
    tex: false,
    pdf: true,
    type: "online",
  },
  {
    name: "Lecture 6",
    texPath: "",
    pdfPath: "",
    tex: false,
    pdf: true,
    type: "online",
  },
  {
    name: "Lecture 7",
    texPath: "",
    pdfPath: "",
    tex: false,
    pdf: true,
    type: "online",
  },
  {
    name: "Lecture 8",
    texPath: "",
    pdfPath: "",
    tex: false,
    pdf: true,
    type: "online",
  },
  {
    name: "Lecture 9",
    texPath: "",
    pdfPath: "",
    tex: false,
    pdf: true,
    type: "online",
  },
  {
    name: "Lecture 10",
    texPath: "",
    pdfPath: "",
    tex: false,
    pdf: true,
    type: "online",
  },
];

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
  {
    name: "Graded Assignment 2",
    submitted: true,
    dueDate: "2023-03-02",
    grade: "NA",
  },
  {
    name: "Graded Assignment 3",
    submitted: true,
    dueDate: "2023-03-03",
    grade: "NA",
  },
  {
    name: "Graded Assignment 4",
    submitted: true,
    dueDate: "2023-03-04",
    grade: "NA",
  },
  {
    name: "Graded Assignment 5",
    submitted: false,
    dueDate: "2023-04-27",
    grade: "NA",
  },
  {
    name: "Graded Assignment 6",
    submitted: false,
    dueDate: "2023-04-02",
    grade: "NA",
  },
  {
    name: "Graded Assignment 7",
    submitted: false,
    dueDate: "2023-04-03",
    grade: "NA",
  },
  {
    name: "Graded Assignment 8",
    submitted: false,
    dueDate: "2023-05-04",
    grade: "NA",
  },
  {
    name: "Graded Assignment 9",
    submitted: false,
    dueDate: "2023-05-05",
    grade: "NA",
  },
  {
    name: "Graded Assignment 10",
    submitted: false,
    dueDate: "2023-05-06",
    grade: "NA",
  },
];

export const figureData = [
  {
    title: "Figure 1",
    figurePath: "../../data/figures/antipode-preserving-maps.svg",
  },
  {
    title: "Figure 2",
    figurePath: "",
  },
  {
    title: "Figure 3",
    figurePath: "",
  },
  {
    title: "Figure 4",
    figurePath: "",
  },
  {
    title: "Figure 5",
    figurePath: "",
  },
  {
    title: "Figure 6",
    figurePath: "",
  },
  {
    title: "Figure 7",
    figurePath: "",
  },
  {
    title: "Figure 8",
    figurePath: "",
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
    Title: "Finish Graded Assignment 1",
    Summary: "Complete Graded Assignment 1 for the Calculus 3 class",
    Status: "In Progress",
  },
  {
    Id: "Task 2",
    Title: "Finish Graded Assignment 2",
    Summary: "Complete Graded Assignment 2 for the Calculus 3 class",
    Status: "In Progress",
  },
  {
    Id: "Task 3",
    Title: "Finish Graded Assignment 3",
    Summary: "Complete Graded Assignment 3 for the Calculus 3 class",
    Status: "In Progress",
  },
  {
    Id: "Task 4",
    Title: "Study for Exam",
    Summary: "Start studying for the upcoming exam for the MTH-253 class",
    Status: "Todo",
  },
  {
    Id: "Task 5",
    Title: "Complete Journal Assignment",
    Summary: "Complete the Weekly Journal assignment for my PHY-202A class",
    Status: "Done",
  },
  {
    Id: "Task 6",
    Title: "Complete Lab 4",
    Summary:
      "Complete lab 4, which deals with dark matter for my PHY-123 class",
    Status: "Done",
  },
];
