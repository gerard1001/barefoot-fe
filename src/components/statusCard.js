/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, Typography, ImageListItem, Paper } from '@mui/material';
import StatusIcon from '../assets/status.svg';

const StatusCard = ({ totalTrips }) => {
  let ApprovedCount = 0;
  let RejectedCount = 0;
  let PendingCount = 0;
  for (let i = 0; i < totalTrips?.results?.length; i++) {
    if (totalTrips.results[i].status === 'APPROVED') {
      ApprovedCount += 1;
    } else if (totalTrips.results[i].status === 'REJECTED') {
      RejectedCount += 1;
    } else if (totalTrips.results[i].status === 'PENDING') {
      PendingCount += 1;
    }
  }
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '10px',
        textAlign: 'center',
        parginTop: '10px',
        width: '400px'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          paddingLeft: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '30%'
        }}
      >
        <Typography variant="h6" sx={{ color: '#1A2D6D' }}>
          trip Status
        </Typography>
        <ImageListItem sx={{ width: 50, height: 100, padding: '20px' }}>
          <img src={StatusIcon} alt="Cabal- logo" />
        </ImageListItem>
      </Paper>
      <Paper
        elevation={0}
        sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
      >
        <Paper elevation={0}>
          <Typography variant="h6" sx={{ color: '#1A2D6D' }}>
            {PendingCount}
          </Typography>
          <Typography variant="h6" sx={{ color: '#1A2D6D' }}>
            Pending
          </Typography>
        </Paper>
        <Paper elevation={0}>
          <Typography variant="h6" sx={{ color: '#1A2D6D' }}>
            {ApprovedCount}
          </Typography>
          <Typography variant="h6" sx={{ color: '#1A2D6D' }}>
            Approved
          </Typography>
        </Paper>
        <Paper elevation={0}>
          <Typography variant="h6" sx={{ color: '#1A2D6D' }}>
            {RejectedCount}
          </Typography>
          <Typography variant="h6" sx={{ color: '#1A2D6D' }}>
            Rejected
          </Typography>
        </Paper>
      </Paper>
    </Card>
  );
};

export default StatusCard;
