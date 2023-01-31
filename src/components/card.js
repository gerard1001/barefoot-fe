/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, Typography, ImageListItem, Paper } from '@mui/material';
import DashIcon from '../assets/dash.svg';

const DashboardCard = ({ totalTrips }) => (
  <Card
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      textAlign: 'center',
      width: '400px'
    }}
  >
    <Paper elevation={0} sx={{ paddingLeft: '10px' }}>
      <Typography variant="h6" sx={{ color: '#1A2D6D' }}>
        Number of trips
      </Typography>
      <Typography variant="body" sx={{ color: '#1A2D6D' }}>
        {totalTrips?.pagination?.totalItems} Trips
      </Typography>
    </Paper>
    <ImageListItem sx={{ width: 50, height: 100, padding: '20px' }}>
      <img src={DashIcon} alt="Cabal- logo" />
    </ImageListItem>
  </Card>
);

export default DashboardCard;
