import React from 'react';
import ItemTitle from 'components/common/ItemTitle/ItemTitle';

type NoteHeaderProps = {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
};

const NoteHeader: React.FC<NoteHeaderProps> = ({
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
