import React, { useEffect, useState } from 'react';

import * as API from './NoteAPI';
import * as Types from './NoteTypes';
import * as PopupFunctions from 'utils/Popup';

import DisplayNotes from './DisplayNote';
import NoteHeader from './NoteHeader';

import Popup from 'components/common/Popup/Popup';
import Item from 'components/common/Item';
import SubItemTitle from 'components/common/SubItemTitle/SubItemTitle';

import './Note.css';

const Note: React.FC<Types.NoteProps> = ({ courseID }) => {
  const [data, setData] = useState<Types.Data>({
    notesData: {},
    onlineNotesData: {},
    examReviewNotesData: {},
  });
  const [notesType, setNotesType] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState<boolean>(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const notesData = await API.fetchAllNotes(courseID);
        const courseData = await API.fetchCourseConfig(courseID);
        const type = courseData.notes_type;
        const upperCase = type.charAt(0).toUpperCase() + type.slice(1);

        setData(notesData);
        setNotesType(upperCase);
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

  const sortData: (props: Types.sortDataProps) => Types.NoteItem[] = ({
    dataItems,
    type,
  }) => {
    if (dataItems.length === 0) return dataItems;

    if (type === 'lecture') {
      const lectureNotes = dataItems.filter((item) => item.type === 'lecture');
      const otherNotes = dataItems.filter((item) => item.type !== 'lecture');
      const sortedLectureNotes = lectureNotes.sort(
        (a, b) => a.number - b.number
      );

      return [...otherNotes, ...sortedLectureNotes];
    } else {
      return dataItems.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const openAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const okAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const okDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setEditMode(false);
  };

  const deleteNote: (props: Types.deleteNoteProps) => void = ({
    note,
    index,
  }) => {
    // Implement deleteNote function
  };

  const renameNote: (props: Types.renameNoteProps) => void = async ({
    noteNumber,
    newTitle,
    index,
  }) => {
    // Implement reNumberNote function
  };

  const renumberNote: (props: Types.renumberNoteProps) => void = async ({
    oldNumber,
    newNumber,
    index,
  }) => {
    if (oldNumber === newNumber || !newNumber) {
      return;
    }
    await API.renumberNote(courseID, oldNumber, newNumber);

    setData((prevData) => {
      const newData = { ...prevData };
      const note = newData.notesData[index];

      note.number = newNumber;
      if (note.pdf)
        note.pdfPath = note.pdfPath.replace(`${oldNumber}`, `${newNumber}`);
      if (note.tex)
        note.texPath = note.texPath.replace(`${oldNumber}`, `${newNumber}`);

      newData.notesData = sortData({
        dataItems: Object.values(newData.notesData),
        type: 'lecture',
      });

      return newData;
    });
  };

  const retitleNote: (props: Types.retitleNoteProps) => void = async ({
    noteNumber,
    newTitle,
    index,
  }) => {
    if (!newTitle) return;

    await API.retitleNote(courseID, noteNumber, newTitle);

    const newData = { ...data };
    newData.notesData[index].name = newTitle;

    setData(newData);
  };

  if (Object.keys(data).length === 0) {
    return <div>No Notes.</div>;
  }

  return (
    <Item onClick={openAddPopup}>
      <div className="notes">
        <NoteHeader editMode={editMode} setEditMode={setEditMode} />

        <DisplayNotes
          data={data.notesData}
          title={`${notesType.slice(0, -1)} Notes`}
          editMode={editMode}
          setEditMode={setEditMode}
          courseID={courseID}
          notesType={notesType}
          deletePopup={isDeletePopupOpen}
          setDeletePopup={setIsDeletePopupOpen}
          renumberNote={renumberNote}
          retitleNote={retitleNote}
        />
        <DisplayNotes
          data={data.onlineNotesData}
          title="Professor Notes"
          editMode={editMode}
          setEditMode={setEditMode}
          courseID={courseID}
          notesType={notesType}
          deletePopup={isDeletePopupOpen}
          setDeletePopup={setIsDeletePopupOpen}
          renumberNote={renumberNote}
          retitleNote={retitleNote}
        />
        <DisplayNotes
          data={data.examReviewNotesData}
          title="Exam Review"
          editMode={editMode}
          setEditMode={setEditMode}
          courseID={courseID}
          notesType={notesType}
          deletePopup={isDeletePopupOpen}
          setDeletePopup={setIsDeletePopupOpen}
          renumberNote={renumberNote}
          retitleNote={retitleNote}
        />

        <Popup
          className="add-popup"
          isOpen={isAddPopupOpen}
          onClose={() => setIsAddPopupOpen(false)}
          onOk={okAddPopup}
          content={PopupFunctions.addNotePopup({
            notesType: notesType.slice(0, -1),
          })}
        />

        <Popup
          className="delete-popup"
          isOpen={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
          onOk={okDeletePopup}
          centerButtons={true}
          content={PopupFunctions.deleteNotePopup({
            notesType: notesType.slice(0, -1),
          })}
        />
      </div>
    </Item>
  );
};

export default Note;
