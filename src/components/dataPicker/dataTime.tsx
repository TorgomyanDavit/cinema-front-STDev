import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FormControl, FormHelperText } from '@mui/material';
import { useState } from 'react';

interface BasicDatePickerProps {
  onChange: (newValue: Dayjs | null) => void;
  error: any; 
}

const BasicDatePicker: React.FC<BasicDatePickerProps> = ({ onChange, error }) => {
  const [valueInner, setValueInner] = useState<Dayjs | null>(null);

  const handleDateTimeChange = (date: Dayjs | null) => {
    const adjustedValue = date && date.subtract(4, 'hour');
    setValueInner(date); 
    onChange(adjustedValue); 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <FormControl fullWidth error={error}>
          <DateTimePicker
            label="Date and time"
            value={valueInner}
            onChange={(date) => handleDateTimeChange(date)}
            format="YYYY-MM-DD HH:mm"
            ampm={false}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
