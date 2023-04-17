import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Item from "../../components/common/Item";
import ItemTitle from "../../components/common/ItemTitle";

import LineChart from "../../components/common/Charts/LineChart";

import "./CoursePage.css";

const data = [
  { name: "Mon", ["Hours Studied"]: 1 },
  { name: "Tue", ["Hours Studied"]: 3 },
  { name: "Wed", ["Hours Studied"]: 4 },
  { name: "Thu", ["Hours Studied"]: 5 },
  { name: "Fri", ["Hours Studied"]: 2 },
  { name: "Sat", ["Hours Studied"]: 4 },
  { name: "Sun", ["Hours Studied"]: 8 },
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
                <LineChart data={data} dataKey="Hours Studied" width={565} height={500} stroke="#49B49D" legend={false} />
              </div>
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
