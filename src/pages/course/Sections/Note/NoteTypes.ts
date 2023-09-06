export type NoteItem = {
  name: string;
  texPath: string;
  pdfPath: string;
  tex: boolean;
  pdf: boolean;
  number: number;
  type: string;
};

export type Data = {
  notesData: { [key: string]: NoteItem };
  onlineNotesData: { [key: string]: NoteItem };
  examReviewNotesData: { [key: string]: NoteItem };
};

export type NoteProps = {
  courseID: string;
};

export type sortDataProps = {
  dataItems: NoteItem[];
  type: string;
};

export type addNote = {};

export type deleteNoteProps = {
  note: NoteItem;
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

export type renameNoteProps = {
  noteNumber: number;
  newTitle: string;
  index: number;
};

export type addNotePopupProps = {
  notesType: string;
};

export type deleteNotePopupProps = {
  notesType: string;
};

export type DisplayNotesProps = {
  data: { [key: string]: NoteItem };
  title: string;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  courseID: string;
  notesType: string;
  deletePopup: boolean;
  setDeletePopup: (editMode: boolean) => void;
  renumberNote: (props: renumberNoteProps) => void;
  retitleNote: (props: retitleNoteProps) => void;
};

export type DisplayOtherNoteProps = {
  note: NoteItem;
  editMode: boolean;
};

export type DisplayPersonalNoteProps = {
  note: NoteItem;
  index: number;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  notesType: string;
  renumberNote: (props: renumberNoteProps) => void;
  retitleNote: (props: retitleNoteProps) => void;
};
