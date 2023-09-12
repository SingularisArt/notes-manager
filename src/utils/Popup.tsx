import { Typography } from '@mui/material';

export const deleteFigurePopup: () => JSX.Element = () => {
  return (
    <div className="delete-box">
      <Typography variant="h6">Delete Figure?</Typography>
    </div>
  );
};
