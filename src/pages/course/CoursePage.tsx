import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Item from '../../components/common/Item';
import ItemTitle from '../../components/common/ItemTitle';

import LineChart from '../../components/common/Charts/LineChart';

import WeekCounter from '../../components/common/WeekCounter';

import Exam from './Sections/Exam';
import Note from './Sections/Note';
import Assignment from './Sections/Assignment';
import Figure from './Sections/Figure';
import Todos from './Sections/Todos';

import {
  graphData,
  noteData,
  examData,
  assignmentData,
  figureData,
  gridData,
  todoData,
} from './data';

import './CoursePage.css';

const CoursePage = () => {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1.2} columnSpacing={1.2}>
          <Grid item xs={6}>
            <Item className="card-container">
              <ItemTitle title="Study Graph" settingIcon={false} />

              <div className="study-graph">
                <LineChart
                  data={graphData}
                  dataKey="Hours Studied"
                  width={540}
                  height={540}
                  stroke="#49B49D"
                  legend={false}
                />
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
          <Grid item xs={100}>
            <Item>
              <ItemTitle title="Todos" settingIcon={false} />

              <Todos grid={gridData} data={todoData} />
            </Item>
          </Grid>
        </Grid>
      </Box>

      <div style={{ height: '30px' }}></div>

      <WeekCounter currentWeek={1} maxWeeks={12} />
    </>
  );
};

export default CoursePage;
