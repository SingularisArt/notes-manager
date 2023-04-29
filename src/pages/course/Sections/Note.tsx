import React from "react";

import TEXSymbol from "../../../components/common/Symbols/TEX";
import PDFSymbol from "../../../components/common/Symbols/PDF";

import SubItemTitle from "../../../components/common/SubItemTitle";

type NoteProp = {
  data: {
    name: string;
    texPath: string;
    pdfPath: string;
    tex: boolean;
    pdf: boolean;
    type: string;
  }[];
};

function sendData(path: string): void { console.log(path); }

const DisplayNotes: React.FC<NoteProp> = ({ data }) => {
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        {data.map((note) => (
          <tr key={note.name}>
            <td style={{ paddingLeft: "25px" }}>{note.name}</td>
            <td style={{ textAlign: "right" }}>
              <span>
                {note.pdf &&
                  <span
                    style={{
                      paddingRight: (note.pdf && note.tex) ? "10px" : "0px",
                      verticalAlign: "middle"
                    }}>
                    <PDFSymbol onClick={() => sendData(note.pdfPath)} />
                  </span>}
                {note.tex &&
                  <span style={{ verticalAlign: "middle" }}>
                    <TEXSymbol onClick={() => sendData(note.texPath)} />
                  </span>}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Note: React.FC<NoteProp> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div style={{ paddingTop: "20px" }}>
        <SubItemTitle title="No Notes" />
      </div>
    );
  };

  const lectureNotes = data.filter((note) =>
    note.type == "lecture"
  );
  const onlineLectureNotes = data.filter((note) =>
    note.type == "online"
  );
  const reviewNotes = data.filter((note) =>
    note.type == "review"
  );

  return (
    <div style={{ lineHeight: 2.5 }}>
      <SubItemTitle title="Lecture Notes" />

      {lectureNotes.length === 0 ? (
        <div>
          No past exams.
        </div>
      ) : (
        DisplayNotes({ data: lectureNotes })
      )}

      <SubItemTitle title="Online Lecture Notes" />

      {onlineLectureNotes.length === 0 ? (
        <div>
          No Online Lecture Notes.
        </div>
      ) : (
        DisplayNotes({ data: onlineLectureNotes })
      )}

      <SubItemTitle title="Exam Review Notes" />

      {reviewNotes.length === 0 ? (
        <div>
          No Review Notes.
        </div>
      ) : (
        DisplayNotes({ data: reviewNotes })
      )}
    </div>
  );
};

export default Note;
