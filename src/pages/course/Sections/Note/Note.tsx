import React from 'react';

import * as API from './NoteAPI';
import * as PopupFunctions from './Popup';

import { useEffect, useState } from 'react';
import { NoteTypes } from './Types/index';

import DisplayNotes from './DisplayNote';
import NoteHeader from './NoteHeader';

import Loader from 'components/common/Loader';
import Popup from 'components/common/Popup/Popup';
import Item from 'components/common/Item';

import './Note.css';

const Note: React.FC<NoteTypes.NoteProps> = ({ courseID }) => {
  const [data, setData] = useState<NoteTypes.Data>({
    notesData: {},
    onlineNotesData: {},
    examReviewNotesData: {},
  });
  const [newNoteData, setNewNoteData] = useState<NoteTypes.NewNoteItem>({
    name: '',
    number: 0,
    note: '',
  });

  const [notesType, setNotesType] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState<boolean>(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number>(0);
  const [deleteType, setDeleteType] = useState<string>('');

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const notesData = await API.fetchAllNotes({ courseID: courseID });
        const courseData = await API.fetchCourseConfig({ courseID: courseID });
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
    return (
      <>
        <Item>
          <NoteHeader editMode={editMode} setEditMode={setEditMode} />
          <div style={{ height: '600px' }}></div>
          <Loader />
        </Item>
      </>
    );
  }

  const sortData: (props: NoteTypes.sortDataProps) => NoteTypes.NoteItem[] = ({
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

  const createNote = async () => {
    const newDataResponse = await API.createNote({
      courseID: courseID,
      noteName: newNoteData.name,
      noteNumber: newNoteData.number,
      noteText: newNoteData.note,
    });
    const newData: NoteTypes.NoteItem = newDataResponse.data;

    setData((prevData) => {
      const newKey = Object.keys(prevData.notesData).length;
      const updatedNotesData = { ...prevData.notesData };
      updatedNotesData[newKey] = newData;

      return {
        ...prevData,
        notesData: updatedNotesData,
      };
    });
  };

  const deleteNote = async () => {
    if (!data[deleteType][deleteIndex]) {
      return;
    }

    const noteToDelete = data[deleteType][deleteIndex];
    const pathWithExtension = noteToDelete.pdfPath || noteToDelete.texPath;
    const pathWithoutExtension = pathWithExtension.split('.')[0];

    setData((prevData) => {
      const newData = { ...prevData };
      delete newData[deleteType][deleteIndex];

      const updatedData = Object.values(newData[deleteType]);
      newData[deleteType] = updatedData;

      return newData;
    });

    await API.deleteNote({
      courseID: courseID,
      notePath: pathWithoutExtension,
    });
  };

  const renameNote: (props: NoteTypes.renameNoteProps) => void = async ({
    oldTitle,
    newTitle,
    noteType,
    index,
  }) => {
    if (oldTitle === newTitle || !newTitle) {
      return;
    }

    await API.renameNote({
      courseID: courseID,
      oldTitle: oldTitle,
      newTitle: newTitle,
    });

    setData((prevData) => {
      const newData = { ...prevData };
      const note = newData[noteType][index];

      if (note.pdf) {
        let folder = note.pdfPath.split('/')[0];
        if (folder === note.pdfPath) folder = '';
        else folder += '/';

        note.pdfPath = `${folder}${newTitle}.pdf`;
      }

      if (note.tex) {
        let folder = note.texPath.split('/')[0];
        if (folder === note.texPath) folder = '';
        else folder += '/';

        note.texPath = `${folder}${newTitle}.tex`;
      }

      return newData;
    });
  };

  const renumberNote: (props: NoteTypes.renumberNoteProps) => void = async ({
    oldNumber,
    newNumber,
    index,
  }) => {
    if (oldNumber === newNumber || !newNumber) {
      return;
    }
    await API.renumberNote({
      courseID: courseID,
      oldNumber: oldNumber,
      newNumber: newNumber,
    });

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

  const retitleNote: (props: NoteTypes.retitleNoteProps) => void = async ({
    noteNumber,
    newTitle,
    index,
  }) => {
    if (!newTitle) return;

    await API.retitleNote({
      courseID: courseID,
      noteNumber: noteNumber,
      newTitle: newTitle,
    });

    const newData = { ...data };
    newData.notesData[index].name = newTitle;

    setData(newData);
  };

  if (Object.keys(data).length === 0) {
    return <div>No Notes.</div>;
  }

  return (
    <Item onClick={() => setIsAddPopupOpen(true)}>
      <div className="notes">
        <NoteHeader editMode={editMode} setEditMode={setEditMode} />

        <DisplayNotes
          data={data.notesData}
          dataType="notesData"
          title={`${notesType.slice(0, -1)} Notes`}
          editMode={editMode}
          setEditMode={setEditMode}
          courseID={courseID}
          notesType={notesType}
          deletePopup={isDeletePopupOpen}
          setDeletePopup={setIsDeletePopupOpen}
          setDeleteIndex={setDeleteIndex}
          setDeleteType={setDeleteType}
          renumberNote={renumberNote}
          retitleNote={retitleNote}
          renameNote={renameNote}
        />
        <DisplayNotes
          data={data.onlineNotesData}
          dataType="onlineNotesData"
          title="Professor Notes"
          editMode={editMode}
          setEditMode={setEditMode}
          courseID={courseID}
          notesType={notesType}
          deletePopup={isDeletePopupOpen}
          setDeletePopup={setIsDeletePopupOpen}
          setDeleteIndex={setDeleteIndex}
          setDeleteType={setDeleteType}
          renumberNote={renumberNote}
          retitleNote={retitleNote}
          renameNote={renameNote}
        />
        <DisplayNotes
          data={data.examReviewNotesData}
          dataType="examReviewNotesData"
          title="Exam Review"
          editMode={editMode}
          setEditMode={setEditMode}
          courseID={courseID}
          notesType={notesType}
          deletePopup={isDeletePopupOpen}
          setDeletePopup={setIsDeletePopupOpen}
          setDeleteIndex={setDeleteIndex}
          setDeleteType={setDeleteType}
          renumberNote={renumberNote}
          retitleNote={retitleNote}
          renameNote={renameNote}
        />

        <Popup
          className="add-popup"
          isOpen={isAddPopupOpen}
          onClose={() => setIsAddPopupOpen(false)}
          content={PopupFunctions.addNotePopup({
            notesType: notesType.slice(0, -1),
            data: newNoteData,
            setData: setNewNoteData,
          })}
          onOk={() => {
            setIsAddPopupOpen(false);
            setEditMode(false);
            createNote();
          }}
        />

        <Popup
          className="delete-popup"
          isOpen={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
          onOk={() => {
            setIsDeletePopupOpen(false);
            setEditMode(false);
            deleteNote();
          }}
          centerButtons={true}
          content={PopupFunctions.deleteNotePopup()}
        />
      </div>
    </Item>
  );
};

export default Note;
