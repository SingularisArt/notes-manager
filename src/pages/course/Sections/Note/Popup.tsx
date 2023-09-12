import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { PopupTypes } from './Types/index';
import { Typography } from '@mui/material';

export const addNotePopup = ({
  notesType,
  data,
  setData,
}: PopupTypes.addNotePopupProps): JSX.Element => {
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
            onChange={(e) => {
              setData({ ...data, number: parseInt(e.target.value) });
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            className="add-note-note"
            variant="standard"
            label={`${notesType} Note`}
            onChange={(e) => {
              setData({ ...data, note: e.target.value });
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            className="add-note-name"
            variant="standard"
            label={`${notesType} Name`}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export const deleteNotePopup = (): JSX.Element => {
  return (
    <div className="delete-box">
      <Typography variant="h6">Delete Note Confirmation</Typography>
    </div>
  );
};
