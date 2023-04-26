import React from "react";

import SubItemTitle from "../../../components/common/SubItemTitle";

import Add from "../../../components/common/Add";

const onClick = () => {};

type AssignmentProp = {
  data: {
    name: string;
    submitted: boolean;
    due_date: string;
  }[];
};

const CalculateDiffDate = (due_date: string) => {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  const diffInMs = Date.parse(due_date) - today.getTime();
  const diffInDays = Math.round(Math.abs(diffInMs / oneDay));

  if (diffInMs < 0) {
    return -1 * diffInDays;
  } else {
    return diffInDays;
  }
};

const DisplayDate = (due_date: string, submitted: boolean) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dateParts = due_date.split("-");
  const year = dateParts[0];
  const month = monthsOfYear[parseInt(dateParts[1]) - 1];
  const dayOfMonth = parseInt(dateParts[2]);

  const dateObj = new Date(due_date);
  const dayOfWeek = daysOfWeek[dateObj.getDay()];

  const today = new Date();
  const timeDiff = Math.abs(dateObj.getTime() - today.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const daysRemaining = daysDiff > 0 ? `${daysDiff} days remaining` : "";

  const suffix = (() => {
    switch (dayOfMonth) {
      case 1:
      case 21:
      case 31:
        return "st";
      case 2:
      case 22:
        return "nd";
      case 3:
      case 23:
        return "rd";
      default:
        return "th";
    }
  })();

  if (submitted) return `${month} ${dayOfMonth}${suffix}, ${dayOfWeek}, ${year}`;
  return `${month} ${dayOfMonth}${suffix}, ${dayOfWeek}, ${year} (${daysRemaining})`;
};

const DisplayAssignments: React.FC<AssignmentProp> = ({ data }) => {
  return (
      <table style={{ width: "100%" }}>
        <tbody>
          {data.map((assignment) => (
            <tr key={assignment.name}>
              <td style={{ width: "50%", paddingLeft: "25px", verticalAlign: "top" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: "bold" }}>{assignment.name}</div>
                  <div>
                    {DisplayDate(assignment.due_date, assignment.submitted)}
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
      <div style={{ paddingTop: "20px" }}>
        <SubItemTitle title="No Exams" />
      </div>
    );
  };

  const dueToday = data.filter((assignment) =>
    !assignment.submitted && CalculateDiffDate(assignment.due_date) === 0
  );
  const dueNextWeek = data.filter((assignment) =>
    !assignment.submitted && CalculateDiffDate(assignment.due_date) >= 1 && CalculateDiffDate(assignment.due_date) <= 7
  );
  const dueLater = data.filter((assignment) =>
    !assignment.submitted && CalculateDiffDate(assignment.due_date) > 7
  );
  const overdue = data.filter((assignment) =>
    !assignment.submitted && CalculateDiffDate(assignment.due_date) < 0
  );
  const submitted = data.filter((assignment) =>
    assignment.submitted
  );

  return (
    <div style={{ lineHeight: 2.5 }}>
      <SubItemTitle title="Assignments Overdue" />

      {overdue.length === 0 ? (
        <div>
          No overdue assignments.
        </div>
      ) : (
        DisplayAssignments({ data: overdue })
      )}

      <SubItemTitle title="Assignments Due Today" />

      {dueToday.length === 0 ? (
        <div>
          No assignments due today.
        </div>
      ) : (
        DisplayAssignments({ data: dueToday })
      )}

      <SubItemTitle title="Assignments Due This Week" />

      {dueNextWeek.length === 0 ? (
        <div>
          No assignments due this week.
        </div>
      ) : (
        DisplayAssignments({ data: dueNextWeek })
      )}

      <SubItemTitle title="Assignments Due Later" />

      {dueLater.length === 0 ? (
        <div>
          No assignments due later.
        </div>
      ) : (
        DisplayAssignments({ data: dueLater })
      )}

      <SubItemTitle title="Assignments Submitted" />

      {submitted.length === 0 ? (
        <div>
          No assignments submitted.
        </div>
      ) : (

        DisplayAssignments({ data: submitted })
      )}
    </div>
  );
};

export default Assignment;
