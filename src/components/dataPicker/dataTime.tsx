import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface BasicDatePickerProps {
    value: any;
    onChange: (newValue: Dayjs | null) => void;
    register: any; 
    registerName: string;
}

const BasicDatePicker: React.FC<BasicDatePickerProps> = ({value,onChange,register,registerName}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
                label="Date and time"
                value={value}
                onChange={(date) => onChange(date)}
                format="YYYY-MM-DD HH:mm" 
                {...register(registerName)}
            />
        </DemoContainer>
    </LocalizationProvider>
  );
}

export default BasicDatePicker;