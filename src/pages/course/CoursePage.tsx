import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import WeekCounter from 'components/common/WeekCounter/WeekCounter';

import Graph from './Sections/Graph';
import Exam from './Sections/Exam/Exam';
import Note from './Sections/Note/Note';
import Assignment from './Sections/Assignment/Assignment';
import Figure from './Sections/Figure/Figure';
import Todos from './Sections/Todos/Todos';

import Topbar from 'components/common/Topbar/Topbar';

import {
  graphData,
  xAxis,
  yAxis,
  assignmentData,
  gridData,
} from './data';

import './CoursePage.css';

type CoursePageProps = {
  topbarTitle: string;
  courseID: string;
};

const CoursePage: React.FC<CoursePageProps> = ({ topbarTitle, courseID }) => {
  return (
    <>
      <Topbar title={topbarTitle} />

      <Box className="container">
        <Grid container rowSpacing={1.2} columnSpacing={1.2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Graph
              data={graphData}
              height="450px"
              xAxis={xAxis}
              yAxis={yAxis}
              name="Study Graph"
              xName="day"
              yName="hour"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Note courseID={courseID} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Exam />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Assignment data={assignmentData} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Figure courseID={courseID} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Todos grid={gridData} />
          </Grid>
        </Grid>
      </Box>

      <div className="bottom-space"></div>

      <WeekCounter currentWeek={1} maxWeeks={12} />
    </>
  );
};

export default CoursePage;
