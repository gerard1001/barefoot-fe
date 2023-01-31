/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { TextField, styled } from '@mui/material';
/* istanbul ignore next */
const StyledInputs = styled(TextField)(({ theme, ...props }) => ({
  [theme?.breakpoints.down('sm')]: {
    width: 280,
    height: props.big ? 25 : 75,
    bottom: props.big ? '20px' : '0px',
    margin: props.big ? '30px 1px' : '0px 0px',
  },
  width: props.big ? '100%' : 350,
  height: 50,
  margin: props.big ? '20px 1px 30px 1px' : '20px 1px',
  marginBottom: props.big && { xs: '40px' },
}));
const InputField = ({ otherStyles, ...props }) => (
  <StyledInputs
    {...props}
    sx={{
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
      ...otherStyles,
    }}
  />
);
export default InputField;
