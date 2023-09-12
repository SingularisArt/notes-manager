import { NoteTypes } from './index';

export type addNotePopupProps = {
  notesType: string;
  data: NoteTypes.NewNoteItem,
  setData: (data: NoteTypes.NewNoteItem) => void;
};

export type deleteNotePopupProps = {
  notesType: string;
};
