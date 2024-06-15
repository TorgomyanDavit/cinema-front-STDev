import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AnyObject } from 'yup';

export default function ResponsiveDialog({handleDeleteItem,name,uniqId,icon}:AnyObject) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = async () => {
    setOpen(false);
    handleDeleteItem(uniqId)
  };

  return (
    <div className='ResponsiveDialog'>
        <Button id='outlined' onClick={(e:any) => {e.stopPropagation(); handleOpen()}}>{icon}</Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
            <DialogContent><DialogContentText>Are you sure you wan to delete</DialogContentText></DialogContent>
            <DialogActions>
              <Button onClick={(e:any) => {e.stopPropagation(); handleClose()}}>Cancel</Button>
              <Button variant='contained'
                onClick={(e:any) => {e.stopPropagation(); handleClick()}}
              >{name || "Հեռացնել"}</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}