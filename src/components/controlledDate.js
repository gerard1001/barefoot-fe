import React from 'react';
import { Controller } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';

const ControlledDate = ({ name, label, control }) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          maxDate={new Date()}
          label={label}
          onChange={onChange}
          value={value}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyDown={(e) => {
                /* istanbul ignore next */
                e.preventDefault();
              }}
              sx={{
                width: '100%',
                '& .MuiFormLabel-root': {
                  color: '#00095E',
                },
                '& .MuiFormLabel-root.Mui-focused': {
                  color: '#00095E',
                },
                '& .MuiInputBase-root': {
                  color: '#00095E',
                  '& fieldset': {
                    borderColor: '#00095E',
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: '#00095E',
                  },
                },
                '&.Mui-focused .MuiInputBase-root': {
                  color: '#00095E',
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
    )}
  />
);

export default ControlledDate;
