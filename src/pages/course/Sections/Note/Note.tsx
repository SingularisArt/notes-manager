import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BsTrash } from 'react-icons/bs';

import ItemTitle from 'components/common/ItemTitle/ItemTitle';
import PDFSymbol from 'components/common/Symbols/PDF';
import SubItemTitle from 'components/common/SubItemTitle/SubItemTitle';
import TEXSymbol from 'components/common/Symbols/TEX';

import './Note.css';

type NoteItem = {
  name: string;
  texPath: string;
  pdfPath: string;
  tex: boolean;
  pdf: boolean;
  number: number;
  type: string;
};

type Data = {
  notesData: { [key: string]: NoteItem };
  onlineNotesData: { [key: string]: NoteItem };
  examReviewNotesData: { [key: string]: NoteItem };
};

type NoteProps = {
  courseID: string;
};

const Note: React.FC<NoteProps> = ({ courseID }) => {
  const [data, setData] = useState<Data>({
    notesData: {},
    onlineNotesData: {},
    examReviewNotesData: {},
  });
  const [notesType, setNotesType] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const notesData = await axios.get<Data>(
          `http://localhost:3000/courses/${courseID}/notes`
        );

        setData(notesData.data);
        setIsLoading(false);

        const courseData = await axios.get(
          `http://localhost:3000/courses/${courseID}`
        );
        const type = courseData.data.notes_type;
        const upperCase = type.charAt(0).toUpperCase() + type.slice(1);

        setNotesType(upperCase);
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

  const sortData = (dataItems: NoteItem[], type: string): NoteItem[] => {
    if (dataItems.length === 0) return dataItems;

    if (type === 'lecture') {
      const lectureNotes = dataItems.filter((item) => item.type === 'lecture');
      const otherNotes = dataItems.filter((item) => item.type !== 'lecture');
      const sortedLectureNotes = lectureNotes.sort(
        (a, b) => a.number - b.number
      );

      return [...otherNotes, ...sortedLectureNotes];
    } else
      return dataItems.slice().sort((a, b) => a.name.localeCompare(b.name));
  };

  const convertFileNameToDisplayName = (fileName: string) => {
    const splitFileName = fileName.split('/');
    const displayName = splitFileName[splitFileName.length - 1]
      .split('.')[0]
      .replace(/-/g, ' ')
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    return displayName.replace(/0([1-9])/g, '$1');
  };

  const openNote = async (noteName: string) => {
    const encodedNoteName = encodeURIComponent(noteName);
    await axios.get(
      `http://localhost:3000/courses/${courseID}/notes/open-note/${encodedNoteName}`
    );
  };

  // const deleteNote = async (note: NoteItem, index: number) => {};
  // const addNote = async (noteName: string, noteNumber: number) => {};
  // const renameNote = async (oldNoteName: number, newNoteName: number, index: number) => {};

  const renumberNote = async (
    oldNumber: number,
    newNumber: number,
    index: number
  ) => {
    if (oldNumber === newNumber) return;
    if (!newNumber) return;

    const searchParams = `old-number=${oldNumber}&new-number=${newNumber}`;
    const status = await axios.get(
      `http://localhost:3000/courses/${courseID}/notes/renumber-note?${searchParams}`
    );

    if (status.data === 'Exists') {
      alert('Note with that number already exists.');
      return;
    }

    const newData = { ...data };
    const note = newData.notesData[index];

    note.number = newNumber;
    if (note.pdf)
      note.pdfPath = note.pdfPath.replace(`${oldNumber}`, `${newNumber}`);
    if (note.tex)
      note.texPath = note.texPath.replace(`${oldNumber}`, `${newNumber}`);

    newData.notesData = sortData(Object.values(newData.notesData), 'lecture');

    setData(newData);
  };

  const reTitleNote = async (
    noteNumber: number,
    newTitle: string,
    index: number
  ) => {
    if (!newTitle) return;

    const encodedNoteTitle = encodeURIComponent(newTitle);
    const searchParams = `new-title=${encodedNoteTitle}&note-number=${noteNumber}`;
    await axios.get(
      `http://localhost:3000/courses/${courseID}/notes/retitle-note?${searchParams}`
    );

    const newData = { ...data };
    newData.notesData[index].name = newTitle;

    setData(newData);
  };

  if (Object.keys(data).length === 0) {
    return <div>No Notes.</div>;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.style.width = `${(event.target.value.length + 1) * 8}px`;
  };

  const displayPersonalNote = (note: NoteItem, index: number) => {
    return editMode ? (
      <div className="input-container">
        <label>{notesType === 'Lectures' ? 'Lec' : 'Chap'}</label>
        <input
          className="note-number"
          placeholder="#"
          type="number"
          defaultValue={note.number}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return;
            const newNumber = parseInt(e.currentTarget.value);
            e.currentTarget.blur();
            renumberNote(note.number, newNumber, index);
            setEditMode(false);
          }}
        />
        :
        <input
          className="note-name"
          placeholder="Note Name"
          type="text"
          spellCheck={false}
          defaultValue={note.name}
          onInput={handleInputChange}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return;
            const newTitle = e.currentTarget.value;
            e.currentTarget.blur();
            reTitleNote(note.number, newTitle, index);
            setEditMode(false);
          }}
        />
      </div>
    ) : (
      <>
        {note.texPath && convertFileNameToDisplayName(note.texPath)}
        {note.texPath && note.name && ': '}
        {note.name && note.name}
      </>
    );
  };

  const displayOtherNote = (note: NoteItem) => {
    const suffix =
      note.type === 'practice'
        ? 'Practice: '
        : note.type === 'answer'
          ? 'Answer: '
          : '';

    return editMode ? (
      <div className="input-container">
        {suffix}
        <input
          className="note-name"
          placeholder="Note Name"
          type="text"
          spellCheck={false}
          defaultValue={convertFileNameToDisplayName(note.pdfPath)}
          onInput={handleInputChange}
        />
      </div>
    ) : (
      `${suffix}${convertFileNameToDisplayName(note.pdfPath)}`
    );
  };

  const displayNotes = ({
    data,
    title,
  }: {
    data: { [key: string]: NoteItem };
    title: string;
  }) => {
    if (!data || Object.keys(data).length === 0) {
      return null;
    }

    return (
      <>
        <SubItemTitle title={title} />

        <table className="note-table">
          <tbody>
            {Object.values(data).map((note, index) => (
              <tr key={index}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BsTrash
                      className={`edit-note ${editMode ? 'enable' : 'disable'}`}
                    />
                    <span style={{ marginLeft: '8px' }}>
                      {note.type === 'lecture'
                        ? displayPersonalNote(note, index)
                        : displayOtherNote(note)}
                    </span>
                  </div>
                </td>
                <td className="note-table-icon-container">
                  <span>
                    {note.tex && (
                      <span
                        className="note-table-icon"
                        style={{
                          paddingRight: note.pdf ? '20px' : '54px',
                        }}
                      >
                        <TEXSymbol onClick={() => openNote(note.texPath)} />
                      </span>
                    )}
                  </span>
                  <span>
                    {note.pdf && (
                      <span className="note-table-icon">
                        <PDFSymbol onClick={() => openNote(note.pdfPath)} />
                      </span>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div className="notes">
      <ItemTitle
        title="Notes"
        onIconClick={(): void => setEditMode(!editMode)}
      />

      {displayNotes({
        data: data.notesData,
        title: `${notesType.slice(0, -1)} Notes`,
      })}
      {displayNotes({ data: data.onlineNotesData, title: 'Professor Notes' })}
      {displayNotes({ data: data.examReviewNotesData, title: 'Exam Review' })}
    </div>
  );
};

export default Note;
