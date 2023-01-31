/* eslint-disable react/prop-types */
import React from 'react';
import { Paper, Typography } from '@mui/material';
/* istanbul ignore next */
const MobileNav = ({ mobileLinks }) => (
  <Paper
    elevation={0}
    sx={{
      display: 'flex',
      justifyContent: 'space-around',
      color: '#1A2D6D',
      fontSize: '20px',
      marginTop: '5px',
    }}
  >
    {mobileLinks.map((links) => (
      <Typography sx={{ fontSize: '12px', fontWeight: 500 }} key={links.link}>
        {links.link}
      </Typography>
    ))}
  </Paper>
);

export default MobileNav;
