import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

interface BasicDatePickerProps {
    value: any;
    onChange: (newValue: Dayjs | null) => void;
    register: any; 
    registerName: string;
}

const BasicTimePicker: React.FC<BasicDatePickerProps> = ({value,onChange,register,registerName}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
            <TimePicker
                label="Duration"
                value={value}
                onChange={(date) => onChange(date)}
                format="HH:mm:ss" 
                {...register(registerName)}
            />
        </DemoContainer>
    </LocalizationProvider>
  );
}

export default BasicTimePicker;