import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import "./style.scss"

export default function AlertResponseDialog({success,CloseConfirmMessage}:any) {
  setTimeout(() => {if(CloseConfirmMessage){CloseConfirmMessage({success:""})}},10000);
  
  return (
    <Stack id={"successPopUp"} sx={{ width: '100%' }} spacing={2}>
      <Alert severity={'success'}>
        <AlertTitle>Success</AlertTitle>
        {success}
      </Alert>
    </Stack>
  );
}