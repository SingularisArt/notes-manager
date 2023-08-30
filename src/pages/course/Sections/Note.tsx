import React, { useEffect, useState } from "react";
import axios from "axios";

import TEXSymbol from "../../../components/common/Symbols/TEX";
import PDFSymbol from "../../../components/common/Symbols/PDF";

import SubItemTitle from "../../../components/common/SubItemTitle";

interface NoteItem {
  name: string;
  texPath: string;
  pdfPath: string;
  tex: boolean;
  pdf: boolean;
  type: string;
}

interface Data {
  notes: string[];
  onlineNotes: string[];
  examReviews: string[];
}

function getFileType(filename: string): string {
  if (filename.endsWith(".tex")) {
    return "tex";
  } else if (filename.endsWith(".pdf")) {
    return "pdf";
  }
  return "";
}

function checkIfFileInArray(filePath: string, fileTypeToReplace: string, fileTypeToCheck: string, array: string[]): boolean {
  const modifiedFilePath = filePath.replace(fileTypeToReplace, fileTypeToCheck);
  return array.includes(modifiedFilePath);
}

function OpenPDF(path: string): void {
  const pdfLocation = encodeURIComponent(path.replace("tex", "pdf"));
  const url = `http://localhost:3000/open-pdf/${pdfLocation}`;

  axios.get(url)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error("Error opening PDF:", error.message);
    });
}

function OpenFile(path: string): void {
  const fileLocation = encodeURIComponent(path);
  const url = `http://localhost:3000/open-file/${fileLocation}`;

  axios.get(url)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error("Error opening file:", error.message);
    });
}

function transformString(inputString: string) {
  const newString = inputString.replace(/^.*[\\\/]/, "");
  const replacedNumbers = newString.replace(/(^|\D)0+(\d+)/g, "$1$2");

  const capitalizedString = replacedNumbers
    .split("/")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("/");

  const stringWithSpaces = capitalizedString.replace(/-/g, " ");
  const withoutExtension = stringWithSpaces.replace(/\.\w+$/, "");
  const finalString = withoutExtension
    .replace("Lec", "Lecture")
    .replace("Chap", "Chapter");

  return finalString;
}

const DisplayNotes: React.FC<{ data: NoteItem[] }> = ({ data }) => {
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        {data.map((note) => (
          <tr key={note.name}>
            <td style={{ paddingLeft: "25px" }}>{note.name}</td>
            <td style={{ textAlign: "right" }}>
              <span>
                {note.pdf && (
                  <span
                    style={{
                      paddingRight: note.pdf && note.tex ? "10px" : "0px",
                      verticalAlign: "middle",
                    }}
                  >
                    <PDFSymbol onClick={() => OpenPDF(note.pdfPath)} />
                  </span>
                )}
                {note.tex && (
                  <span style={{ verticalAlign: "middle" }}>
                    <TEXSymbol onClick={() => OpenFile(note.texPath)} />
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

const Note: React.FC = () => {
  const [data, setData] = useState<Data>({
    notes: [],
    onlineNotes: [],
    examReviews: [],
  });
  const [lecOrChapNotes, setLecOrChapNotes] = useState<NoteItem[]>([]);
  const [onlineNotes, setOnlineNotes] = useState<NoteItem[]>([]);
  const [reviewNotes, setReviewNotes] = useState<NoteItem[]>([]);
  const [key, setKey] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const url = window.location.href;
    const newKey = url.split("/").pop();
    setKey(newKey ?? "");

    const debounceTimeout = setTimeout(() => {
      setIsLoading(true);
      const fetchAllNotes = async () => {
        const res = await axios.get<Data>(`http://localhost:3000/courses/${newKey}/notes`);
        setData(res.data);

        const noteData: NoteItem[] = [];
        data.notes.forEach((filePath) => {
          const fileType = getFileType(filePath);
          const tex = checkIfFileInArray(filePath, "pdf", "tex", data.notes);
          const pdf = checkIfFileInArray(filePath, "tex", "pdf", data.notes);

          if (fileType === "pdf" && tex && pdf) return;

          noteData.push({
            name: transformString(filePath),
            texPath: tex ? filePath.replace(".pdf", ".tex") : "",
            pdfPath: pdf ? filePath.replace(".tex", ".pdf") : "",
            tex: tex,
            pdf: pdf,
            type: "lecture",
          });
        });

        const onlineNotesData: NoteItem[] = [];
        data.onlineNotes.forEach((filePath) => {
          onlineNotesData.push({
            name: transformString(filePath),
            texPath: "",
            pdfPath: filePath,
            tex: false,
            pdf: true,
            type: "online",
          });
        });

        const reviewNotesData: NoteItem[] = [];
        data.examReviews.forEach((filePath) => {
          reviewNotesData.push({
            name: transformString(filePath),
            texPath: "",
            pdfPath: filePath,
            tex: false,
            pdf: true,
            type: "review",
          });
        });

        setLecOrChapNotes(noteData);
        setOnlineNotes(onlineNotesData);
        setReviewNotes(reviewNotesData);
        setIsLoading(false);
      };
      fetchAllNotes();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [key]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(lecOrChapNotes);
  if (data.notes.length === 0 && lecOrChapNotes.length === 0 && onlineNotes.length === 0 && reviewNotes.length === 0) {
    return (
      <div style={{ paddingTop: "20px" }}>
        <SubItemTitle title="No Notes" />
      </div>
    );
  }

  return (
    <div style={{ lineHeight: 2.5 }}>
      <SubItemTitle title="Lecture Notes" />

      {lecOrChapNotes.length === 0 ? (
        <div>No Notes.</div>
      ) : (
        <DisplayNotes data={lecOrChapNotes} />
      )}

      <SubItemTitle title="Online Lecture Notes" />

      {onlineNotes.length === 0 ? (
        <div>No Online Lecture Notes.</div>
      ) : (
        <DisplayNotes data={onlineNotes} />
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
