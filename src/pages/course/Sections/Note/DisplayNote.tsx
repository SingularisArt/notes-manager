import React from 'react';

import * as API from './NoteAPI';
import * as Utils from './utils';

import { BsTrash } from 'react-icons/bs';
import { DisplayNotesTypes } from './Types/index';

import PDFSymbol from '../../../../components/common/Symbols/PDF';
import SubItemTitle from '../../../../components/common/SubItemTitle/SubItemTitle';
import TEXSymbol from '../../../../components/common/Symbols/TEX';

export const DisplayPersonalNote = ({
  note,
  index,
  editMode,
  setEditMode,
  notesType,
  renumberNote,
  retitleNote,
}: DisplayNotesTypes.DisplayPersonalNoteProps) => {
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
      {note.texPath &&
        Utils.convertFileNameToDisplayName({ fileName: note.texPath })}
      {note.texPath && note.name && ': '}
      {note.name && note.name}
    </>
  );
};

export const DisplayOtherNote = ({
  note,
  editMode,
  setEditMode,
  index,
  noteType,
  renameNote,
}: DisplayNotesTypes.DisplayOtherNoteProps) => {
  const suffix =
    note.type === 'practice'
      ? 'Practice: '
      : note.type === 'answer'
        ? 'Answer: '
        : '';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const oldTitlePath = note.pdfPath || note.texPath;

    const newName = e.currentTarget.value;
    const newTitle = Utils.convertDisplayNameToFileName({
      displayName: newName,
      extension: '',
    });

    renameNote({
      oldTitle: oldTitlePath,
      newTitle: newTitle,
      noteType: noteType,
      index: index,
    });

    e.currentTarget.blur();
    setEditMode(false);
  };

  return editMode ? (
    <div className="input-container">
      {suffix}
      <input
        className="note-name"
        placeholder="Note Name"
        type="text"
        spellCheck={false}
        defaultValue={Utils.convertFileNameToDisplayName({
          fileName: note.pdfPath || '',
        })}
        onInput={Utils.handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  ) : (
    `${suffix}${Utils.convertFileNameToDisplayName({
      fileName: note.pdfPath || '',
    })}`
  );
};

const DisplayNotes = ({
  data,
  dataType,
  title,
  editMode,
  setEditMode,
  courseID,
  notesType,
  deletePopup,
  setDeletePopup,
  setDeleteIndex,
  setDeleteType,
  renumberNote,
  retitleNote,
  renameNote,
}: DisplayNotesTypes.DisplayNotesProps) => {
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
                    onClick={() => {
                      setDeletePopup(!deletePopup);
                      setDeleteIndex(index);
                      setDeleteType(dataType);
                    }}
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
                      : DisplayOtherNote({
                        note,
                        editMode,
                        setEditMode,
                        index,
                        noteType: dataType,
                        renameNote,
                      })}
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
                          API.openNote({
                            courseID: courseID,
                            noteName: note.texPath || '',
                          })
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
                          API.openNote({
                            courseID: courseID,
                            noteName: note.pdfPath || '',
                          })
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
