import React from 'react';
import { BsTrash } from 'react-icons/bs';

import * as API from './NoteAPI';
import * as Types from './NoteTypes';
import * as Utils from './utils';

import PDFSymbol from '../../../../components/common/Symbols/PDF';
import SubItemTitle from '../../../../components/common/SubItemTitle/SubItemTitle';
import TEXSymbol from '../../../../components/common/Symbols/TEX';
import { deleteNotePopup } from './Popup';

export const DisplayPersonalNote = ({
  note,
  index,
  editMode,
  setEditMode,
  notesType,
  renumberNote,
  retitleNote,
}: Types.DisplayPersonalNoteProps) => {
  const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const newNumber = parseInt(e.currentTarget.value);
    e.currentTarget.blur();
    renumberNote({
      oldNumber: note.number,
      newNumber,
      index,
    });
    setEditMode(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const newTitle = e.currentTarget.value;
    e.currentTarget.blur();
    retitleNote({
      noteNumber: note.number,
      newTitle,
      index,
    });
    setEditMode(false);
  };

  return editMode ? (
    <div className="input-container">
      <label>{notesType === 'Lectures' ? 'Lec' : 'Chap'}</label>
      <input
        className="note-number"
        placeholder="#"
        type="number"
        defaultValue={note.number || 0}
        onKeyDown={handleNumberKeyDown}
      />
      :
      <input
        className="note-name"
        placeholder="Note Name"
        type="text"
        spellCheck={false}
        defaultValue={note.name || ''}
        onInput={Utils.handleInputChange}
        onKeyDown={handleTitleKeyDown}
      />
    </div>
  ) : (
    <>
      {note.texPath && Utils.convertFileNameToDisplayName(note.texPath)}
      {note.texPath && note.name && ': '}
      {note.name && note.name}
    </>
  );
};

export const DisplayOtherNote = ({
  note,
  editMode,
}: Types.DisplayOtherNoteProps) => {
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
        defaultValue={Utils.convertFileNameToDisplayName(note.pdfPath || '')}
        onInput={Utils.handleInputChange}
      />
    </div>
  ) : (
    `${suffix}${Utils.convertFileNameToDisplayName(note.pdfPath || '')}`
  );
};

const DisplayNotes = ({
  data,
  title,
  editMode,
  setEditMode,
  courseID,
  notesType,
  deletePopup,
  setDeletePopup,
  renumberNote,
  retitleNote,
}: Types.DisplayNotesProps) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div>
        <SubItemTitle title={title} />
        No Notes.
      </div>
    );
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
                    onClick={() => (setDeletePopup(!deletePopup))}
                  />
                  <span style={{ marginLeft: '8px' }}>
                    {note.type === 'lecture'
                      ? DisplayPersonalNote({
                        note,
                        index,
                        editMode,
                        setEditMode,
                        notesType,
                        renumberNote,
                        retitleNote,
                      })
                      : DisplayOtherNote({ note, editMode })}
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
                      <TEXSymbol
                        onClick={() =>
                          API.openNote(courseID, note.texPath || '')
                        }
                      />
                    </span>
                  )}
                </span>
                <span>
                  {note.pdf && (
                    <span className="note-table-icon">
                      <PDFSymbol
                        onClick={() =>
                          API.openNote(courseID, note.pdfPath || '')
                        }
                      />
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

export default DisplayNotes;
