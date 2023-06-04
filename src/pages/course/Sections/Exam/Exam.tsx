import React, { useState } from "react";
import Stack from "@mui/material/Stack";

import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { InPlaceEditorComponent } from "@syncfusion/ej2-react-inplace-editor";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import ItemTitle from "../../../../components/common/ItemTitle";

import SubItemTitle from "../../../../components/common/SubItemTitle";
import Button from "../../../../components/common/Button";

import "./Exam.css";

import colorConfigs from "../../../../configs/colorConfigs";

type ExamProp = {
  data: {
    name: string;
    dueDate: string;
    grade: string;
    sections: {
      name: string;
      status: number;
    }[];
  }[];
};

type ToggleButtonsProps = {
  toggle: number;
};

type DisplayExamProp = {
  data: {
    name: string;
    dueDate: string;
    grade: string;
    sections: {
      name: string;
      status: number;
    }[];
  }[];
  date?: boolean;
  grade?: boolean;
};

const ToggleButtons: React.FC<ToggleButtonsProps> = ({ toggle }) => {
  let initialSelectedValue = "none";
  if (toggle === 1) {
    initialSelectedValue = "noob";
  } else if (toggle === 2) {
    initialSelectedValue = "master";
  }

  const [selectedValue, setSelectedValue] = useState(initialSelectedValue);
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const handleButtonSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <ToggleButtonGroup size="small" exclusive aria-label="Small sizes">
        <Button
          value="master"
          label="Master"
          onClick={handleButtonSelect}
          selectedValue={selectedValue}
        />
        <Button
          value="noob"
          label="Noob"
          onClick={handleButtonSelect}
          selectedValue={selectedValue}
        />
        <Button
          value="none"
          label="None"
          onClick={handleButtonSelect}
          selectedValue={selectedValue}
        />
      </ToggleButtonGroup>
    </Stack>
  );
};

const DisplayDate = (dueDate: string) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateParts = dueDate.split("-");
  const year = dateParts[0];
  const month = monthsOfYear[parseInt(dateParts[1]) - 1];
  const dayOfMonth = parseInt(dateParts[2]);

  const dateObj = new Date(dueDate);
  const dayOfWeek = daysOfWeek[dateObj.getDay()];

  const today = new Date();
  const timeDiff = Math.abs(dateObj.getTime() - today.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const daysRemaining =
    daysDiff == 1
      ? `${daysDiff} day remaining`
      : daysDiff > 1
        ? `${daysDiff} days remaining`
        : "";

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

  return `${month} ${dayOfMonth}${suffix}, ${dayOfWeek}, ${year} (${daysRemaining})`;
};

const CalculateDiffDate = (dueDate: string) => {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  const diffInMs = Date.parse(dueDate) - today.getTime();
  const diffInDays = Math.round(Math.abs(diffInMs / oneDay));

  if (diffInMs < 0) {
    return -1 * diffInDays;
  } else {
    return diffInDays;
  }
};

const DisplayExam: React.FC<DisplayExamProp> = ({
  data,
  date = true,
  grade = false,
  editMode = false,
}) => {
  const handleExamTitleChange = (examIndex: number, newTitle: string) => {};

  const handleExamScoreChange = (examIndex: number, newScore: string) => {};

  const handleSectionTitleChange = (examIndex: number, sectionIndex: number, newTitle: string) => {};

  const handleDeleteExam = (examIndex: number) => {};

  const handleDeleteSection = (examIndex: number, sectionIndex: number) => {};

  const handleCreateExam = (examIndex: number, title: string) => {};

  const handleCreateSection = (examIndex: number, title: string) => {};

  const elementModel = { placeholder: "Enter your name" };
  const statusOptions = ["Master", "Noob", "None"];
  const statusModel = { dataSource: statusOptions };

  return (
    <table style={{ width: "100%" }}>
      <tbody>
        {data.map((exam) => (
          <tr key={exam.name}>
            <td
              style={{
                width: "50%",
                paddingLeft: "25px",
                verticalAlign: "top",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "bold" }}>{exam.name}</div>
                {date ? (
                  <div>
                    {editMode ? DisplayDate(exam.dueDate) : (
                      <></>
                    )}
                  </div>
                ) : (
                    <></>
                  )}
                {grade === true ? <div>
                  <InPlaceEditorComponent
                    type="Text"
                    mode="Inline"
                    id="sectionName"
                    data-underline={false}
                    value={exam.grade}
                  />
                </div> : <></>}
              </div>
              <table style={{ width: "100%" }}>
                <tbody>
                  {exam.sections.map((section, sectionIndex) => (
                    <tr key={section.name}>
                      <td style={{ paddingLeft: "25px", textAlign: "left" }}>
                        <InPlaceEditorComponent
                          type="Text"
                          mode="Inline"
                          id="sectionName"
                          data-underline={false}
                          value={section.name}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <InPlaceEditorComponent
                          type="DropDownList"
                          mode="Inline"
                          id="sectionStatus"
                          data-underline={false}
                          value={statusOptions[section.status]}
                          model={statusModel}
                        />
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <InPlaceEditorComponent
                          type="Date"
                          mode="Inline"
                          id="sectionDate"
                          data-underline={false}
                          value={new Date(section.date)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Exam: React.FC<ExamProp> = ({ data }) => {
  const [editMode, setMode] = useState(false);

  if (data.length === 0) {
    return (
      <div style={{ paddingTop: "20px" }}>
        <SubItemTitle title="No Exams" />
      </div>
    );
  }

  const futureExams = data.filter(
    (exam) => CalculateDiffDate(exam.dueDate) >= 1
  );
  const pastExams = data.filter(
    (exam) => CalculateDiffDate(exam.dueDate) <= 0
  );

  return (
    <>
      <ItemTitle title="Exams" onIconClick={() => setMode(!editMode) } />

      <div style={{ lineHeight: 2.5 }}>
        <SubItemTitle title="Future Exams" />

        {futureExams.length === 0 ? (
          <div>No future exams.</div>
        ) : (
          <DisplayExam data={futureExams} editMode={editMode} />
        )}

        <SubItemTitle title="Past Exams" />

        {pastExams.length === 0 ? (
          <div>No past exams.</div>
        ) : (
          <DisplayExam data={pastExams} date={false} grade={true} editMode={editMode} />
        )}
      </div>
    </>
  );
};

export default Exam;
