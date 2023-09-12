export type NoteItem = {
  name: string;
  texPath: string;
  pdfPath: string;
  tex: boolean;
  pdf: boolean;
  number: number;
  type: string;
  visible: boolean;
};

export type Data = {
  notesData: { [key: string]: NoteItem };
  onlineNotesData: { [key: string]: NoteItem };
  examReviewNotesData: { [key: string]: NoteItem };
};

export type NewNoteItem = {
  name: string;
  number: number;
  note: string;
};

export type NoteProps = {
  courseID: string;
};

export type sortDataProps = {
  dataItems: NoteItem[];
  type: string;
};

export type createNoteProps = {};

export type deleteNoteProps = {
  note: NoteItem;
  index: number;
};

export type renameNoteProps = {
  oldTitle: string;
  newTitle: string;
  noteType: string;
  index: number;
};

export type renumberNoteProps = {
  oldNumber: number;
  newNumber: number;
  index: number;
};

export type retitleNoteProps = {
  noteNumber: number;
  newTitle: string;
  index: number;
};
