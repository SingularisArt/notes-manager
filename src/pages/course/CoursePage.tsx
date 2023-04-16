import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Item from '../../components/common/Item';
import ItemTitle from '../../components/common/ItemTitle';

import "./CoursePage.css";

type Props = {};
const CoursePage = (props: Props) => {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1.2} columnSpacing={1.2}>
          <Grid item xs={6}>
            <Item className="card-container">
              <ItemTitle title="Study Graph" />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item className="card-container">
              <ItemTitle title="Exams" />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item className="card-container">
              <ItemTitle title="Notes" />
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
        </Grid>
      </Box>
    </>
  );
};

export default CoursePage;
