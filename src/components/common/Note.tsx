import React from "react";

import TEXSymbol from "./Symbols/TEX";
import PDFSymbol from "./Symbols/PDF";

import { spawn } from "child_process";

type NoteProp = {
  data?: {
    name: string;
    tex_path: string;
    pdf_path: string;
    tex: boolean;
    pdf: boolean;
  }[];
};

function openPDF(path: string): void {
  const child = spawn("zathura", [path]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

const openTEX = () => {
  console.log("Button clicked!");
};

const Note: React.FC<NoteProp> = ({ data }) => {
  if (!data) {
    return (
      <div style={{ color: "#9E9C9E" }}>No Lecture Notes</div>
    );
  };

  return (
    <div style={{ lineHeight: 2.5 }}>
      <div style={{ fontSize: "17px", color: "#9E9C9E" }}>
        Lecture Notes
      </div>

      <table style={{ width: "100%" }}>
        <tbody>
          {data.map((note) => (
            <tr key={note.name}>
              <td>{note.name}</td>
              <td style={{ textAlign: "right" }}>
                <span>
                  {note.pdf &&
                    <span
                      style={{
                        paddingRight: (note.pdf && note.tex) ? "10px" : "0px",
                        verticalAlign: "middle"
                      }}>
                      <PDFSymbol onClick={() => openPDF(note.pdf_path)} />
                    </span>}
                  {note.tex &&
                    <span style={{ verticalAlign: "middle" }}>
                      <TEXSymbol onClick={openTEX} />
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
