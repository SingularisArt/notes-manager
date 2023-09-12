export type fetchAllNotesProps = {
  courseID: string;
};

export type fetchCourseConfigProps = {
  courseID: string;
}

export type openNoteProps = {
  courseID: string;
  noteName: string;
}

export type createNoteProps = {
  courseID: string;
  noteName: string;
  noteNumber: number;
  noteText: string;
};

export type deleteNoteProps = {
  courseID: string;
  notePath: string;
};

export type renameNoteProps = {
  courseID: string;
  oldTitle: string;
  newTitle: string;
};

export type renumberNoteProps = {
  courseID: string;
  oldNumber: number;
  newNumber: number;
};

export type retitleNoteProps = {
  courseID: string;
  noteNumber: number;
  newTitle: string;
};
