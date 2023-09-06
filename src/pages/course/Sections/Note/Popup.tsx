import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import * as Types from './NoteTypes';
import { Typography } from '@mui/material';

export const addNotePopup: (props: Types.addNotePopupProps) => JSX.Element = ({
  notesType,
}) => {
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
  props: Types.deleteNotePopupProps
) => JSX.Element = ({ notesType }) => {
  return (
    <div className="delete-box">
      <Typography variant="h6">Delete {notesType} Note Confirmation</Typography>
    </div>
  );
};
