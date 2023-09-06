import React from 'react';
import colorConfigs from 'configs/colorConfigs';
import Paper from '@mui/material/Paper';
import Add from 'components/common/Add';
import { useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

type ItemProps = {
  add?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const Item: React.FC<ItemProps> = ({
  add = true,
  onClick,
  children,
  className,
}) => {
  const theme = useTheme();

  const paperStyle: SxProps = {
    backgroundColor: colorConfigs.card.bg,
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    border: `1px solid ${colorConfigs.card.border}`,
    maxHeight: '600px',
    minHeight: '600px',
    overflow: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    position: 'relative',
  };

  const addButtonStyle: React.CSSProperties = {
    position: 'sticky',
    bottom: '10px',
    left: '100%',
    zIndex: 1,
  };

  return (
    <Paper sx={paperStyle} className={className}>
      {children}
      {add && <Add style={addButtonStyle} onClick={onClick} />}
    </Paper>
  );
};

export default Item;
