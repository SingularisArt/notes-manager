import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import * as NoteTypes from 'pages/course/Sections/Note/NoteTypes';
import * as FigureTypes from 'pages/course/Sections/Figure/FigureTypes';
import { Typography } from '@mui/material';

export const addNotePopup: (
  props: NoteTypes.addNotePopupProps
) => JSX.Element = ({ notesType }) => {
  return (
    <div className="form-box">
      <Typography variant="h6" className="add-note-title">
        Add {notesType} Note
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            className="add-note-number"
            variant="standard"
            label={`${notesType} Number`}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            className="add-note-note"
            variant="standard"
            label={`${notesType} Note`}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            className="add-note-name"
            variant="standard"
            label={`${notesType} Name`}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export const deleteNotePopup: (
  props: NoteTypes.deleteNotePopupProps
) => JSX.Element = ({ notesType }) => {
  return (
    <div className="delete-box">
      <Typography variant="h6">Delete {notesType} Note Confirmation</Typography>
    </div>
  );
};

export const deleteFigurePopup: () => JSX.Element = () => {
  return (
    <div className="delete-box">
      <Typography variant="h6">Delete Figure Confirmation</Typography>
    </div>
  );
};
