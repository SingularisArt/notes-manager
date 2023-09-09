import React, { useEffect, useState } from 'react';

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
    grade: string;
    dueDate: string;
  }[];
  overdue?: boolean;
  today?: boolean;
};

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

const DisplayAssignments: React.FC<AssignmentProp> = ({
  data,
  overdue,
  today,
}) => {
  return (
    <table className="assignment-table">
      <tbody>
        {data.map((assignment) => (
          <tr key={assignment.name}>
            <td className="assignment-table-row">
              <div className="assignment-table-row-content">
                <div className="assignment-table-row-content-name">
                  {assignment.name}
                </div>
                <div>
                  {assignment.submitted === true
                    ? GetGrade(assignment.grade)
                    : DisplayDate(
                      assignment.dueDate,
                      assignment.submitted,
                      overdue,
                      today
                    )}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

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
  const dueNextWeek = data.filter(
    (assignment) =>
      !assignment.submitted &&
      calculateDiffDate(assignment.dueDate) >= 1 &&
      calculateDiffDate(assignment.dueDate) <= 7
  );
  const dueLater = data.filter(
    (assignment) =>
      !assignment.submitted && calculateDiffDate(assignment.dueDate) > 7
  );
  const overdue = data.filter(
    (assignment) =>
      !assignment.submitted && calculateDiffDate(assignment.dueDate) < 0
  );
  const submitted = data.filter((assignment) => assignment.submitted);

  return (
    <Item>
      <ItemTitle title="Assignments" />
      <div className="assignments">
        <SubItemTitle title="Assignments Overdue" />

        {overdue.length === 0 ? (
          <div>No overdue assignments.</div>
        ) : (
          DisplayAssignments({ data: overdue, overdue: true })
        )}

        <SubItemTitle title="Assignments Due Today" />

        {dueToday.length === 0 ? (
          <div>No assignments due today.</div>
        ) : (
          DisplayAssignments({ data: dueToday, today: true })
        )}

        <SubItemTitle title="Assignments Due This Week" />

        {dueNextWeek.length === 0 ? (
          <div>No assignments due this week.</div>
        ) : (
          DisplayAssignments({ data: dueNextWeek })
        )}

        <SubItemTitle title="Assignments Due Later" />

        {dueLater.length === 0 ? (
          <div>No assignments due later.</div>
        ) : (
          DisplayAssignments({ data: dueLater })
        )}

        <SubItemTitle title="Assignments Submitted" />

        {submitted.length === 0 ? (
          <div>No assignments submitted.</div>
        ) : (
          DisplayAssignments({ data: submitted })
        )}
      </div>
    </Item>
  );
};

export default Assignment;
