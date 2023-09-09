import React from 'react';

import { examData } from '../../data';

import Item from 'components/common/Item';
import ItemTitle from 'components/common/ItemTitle/ItemTitle';
import SubItemTitle from 'components/common/SubItemTitle/SubItemTitle';

import DisplayDate from 'utils/DisplayDate';
import CalculateDiffDate from 'utils/CalculateDiffDate';

import './Exam.css';

type ExamProp = {};

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

type DisplayGradeProps = {
  grade: string;
};

const DisplayGrade: React.FC<DisplayGradeProps> = ({ grade }) => {
  if (!grade || grade === 'Empty') {
    return <span>NA</span>;
  }

  if (!isNaN(Number(grade)) && !grade.includes('%')) {
    return <span>{grade}%</span>;
  }

  return <span>{grade}</span>;
};

const DisplayExam: React.FC<DisplayExamProp> = ({
  date = true,
  grade = false,
}) => {
  const statusOptions = ['Master', 'Noob', 'None'];

  return (
    <table className="exam-table">
      <tbody>
        {examData.map((exam) => (
          <tr key={exam.name}>
            <td className="exam-table-row">
              <div className="exam-table-row-name">
                <div className="exam-table-row-name-title">{exam.name}</div>

                <div>
                  {date ? DisplayDate(exam.dueDate) : null}

                  {grade ? <DisplayGrade grade={exam.grade} /> : null}
                </div>
              </div>
              <table className="exam-table-row-sections">
                <tbody>
                  {exam.sections.map((section, _) => (
                    <tr key={section.name}>
                      <td className="exam-table-row-sections-name">
                        {section.name}
                      </td>
                      <td className="exam-table-row-sections-status">
                        {statusOptions[section.status]}
                      </td>
                      <td className="exam-table-row-sections-date">
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

const Exam: React.FC<ExamProp> = () => {
  if (examData.length === 0) {
    return (
      <div className="no-exams">
        <SubItemTitle title="No Exams" />
      </div>
    );
  }

  const updateData = (updatedData: { [key: string]: any }[]) => { };

  const futureExams = examData.filter(
    (exam) => CalculateDiffDate(exam.dueDate) >= 1
  );
  const pastExams = examData.filter(
    (exam) => CalculateDiffDate(exam.dueDate) <= 0
  );

  return (
    <Item>
      <ItemTitle title="Exams" />

      <div className="exams">
        <SubItemTitle title="Future Exams" />

        {futureExams.length === 0 ? (
          <div>No future exams.</div>
        ) : (
          <DisplayExam data={futureExams} updateData={updateData} />
        )}

        <SubItemTitle title="Past Exams" />

        {pastExams.length === 0 ? (
          <div>No past exams.</div>
        ) : (
          <DisplayExam data={pastExams} updateData={updateData} />
        )}
      </div>
    </Item>
  );
};

export default Exam;
