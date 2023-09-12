import React from 'react';

import ItemTitle from 'components/common/ItemTitle/ItemTitle';

import { NoteHeaderTypes } from './Types/index';

const NoteHeader: React.FC<NoteHeaderTypes.NoteHeaderProps> = ({
  editMode,
  setEditMode,
}) => {
  return (
    <>
      <ItemTitle title="Notes" onClick={() => setEditMode(!editMode)} />
    </>
  );
};

export default NoteHeader;
