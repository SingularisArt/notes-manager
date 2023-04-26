import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Item from "../../components/common/Item";
import ItemTitle from "../../components/common/ItemTitle";

import LineChart from "../../components/common/Charts/LineChart";

import WeekCounter from "../../components/common/WeekCounter";

import Exam from "./Sections/Exam";
import Note from "./Sections/Note";
import Assignment from "./Sections/Assignment"
import Figure from "./Sections/Figure"

import "./CoursePage.css";

const graphData = [
  { name: "Mon", ["Hours Studied"]: 1 },
  { name: "Tue", ["Hours Studied"]: 3 },
  { name: "Wed", ["Hours Studied"]: 4 },
  { name: "Thu", ["Hours Studied"]: 5 },
  { name: "Fri", ["Hours Studied"]: 2 },
  { name: "Sat", ["Hours Studied"]: 4 },
  { name: "Sun", ["Hours Studied"]: 8 },
];

const noteData = [
  { name: "Master", tex_path: "", pdf_path: "", tex: true, pdf: true, type: "lecture" },
  { name: "Lecture 1", tex_path: "", pdf_path: "", tex: true, pdf: false, type: "lecture" },
  { name: "Lecture 2", tex_path: "", pdf_path: "", tex: true, pdf: true, type: "lecture" },
  { name: "Lecture 3", tex_path: "", pdf_path: "", tex: true, pdf: true, type: "lecture" },
  { name: "Lecture 4", tex_path: "", pdf_path: "", tex: true, pdf: false, type: "lecture" },
  { name: "Lecture 5", tex_path: "", pdf_path: "", tex: true, pdf: true, type: "lecture" },
  { name: "Lecture 6", tex_path: "", pdf_path: "", tex: true, pdf: true, type: "lecture" },
  { name: "Lecture 7", tex_path: "", pdf_path: "", tex: true, pdf: true, type: "lecture" },
  { name: "Lecture 8", tex_path: "", pdf_path: "", tex: true, pdf: false, type: "lecture" },
  { name: "Lecture 9", tex_path: "", pdf_path: "", tex: true, pdf: false, type: "lecture" },
  { name: "Lecture 10", tex_path: "", pdf_path: "", tex: true, pdf: true, type: "lecture" },

  { name: "Lecture 1", tex_path: "", pdf_path: "", tex: false, pdf: true, type: "online" },
  { name: "Lecture 2", tex_path: "", pdf_path: "", tex: false, pdf: true, type: "online" },
  { name: "Lecture 3", tex_path: "", pdf_path: "", tex: false, pdf: true, type: "online" },
  { name: "Lecture 4", tex_path: "", pdf_path: "", tex: false, pdf: true, type: "online" },
  { name: "Lecture 5", tex_path: "", pdf_path: "", tex: false, pdf: true, type: "online" },
  { name: "Lecture 6", tex_path: "", pdf_path: "", tex: false, pdf: true, type: "online" },
  { name: "Lecture 7", tex_path: "", pdf_path: "", tex: false, pdf: true, type: "online" },
  { name: "Lecture 8", tex_path: "", pdf_path: "", tex: false, pdf: true, type: "online" },
  { name: "Lecture 9", tex_path: "", pdf_path: "", tex: false, pdf: true, type: "online" },
  { name: "Lecture 10", tex_path: "", pdf_path: "", tex: false, pdf: true, type: "online" },
];

const examData = [
  {
    name: "Exam 1", due_date: "2023-04-20", grade: "100%", sections: [
      { name: "Section 1", status: 2 },
      { name: "Section 2", status: 2 },
      { name: "Section 3", status: 2 },
      { name: "Section 4", status: 2 },
      { name: "Section 5", status: 2 },
      { name: "Section 6", status: 2 },
      { name: "Section 7", status: 2 },
      { name: "Section 8", status: 2 },
      { name: "Section 9", status: 2 },
      { name: "Section 10", status: 2 },
    ],
  },
  {
    name: "Exam 2", due_date: "2023-05-27", grade: "NA", sections: [
      { name: "Section 11", status: 0 },
      { name: "Section 12", status: 0 },
      { name: "Section 13", status: 0 },
      { name: "Section 14", status: 0 },
      { name: "Section 15", status: 0 },
      { name: "Section 16", status: 0 },
      { name: "Section 17", status: 0 },
      { name: "Section 18", status: 0 },
      { name: "Section 19", status: 0 },
    ],
  },
];

const assignmentData = [
  { name: "Graded Assignment 1", submitted: true, due_date: "2023-04-25" },
  { name: "Graded Assignment 2", submitted: false, due_date: "2023-04-25" },
  { name: "Graded Assignment 3", submitted: true, due_date: "2023-04-25" },
  { name: "Graded Assignment 4", submitted: false, due_date: "2023-04-25" },
  { name: "Graded Assignment 5", submitted: true, due_date: "2023-04-25" },
  { name: "Graded Assignment 6", submitted: false, due_date: "2023-04-25" },
  { name: "Graded Assignment 7", submitted: false, due_date: "2023-04-25" },
  { name: "Graded Assignment 8", submitted: false, due_date: "2023-04-25" },
  { name: "Graded Assignment 9", submitted: true, due_date: "2023-04-25" },
  { name: "Graded Assignment 10", submitted: true, due_date: "2023-04-25" },
];

const figureData = [
  {
    title: "Figure 1",
    figure_path: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
  },
  {
    title: "Figure 2",
    figure_path: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    title: "Figure 3",
    figure_path: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    title: "Figure 4",
    figure_path: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    title: "Figure 5",
    figure_path: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    title: "Figure 6",
    figure_path: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    title: "Figure 7",
    figure_path: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    title: "Figure 8",
    figure_path: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
]

const CoursePage = () => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1.2} columnSpacing={1.2}>
          <Grid item xs={6}>
            <Item className="card-container">
              <ItemTitle title="Study Graph" settingIcon={false} />

              <div className="study-graph">
                <LineChart data={graphData} dataKey="Hours Studied" width={540} height={540} stroke="#49B49D" legend={false} />
              </div>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item className="card-container">
              <ItemTitle title="Exams" />

              <Exam data={examData} />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item className="card-container">
              <ItemTitle title="Notes" />

              <Note data={noteData} />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item className="card-container">
              <ItemTitle title="Assignments" />

              <Assignment data={assignmentData} />
            </Item>
          </Grid>
          <Grid item xs={100}>
            <Item>
              <ItemTitle title="Figures" />

              <Figure data={figureData} />
            </Item>
          </Grid>
        </Grid>
      </Box>

      <div style={{ height: "30px" }}></div>

      <WeekCounter currentWeek={1} maxWeeks={12} />
    </>
  );
};

export default CoursePage;
