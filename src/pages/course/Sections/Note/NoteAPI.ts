import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const fetchAllNotes = async (courseID: string) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);

    const response = await axios.get(
      `${baseURL}/courses/${encodedCourseID}/notes`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCourseConfig = async (courseID: string) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);

    const response = await axios.get(`${baseURL}/courses/${encodedCourseID}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const openNote = async (courseID: string, noteName: string) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedNoteName = encodeURIComponent(noteName);

    await axios.get(
      `${baseURL}/courses/${encodedCourseID}/notes/open-note/${encodedNoteName}`
    );
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (courseID: string, noteName: string) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedNoteName = encodeURIComponent(noteName);

    await axios.delete(
      `${baseURL}/courses/${encodedCourseID}/notes/${encodedNoteName}`
    );
  } catch (error) {
    throw error;
  }
};

export const addNote = async (courseID: string, noteData: any) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedNoteData = encodeURIComponent(noteData.name);

    const response = await axios.post(
      `${baseURL}/courses/${encodedCourseID}/notes`,
      encodedNoteData
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const renumberNote = async (
  courseID: string,
  oldNumber: number,
  newNumber: number
) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedOldNumber = encodeURIComponent(oldNumber);
    const encodedNewNumber = encodeURIComponent(newNumber);

    const searchParams = `old-number=${encodedOldNumber}&new-number=${encodedNewNumber}`;
    const response = await axios.get(
      `${baseURL}/courses/${encodedCourseID}/notes/renumber-note?${searchParams}`
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

export const retitleNote = async (
  courseID: string,
  noteNumber: number,
  newTitle: string
) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedNoteNumber = encodeURIComponent(noteNumber);
    const encodedNewTitle = encodeURIComponent(newTitle);

    const searchParams = `new-title=${encodedNewTitle}&note-number=${encodedNoteNumber}`;
    await axios.get(
      `${baseURL}/courses/${encodedCourseID}/notes/retitle-note?${searchParams}`
    );
  } catch (error) {
    throw error;
  }
};
