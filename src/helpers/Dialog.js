import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ConfirmationNumberRounded } from '@mui/icons-material';
import { PaperComponent } from './pagination';

export default ({ open, handleClose, confirm, cancel, text, handleSubmit }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    PaperComponent={PaperComponent}
    aria-labelledby="draggable-dialog-title"
  >
    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
      {confirm}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>{cancel}</Button>
      <Button onClick={handleSubmit}>{confirm}</Button>
    </DialogActions>
  </Dialog>
);
