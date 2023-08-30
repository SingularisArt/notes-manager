import React, { useState } from "react";

import ItemTitle from "../../../../components/common/ItemTitle";
import SubItemTitle from "../../../../components/common/SubItemTitle";

import DisplayDate from "../../../../utils/DisplayDate";
import CalculateDiffDate from "../../../../utils/CalculateDiffDate";

import "./Exam.css";

type ExamProp = {
  data: {
    name: string;
    dueDate: string;
    grade: string;
    sections: {
      name: string;
      status: number;
      date: string;
    }[];
  }[];
  updateData: (updatedData: { [key: string]: any }[]) => void;
};

type DisplayExamProp = {
  data: {
    name: string;
    dueDate: string;
    grade: string;
    sections: {
      name: string;
      status: number;
      date: string;
    }[];
  }[];
  date?: boolean;
  grade?: boolean;
  updateData: (updatedData: { [key: string]: any }[]) => void;
};

type InPlaceEditorTemplateProps = {
  type?: string;
  mode?: string;
  data_underline?: boolean;
  model?: {
    dataSource: string[];
  }[];
  id: string;
  value: string;
  updateData: (updatedValue: string, id: string) => void;
};

type DisplayGradeProps = {
  grade: string;
};

const DisplayGrade: React.FC<DisplayGradeProps> = ({ grade }) => {
  console.log(grade);
  if (!grade || grade === "Empty") {
    return <span>NA</span>;
  }

  if (!isNaN(Number(grade)) && !grade.includes("%")) {
    return <span>{grade}%</span>;
  }

  return <span>{grade}</span>;
};

const DisplayExam: React.FC<DisplayExamProp> = ({
  data,
  updateData,
  date = true,
  grade = false,
}) => {
  const statusOptions = ["Master", "Noob", "None"];
  const statusModel = { dataSource: statusOptions };

  const handleUpdate = (id: string, value: string) => {
    const updatedData = data.map((exam) => {
      const updatedSections = exam.sections.map((section) => {
        if (section.name === id) {
          return { ...section, name: value };
        }
        return section;
      });

      return { ...exam, sections: updatedSections };
    });

    const updatedDataArray = data.map((exam) => {
      if (exam.name === id) {
        return { ...exam, name: value };
      }
      return exam;
    });

    updateData([...updatedDataArray, ...updatedData]);
  };

  let numericModel = {
    format: 'p0',
    value: 0,
  };

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
                <div style={{ fontWeight: "bold" }}>
                  {exam.name}
                </div>

                <div>
                  {date ? (
                    DisplayDate(exam.dueDate)
                  ) : null}

                  {grade ? (
                    <DisplayGrade grade={exam.grade} />
                  ) : null}
                </div>
              </div>
              <table style={{ width: "100%" }}>
                <tbody>
                  {exam.sections.map((section, _) => (
                    <tr key={section.name}>
                      <td style={{ paddingLeft: "25px", textAlign: "left" }}>
                        {section.name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {statusOptions[section.status]}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {section.date}
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

const Exam: React.FC<ExamProp> = ({ data, updateData }) => {
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
      <ItemTitle title="Exams" />

      <div style={{ lineHeight: 2.5 }}>
        <SubItemTitle title="Future Exams" />

        {futureExams.length === 0 ? (
          <div>No future exams.</div>
        ) : (
          <DisplayExam
            data={futureExams}
            updateData={updateData}
          />
        )}

        <SubItemTitle title="Past Exams" />

        {pastExams.length === 0 ? (
          <div>No past exams.</div>
        ) : (
          <DisplayExam data={pastExams} updateData={updateData} />
        )}
      </div>
    </>
  );
};

export default Exam;
