/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-spacing */
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import servic from './Group33.svg';
import serve from './Group32.svg';

const cardStyles = {
  boxShadow: '0 0 0 0',
  backgroundColor: '#EBF2FA',
  height: '350px',
  width: '300px',
  borderRadius: '0px',
  marginTop: '20px',
};

const Service = () => {
  return (
    <Box
      textAlign="center"
      marginTop={{
        sm: '-10',
        xs: '80px',
      }}
    >
      <Typography variant="h5" color="#7EA0FF">
        Our popular services
      </Typography>
      <Typography variant="h4" color="#00095E">
        Services
      </Typography>
      <Grid
        container
        gap={10}
        paddingTop={{
          sm: '130px',
          xs: 10,
        }}
        direction={{
          sm: 'row',
          xs: 'column',
        }}
        justifyContent="center"
        sx={{
          '@media(max-width:600px)':{
            alignItems: "center"
          }
        }}
      >
        <Grid item>
          <Card sx={cardStyles}>
            <CardMedia
              component="img"
              image={servic}
              sx={{ width: '80%', marginTop: '50px', marginLeft: '39px' }}
            />
            <CardContent sx={{ paddingTop: '50px' }}>
              <Typography variant="h4" color="#00095E">
                Trip booking
              </Typography>
              <Typography variant="h7" component="p">
                User is able to make a trip request to specific location
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={cardStyles}>
            <CardMedia
              component="img"
              image={serve}
              sx={{ width: '80%', marginTop: '50px', marginLeft: '39px' }}
            />
            <CardContent sx={{ paddingTop: '50px' }}>
              <Typography variant="h4" color="#00095E">
                Hotel booking
              </Typography>
              <Typography variant="h7" component="p">
                User is able to book a room in various accommodations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Service;
