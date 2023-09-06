import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

type AddProps = {
  onClick?: () => void;
  style?: React.CSSProperties;
};

const Add: React.FC<AddProps> = ({ onClick, style }) => {
  const addButtonStyle: React.CSSProperties = {
    width: '50px',
    minHeight: '50px',
    maxHeight: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };

  return (
    <Fab
      color="primary"
      aria-label="add"
      style={addButtonStyle}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
};

export default Add;
