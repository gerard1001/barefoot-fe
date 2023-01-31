/* eslint-disable react/prop-types */
import React from 'react';
import { Paper, Typography } from '@mui/material';

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
      <Typography key={links.id} sx={{ fontSize: '12px', fontWeight: 500 }}>
        {links.link}
      </Typography>
    ))}
  </Paper>
);

export default MobileNav;
