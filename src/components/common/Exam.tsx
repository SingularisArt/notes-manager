import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import SubItemTitle from "./SubItemTitle";
import Button from "./Button";

type ExamProp = {
  data: {
    name: string;
    date: string;
    sections: {
      name: string;
      status: number;
    }[];
  }[];
};

const ToggleButtons = () => {
  const [selectedValue, setSelectedValue] = useState('none');

  const handleButtonSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <ToggleButtonGroup size="small" exclusive aria-label="Small sizes">
        <Button
          value="master"
          label="Master"
          color="#52c41a"
          selectedColor="#3ca813"
          onButtonSelect={handleButtonSelect}
          selectedValue={selectedValue}
        />
        <Button
          value="noob"
          label="Noob"
          color="#fadb14"
          selectedColor="#d1b90e"
          onButtonSelect={handleButtonSelect}
          selectedValue={selectedValue}
        />
        <Button
          value="none"
          label="None"
          color="#f5222d"
          selectedColor="#d2181d"
          onButtonSelect={handleButtonSelect}
          selectedValue={selectedValue}
        />
      </ToggleButtonGroup>
    </Stack>
  );
};

const Exam: React.FC<ExamProp> = ({ data }) => {
  if (!data) {
    return (
      <div style={{ paddingTop: "20px" }}>
        <SubItemTitle title="No Exams" />
      </div>
    );
  };

  return (
    <div style={{ lineHeight: 2.5 }}>
      <SubItemTitle title="Future Exams" />

      <table style={{ width: "100%" }}>
        <tbody>
          {data.map((exam) => (
            <tr key={exam.name}>
              <td style={{ width: "50%", paddingLeft: "25px", verticalAlign: "top" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: "bold" }}>{exam.name}</div>
                  <div style={{ textAlign: "right", color: "red" }}>April 23, 2023: 5 Days Left</div>
                </div>
                <table style={{ width: "100%" }}>
                  <tbody>
                    {exam.sections.map((section) => (
                      <tr key={section.name}>
                        <td style={{ paddingLeft: "25px" }}>{section.name}</td>
                        <td style={{ textAlign: "center" }}><ToggleButtons /></td>
                        <td style={{ textAlign: "right" }}>Date</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Exam;
