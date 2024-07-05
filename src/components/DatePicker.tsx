import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export const DatePicker = ({
  date,
  setDate,
  label,
}:{
  date: dayjs.Dayjs,
  setDate: (date: string) => void,
  label: string,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label={label}
        defaultValue={date || dayjs()}
        value={date || dayjs()}
        onAccept={date => {
          if (date) setDate(date.format('YYYY-MM-DD'));
        }}
      />
    </LocalizationProvider>
  );
}