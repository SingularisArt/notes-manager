import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Item from "../../components/common/Item";
import ItemTitle from "../../components/common/ItemTitle";

import WeekCounter from "../../components/common/WeekCounter";

import Graph from "./Sections/Graph";
import Exam from "./Sections/Exam/Exam";
import Note from "./Sections/Note";
import Assignment from "./Sections/Assignment";
import Figure from "./Sections/Figure/Figure";
import Todos from "./Sections/Todos";

import Topbar from "../../components/common/Topbar";

import {
  graphData,
  xAxis,
  yAxis,
  examData,
  assignmentData,
  figureData,
  gridData,
  todoData,
} from "./data";

import "./CoursePage.css";

type CoursePageProps = {
  topbarTitle: string;
  courseID: string;
};

const CoursePage: React.FC<CoursePageProps> = ({ topbarTitle, courseID }) => {
  return (
    <>
      <Topbar title={topbarTitle} />

      <Box sx={{ width: "100%", transition: "width 0.3s" }}>
        <Grid container rowSpacing={1.2} columnSpacing={1.2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Item className="card-container">
              <ItemTitle title="Study Graph" settingIcon={false} />

              <Graph
                data={graphData}
                height="450px"
                xAxis={xAxis}
                yAxis={yAxis}
                name="Study Graph"
                xName="day"
                yName="hour"
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Item className="card-container">
              <ItemTitle title="Notes" />

              <Note courseID={courseID} />
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Item className="card-container">
              <Exam data={examData} />
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Item className="card-container">
              <ItemTitle title="Assignments" />

              <Assignment data={assignmentData} />
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Item>
              <ItemTitle title="Figures" />

              <Figure courseID={courseID} />
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Item>
              <ItemTitle title="Todos" settingIcon={false} />

              <Todos grid={gridData} data={todoData} />
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
