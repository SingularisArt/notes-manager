import React from "react";

import TEXSymbol from "./Symbols/TEX";
import PDFSymbol from "./Symbols/PDF";

import SubItemTitle from "./SubItemTitle";

type NoteProp = {
  data: {
    name: string;
    tex_path: string;
    pdf_path: string;
    tex: boolean;
    pdf: boolean;
  }[];
};

function sendData(path: string): void { console.log(path); }

const Note: React.FC<NoteProp> = ({ data }) => {
  if (!data) {
    return (
      <div style={{ paddingTop: "20px" }}>
        <SubItemTitle title="No Lecture Notes" />
      </div>
    );
  };

  return (
    <div style={{ lineHeight: 2.5 }}>
      <SubItemTitle title="Lecture Notes" />

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
                      <PDFSymbol onClick={() => sendData(note.pdf_path)} />
                    </span>}
                  {note.tex &&
                    <span style={{ verticalAlign: "middle" }}>
                      <TEXSymbol onClick={() => sendData(note.tex_path)} />
                    </span>}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Note;
