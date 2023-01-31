/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Button } from '@mui/material';

const Buttons = ({ value, ...props }) => <Button {...props}>{value}</Button>;

export default Buttons;
