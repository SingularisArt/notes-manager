import axios from 'axios';

import { NoteAPITypes } from './Types/index';

const baseURL = 'http://localhost:3000/courses';

export const fetchAllNotes = async ({
  courseID,
}: NoteAPITypes.fetchAllNotesProps) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);

    const response = await axios.get(
      `${baseURL}/${encodedCourseID}/notes`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCourseConfig = async ({
  courseID,
}: NoteAPITypes.fetchCourseConfigProps) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);

    const response = await axios.get(`${baseURL}/${encodedCourseID}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const openNote = async ({
  courseID,
  noteName,
}: NoteAPITypes.openNoteProps) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedNoteName = encodeURIComponent(noteName);

    await axios.get(
      `${baseURL}/${encodedCourseID}/notes/open-note/${encodedNoteName}`
    );
  } catch (error) {
    throw error;
  }
};

export const createNote = async ({
  courseID,
  noteName,
  noteNumber,
  noteText,
}: NoteAPITypes.createNoteProps) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedNoteName = encodeURIComponent(noteName);
    const encodedNoteNumber = encodeURIComponent(noteNumber);
    const encodedNoteText = encodeURIComponent(noteText);

    const searchParams = `note-name=${encodedNoteName}&note-number=${encodedNoteNumber}&note-text=${encodedNoteText}`;
    const data = await axios.get(
      `${baseURL}/${encodedCourseID}/notes/create-note?${searchParams}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async ({
  courseID,
  notePath,
}: NoteAPITypes.deleteNoteProps) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedNotePath = encodeURIComponent(notePath);

    await axios.get(
      `${baseURL}/${encodedCourseID}/notes/delete-note/${encodedNotePath}`
    );
  } catch (error) {
    throw error;
  }
};

export const renameNote = async ({
  courseID,
  oldTitle,
  newTitle,
}: NoteAPITypes.renameNoteProps) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedOldTitle = encodeURIComponent(oldTitle);
    const encodedNewTitle = encodeURIComponent(newTitle);

    const searchParams = `old-title=${encodedOldTitle}&new-title=${encodedNewTitle}`;
    const response = await axios.get(
      `${baseURL}/${encodedCourseID}/notes/rename-note?${searchParams}`
    );

    if (response.data === 'Exists') {
      alert('Note with that name already exists.');
      return;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const renumberNote = async ({
  courseID,
  oldNumber,
  newNumber,
}: NoteAPITypes.renumberNoteProps) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedOldNumber = encodeURIComponent(oldNumber);
    const encodedNewNumber = encodeURIComponent(newNumber);

    const searchParams = `old-number=${encodedOldNumber}&new-number=${encodedNewNumber}`;
    const response = await axios.get(
      `${baseURL}/${encodedCourseID}/notes/renumber-note?${searchParams}`
    );

    if (response.data === 'Exists') {
      alert('Note with that number already exists.');
      return;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const retitleNote = async ({
  courseID,
  noteNumber,
  newTitle,
}: NoteAPITypes.retitleNoteProps) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedNoteNumber = encodeURIComponent(noteNumber);
    const encodedNewTitle = encodeURIComponent(newTitle);

    const searchParams = `new-title=${encodedNewTitle}&note-number=${encodedNoteNumber}`;
    await axios.get(
      `${baseURL}/${encodedCourseID}/notes/retitle-note?${searchParams}`
    );
  } catch (error) {
    throw error;
  }
};
