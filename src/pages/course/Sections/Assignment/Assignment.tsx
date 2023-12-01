import React, { useEffect, useState } from 'react';

import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Item from 'components/common/Item';
import ItemTitle from 'components/common/ItemTitle/ItemTitle';
import SubItemTitle from 'components/common/SubItemTitle/SubItemTitle';

import './Assignment.css';

type Duration = {
  hours: number;
  minutes: number;
  seconds: number;
};

type AssignmentProp = {
  data: {
    name: string;
    submitted: boolean;
    dueDate: string;
    grade: string;
    url: string;
    progress: number;
    collapse?: boolean;
    collapseData?: {
      name: string;
      submitted: boolean;
      dueDate: string;
      grade: string;
      url: string;
    }[];
  }[];
  overdue?: boolean;
  today?: boolean;
};

enum Progress {
  'None',
  'In Progress',
  'Done',
}

function createData(
  name: string,
  submitted: boolean,
  dueDate: string,
  grade: string,
  url: string,
  progress: number,
  collapse?: boolean,
  collapseData?: {
    name: string;
    submitted: boolean;
    dueDate: string;
    grade: string;
    url: string;
  }[]
) {
  return {
    name,
    submitted,
    dueDate,
    grade,
    url,
    progress,
    collapse,
    collapseData,
  };
}

function getRows(data: AssignmentProp['data']) {
  return data.map((assignment) =>
    createData(
      assignment.name,
      assignment.submitted,
      assignment.dueDate,
      assignment.grade,
      assignment.url,
      assignment.progress,
      assignment.collapse,
      assignment.collapseData
    )
  );
}

const calculateDiffDate = (dueDate: string) => {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  const diffInMs = Date.parse(dueDate) - today.getTime();
  const diffInDays = Math.round(Math.abs(diffInMs / oneDay));

  if (diffInDays === 1) {
    return 0;
  } else if (diffInMs < 0) {
    return -1 * diffInDays;
  } else {
    return diffInDays;
  }
};

const getDuration = (startDate: Date, endDate: Date): Duration => {
  const oneSecondInMs = 1000;
  const oneMinuteInMs = 60 * oneSecondInMs;
  const oneHourInMs = 60 * oneMinuteInMs;

  const timeDiffInMs = endDate.getTime() - startDate.getTime();
  const hoursDiff = Math.floor(timeDiffInMs / oneHourInMs);
  const minutesDiff = Math.floor((timeDiffInMs % oneHourInMs) / oneMinuteInMs);
  const secondsDiff = Math.floor(
    (timeDiffInMs % oneMinuteInMs) / oneSecondInMs
  );

  return { hours: hoursDiff, minutes: minutesDiff, seconds: secondsDiff };
};

const displayDuration = () => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  endDate.setHours(23, 59, 0, 0);

  const duration = getDuration(startDate, endDate);

  const hours = String(duration.hours).padStart(2, '0');
  const minutes = String(duration.minutes).padStart(2, '0');
  const seconds = String(duration.seconds).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

const DisplayDate = (
  dueDate: string,
  submitted?: boolean,
  overdue?: boolean,
  dueToday?: boolean
) => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dateParts = dueDate.split('-');
  const year = dateParts[0];
  const month = monthsOfYear[parseInt(dateParts[1]) - 1];
  const dayOfMonth = parseInt(dateParts[2]);

  const dateObj = new Date(dueDate);
  const dayOfWeek = daysOfWeek[dateObj.getDay()];

  const today = new Date();
  const timeDiff = Math.abs(dateObj.getTime() - today.getTime());

  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  let daysRemaining;

  if (overdue) {
    daysRemaining = daysDiff > 0 ? `${daysDiff - 1} days late` : '';
  } else daysRemaining = daysDiff > 0 ? `${daysDiff} days remaining` : '';

  if (submitted) return `${month} ${dayOfMonth}, ${dayOfWeek}, ${year}`;
  if (dueToday) {
    const [timeLeft, setTimeLeft] = useState(displayDuration());

    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(displayDuration());
      }, 1000);

      return () => clearTimeout(timer);
    });

    return (
      <div>
        {' '}
        {month} {dayOfMonth}, {dayOfWeek}, {year} ({timeLeft}){' '}
      </div>
    );
  }
  return `${month} ${dayOfMonth}, ${dayOfWeek}, ${year} (${daysRemaining})`;
};

const GetGrade = (grade: string) => {
  if (isNaN(parseInt(grade))) {
    return grade;
  } else {
    return `${grade}%`;
  }
};

function Row(
  props: { row: ReturnType<typeof createData> },
  overdue?: boolean,
  today?: boolean
) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            style={{ visibility: row.collapse ? 'visible' : 'hidden' }}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.name}
        </TableCell>
        <TableCell align="center">Hi</TableCell>
        <TableCell align="center">Hi</TableCell>
        <TableCell align="right">
          {row.submitted === true
            ? GetGrade(row.grade)
            : DisplayDate(row.dueDate, row.submitted, overdue, today)}
        </TableCell>
      </TableRow>
      {row.collapseData && row.collapse ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open}>
              <Table>
                <TableBody>
                  {getRows(row.collapseData).map((rowData) => (
                    <Row key={rowData.name} row={rowData} />
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
}

const Assignment: React.FC<AssignmentProp> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="no-assignments">
        <SubItemTitle title="No Assignments" />
      </div>
    );
  }

  const dueToday = data.filter(
    (assignment) =>
      !assignment.submitted && calculateDiffDate(assignment.dueDate) === 0
  );
  const dueTodayRows = getRows(dueToday);

  const dueNextWeek = data.filter(
    (assignment) =>
      !assignment.submitted &&
      calculateDiffDate(assignment.dueDate) >= 1 &&
      calculateDiffDate(assignment.dueDate) <= 7
  );
  const dueNextWeekRows = getRows(dueNextWeek);

  const dueLater = data.filter(
    (assignment) =>
      !assignment.submitted && calculateDiffDate(assignment.dueDate) > 7
  );
  const dueLaterRows = getRows(dueLater);

  const overdue = data.filter(
    (assignment) =>
      !assignment.submitted && calculateDiffDate(assignment.dueDate) < 0
  );
  const overdueRows = getRows(overdue);

  const submitted = data.filter((assignment) => assignment.submitted);
  const submittedRows = getRows(submitted);

  return (
    <Item>
      <ItemTitle title="Assignments" />

      <div className="assignments">
        <TableContainer>
          <Table
            aria-label="collapsible table"
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none',
              },
            }}
          >
            <TableRow><SubItemTitle title="Assignments Overdue" /></TableRow>

            {overdue.length === 0 ? (
              <TableRow>No over due assignments.</TableRow>
            ) : (
              <TableBody>
                {overdueRows.map((row) => (
                  <Row key={row.name} row={row} overdue={true} />
                ))}
              </TableBody>
            )}

            <TableRow><SubItemTitle title="Assignments Due Today" /></TableRow>

            {dueToday.length === 0 ? (
              <TableRow>No assignments due today.</TableRow>
            ) : (
              <TableBody>
                {dueTodayRows.map((row) => (
                  <Row key={row.name} row={row} today={true} />
                ))}
              </TableBody>
            )}

            <TableRow><SubItemTitle title="Assignments Due This Week" /></TableRow>

            {dueNextWeek.length === 0 ? (
              <TableRow>No assignments due this week.</TableRow>
            ) : (
              <TableBody>
                {dueNextWeekRows.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            )}

            <TableRow><SubItemTitle title="Assignments Due Later" /></TableRow>

            {dueLater.length === 0 ? (
              <TableRow>No assignments due later.</TableRow>
            ) : (
              <TableBody>
                {dueLaterRows.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            )}

            <TableRow><SubItemTitle title="Assignments Submitted" /></TableRow>

            {submitted.length === 0 ? (
              <div>No assignments submitted.</div>
            ) : (
              <TableBody>
                {submittedRows.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </Item>
  );
};

export default Assignment;
