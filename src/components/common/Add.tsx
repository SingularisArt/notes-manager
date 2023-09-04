import React from 'react';

type AddProps = {
  text: string;
  color: string;
  width: number;
  height: number;
};

const Add: React.FC<AddProps> = ({ text, color, width, height }) => {
  const buttonStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle}>
      {text}
    </button>
  );
};

export default Add;
