import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { FormControl, FormHelperText } from '@mui/material';
import { useState } from 'react';

interface BasicTimePickerProps {
  onChange: (newValue: Dayjs | null) => void;
  error: any; 
}

const BasicTimePicker: React.FC<BasicTimePickerProps> = ({ onChange, error }) => {
  const [valueInner, setValueInner] = useState<Dayjs | null>(null);

  const handleTimeChange = (date: Dayjs | null) => {
    const adjustedValue = date && date.subtract(4, 'hour');
    setValueInner(date);
    onChange(adjustedValue); 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <FormControl fullWidth error={error}> 
          <TimePicker
            label="Duration"
            value={valueInner}
            onChange={handleTimeChange}
            format="HH:mm:ss"
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default BasicTimePicker;
