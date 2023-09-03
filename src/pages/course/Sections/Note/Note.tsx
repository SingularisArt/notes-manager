import React, { useEffect, useState } from "react";
import axios from "axios";

import TEXSymbol from "components/common/Symbols/TEX";
import PDFSymbol from "components/common/Symbols/PDF";
import YAMLSymbol from "components/common/Symbols/YAML";

import SubItemTitle from "components/common/SubItemTitle/SubItemTitle";

import "./Note.css";

type NoteItem = {
  name: string;
  texPath: string;
  pdfPath: string;
  yamlPath: string;
  tex: boolean;
  pdf: boolean;
  yaml: boolean;
  type: string;
};

type Data = {
  notesData: { [key: string]: NoteItem };
  onlineNotesData: { [key: string]: NoteItem };
  examReviewNotesData: { [key: string]: NoteItem };
};

const DisplayNotes: React.FC<{ courseID: string; data: { [key: string]: NoteItem } }> = ({ courseID, data }) => {
  const openNote = async (noteName: string, type: string) => {
    await axios.get(`http://localhost:3000/courses/${courseID}/notes/open-note?note-name=${noteName}&type=${type}`)
  };

  const convertFileNameToDisplayName = (fileName: string) => {
    const splitFileName = fileName.split("/");
    const displayName = splitFileName[splitFileName.length - 1].split(".")[0].replace(/-/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    return displayName.replace(/0([1-9])/g, "$1");
  };

  if (Object.keys(data).length === 0) {
    return <div>No Notes.</div>;
  }

  return (
    <table className="note-table">
      <tbody>
        {Object.values(data).map((note, index) => (
          <tr key={index}>
            {note.type === "lecture" && (
              <>
                {note.texPath && convertFileNameToDisplayName(note.texPath)}
                {note.name && `: ${note.name}`}
              </>
            ) || note.type === "online-lecture" && (
              convertFileNameToDisplayName(note.pdfPath)
            ) || note.type === "practice" && (
              <>
                Practice: {convertFileNameToDisplayName(note.pdfPath)}
              </>
            ) || note.type === "answer" && (
              <>
                Answer: {convertFileNameToDisplayName(note.pdfPath)}
              </>
            ) || note.name}
            <td className="note-table-icon-container">
              <span>
                {note.tex && (
                  <span
                    className="note-table-icon"
                    style={{
                      paddingRight: note.yaml ? "20px" : note.pdf && !note.yaml ? "70px" : "100px",
                    }}
                  >
                    <TEXSymbol onClick={() => openNote(note.texPath, "file")} />
                  </span>
                )}
              </span>
              <span>
                {note.yaml && (
                  <span
                    className="note-table-icon"
                    style={{
                      paddingRight: note.pdf ? "20px" : "50px",
                    }}
                  >
                    <YAMLSymbol onClick={() => openNote(note.yamlPath, "file")} />
                  </span>
                )}
              </span>
              <span>
                {note.pdf && (
                  <span className="note-table-icon">
                    <PDFSymbol onClick={() => openNote(note.pdfPath, "pdf")} />
                  </span>
                )}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Note: React.FC<{ courseID: string }> = ({ courseID }) => {
  const [data, setData] = useState<Data>({
    notesData: {},
    onlineNotesData: {},
    examReviewNotesData: {},
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get<Data>(`http://localhost:3000/courses/${courseID}/notes`);
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllNotes();
  }, [courseID]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (Object.keys(data.notesData).length === 0) {
    return (
      <div className="no-notes">
        <SubItemTitle title="No Notes" />
      </div>
    );
  }

  return (
    <div className="notes">
      <SubItemTitle title="Personal Notes" />

      <DisplayNotes courseID={courseID} data={data.notesData} />

      <SubItemTitle title="Professor Notes" />

      <DisplayNotes courseID={courseID} data={data.onlineNotesData} />

      <SubItemTitle title="Exam Review Notes" />

      <DisplayNotes courseID={courseID} data={data.examReviewNotesData} />
    </div>
  );
};

export default Note;
