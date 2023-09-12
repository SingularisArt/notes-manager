import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { forwardRef, useState, SyntheticEvent  } from 'react';
import { AlertProps } from '@mui/material';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type NotificationProps = {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
};

const Notification: React.FC<NotificationProps> = ({
  message,
  severity,
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = (_?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default Notification;
