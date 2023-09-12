import { NoteTypes } from './index';

export type DisplayPersonalNoteProps = {
  note: NoteTypes.NoteItem;
  index: number;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  notesType: string;
  renumberNote: (props: NoteTypes.renumberNoteProps) => void;
  retitleNote: (props: NoteTypes.retitleNoteProps) => void;
};

export type DisplayOtherNoteProps = {
  note: NoteTypes.NoteItem;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  index: number;
  noteType: string;
  renameNote: (props: NoteTypes.renameNoteProps) => void;
};

export type DisplayNotesProps = {
  data: { [key: string]: NoteTypes.NoteItem };
  dataType: string;
  title: string;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  courseID: string;
  notesType: string;
  deletePopup: boolean;
  setDeletePopup: (editMode: boolean) => void;
  setDeleteIndex: (index: number) => void;
  setDeleteType: (type: string) => void;
  renumberNote: (props: NoteTypes.renumberNoteProps) => void;
  retitleNote: (props: NoteTypes.retitleNoteProps) => void;
  renameNote: (props: NoteTypes.renameNoteProps) => void;
};
