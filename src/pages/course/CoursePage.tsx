import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Item from "../../components/common/Item";
import ItemTitle from "../../components/common/ItemTitle";

import LineChart from "../../components/common/Charts/LineChart";

import Exam from "../../components/common/Exam";
import Note from "../../components/common/Note";

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
  { name: "Master", tex_path: "", pdf_path: "", tex: true, pdf: true },
  { name: "Lec 1", tex_path: "", pdf_path: "", tex: true, pdf: false },
  { name: "Lec 2", tex_path: "", pdf_path: "", tex: true, pdf: true },
  { name: "Lec 3", tex_path: "", pdf_path: "", tex: true, pdf: true },
  { name: "Lec 4", tex_path: "", pdf_path: "", tex: true, pdf: false },
  { name: "Lec 5", tex_path: "", pdf_path: "", tex: true, pdf: true },
  { name: "Lec 6", tex_path: "", pdf_path: "", tex: true, pdf: true },
  { name: "Lec 7", tex_path: "", pdf_path: "", tex: true, pdf: true },
  { name: "Lec 8", tex_path: "", pdf_path: "", tex: true, pdf: false },
  { name: "Lec 9", tex_path: "", pdf_path: "", tex: true, pdf: false },
  { name: "Lec 10", tex_path: "", pdf_path: "", tex: true, pdf: true },
  { name: "Lec 11", tex_path: "", pdf_path: "", tex: true, pdf: false },
  { name: "Lec 12", tex_path: "", pdf_path: "", tex: true, pdf: true },
  { name: "Lec 13", tex_path: "", pdf_path: "", tex: true, pdf: false },
  { name: "Lec 14", tex_path: "", pdf_path: "", tex: true, pdf: false },
  { name: "Lec 15", tex_path: "", pdf_path: "", tex: true, pdf: true },
  { name: "Lec 16", tex_path: "", pdf_path: "", tex: true, pdf: false },
  { name: "Lec 17", tex_path: "", pdf_path: "", tex: true, pdf: true },
  { name: "Lec 18", tex_path: "", pdf_path: "", tex: true, pdf: false },
  { name: "Lec 19", tex_path: "", pdf_path: "", tex: true, pdf: true },
  { name: "Lec 20", tex_path: "", pdf_path: "", tex: true, pdf: true },
];

const examData = [
  {
    name: "Exam 1", date: "2023-03-01", sections: [
      { name: "Section 1", status: 1 },
      { name: "Section 2", status: 1 },
      { name: "Section 3", status: 1 },
      { name: "Section 4", status: 1 },
      { name: "Section 5", status: 1 },
      { name: "Section 6", status: 1 },
      { name: "Section 7", status: 1 },
      { name: "Section 8", status: 1 },
      { name: "Section 9", status: 1 },
    ],
  },
  {
    name: "Exam 2", date: "2023-03-01", sections: [
      { name: "Section 10", status: 1 },
      { name: "Section 11", status: 1 },
      { name: "Section 12", status: 1 },
      { name: "Section 13", status: 1 },
      { name: "Section 14", status: 1 },
      { name: "Section 15", status: 1 },
      { name: "Section 16", status: 1 },
      { name: "Section 17", status: 1 },
      { name: "Section 18", status: 1 },
      { name: "Section 19", status: 1 },
    ],
  },
  {
    name: "Exam 3", date: "2023-03-01", sections: [
      { name: "Section 20", status: 1 },
      { name: "Section 21", status: 1 },
      { name: "Section 22", status: 1 },
      { name: "Section 23", status: 1 },
      { name: "Section 24", status: 1 },
      { name: "Section 25", status: 1 },
      { name: "Section 26", status: 1 },
      { name: "Section 27", status: 1 },
      { name: "Section 28", status: 1 },
      { name: "Section 29", status: 1 },
    ],
  },
];

const CoursePage = () => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1.2} columnSpacing={1.2}>
          <Grid item xs={6}>
            <Item className="card-container">
              <ItemTitle title="Study Graph" />

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
            </Item>
          </Grid>
          <Grid item xs={100}>
            <Item>
              <ItemTitle title="Figures" />
            </Item>
          </Grid>
          <Grid item xs={100}>
            <Item>
              <ItemTitle title="Todos" />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CoursePage;
