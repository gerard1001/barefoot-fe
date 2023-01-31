import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControlLabel, Switch } from '@mui/material';
import { styled } from '@mui/styles';

const NotificationSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#00095E',
    '&:hover': {
      color: '#00095E',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#00095E',
  },
}));

const ControlledSwitch = ({ name, control, label, ...props }) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <FormControlLabel
        checked={value}
        onChange={(e) => {
          /* istanbul ignore next */
          onChange(e.target.checked);
        }}
        control={<NotificationSwitch />}
        label={label}
        sx={{
          marginTop: 15,
        }}
        {...props}
      />
    )}
  />
);

export default ControlledSwitch;
