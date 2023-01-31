/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-spacing */
import { Box, styled, Typography } from '@mui/material';
import React from 'react';

const Line = styled('div')(({ theme }) => ({
  position: 'absolute',
  backgroundColor: '#F9A826',
  width: '285px',
  height: '7px',
  left: '40%',
  marginTop: '20px',
  borderRadius: '30px',
  zIndex: 0,
  '@media(max-width:900px)':{
    left: '31.5%',
  },
  '@media(max-width:400px)':{
    left: '13%',
  }
}));

const Welcome = () => {
  return (
    <Box paddingTop={20} textAlign="center" >
      <Typography
        variant="h4"
        fontSize={30}
        className="p"
        fontFamily="Josefin Sans, sans-serif"
        fontWeight={900}
        color="#00095E"
      >
        Life long memories just
      </Typography>
      <Line />
      <Typography
        variant="h4"
        fontSize={30}
        className="p"
        fontFamily="Josefin Sans, sans-serif"
        fontWeight={900}
        color="#00095E"
        zIndex={1}
        position="relative"
      >
        a few seconds away
      </Typography>
      <Typography variant="h6" fontSize={17} paddingTop={5} color="#7EA0FF">
        Let’s start your journey with us, your dreams will come true
      </Typography>
    </Box>
  );
};

export default Welcome;
