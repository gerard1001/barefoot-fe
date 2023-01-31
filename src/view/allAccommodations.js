import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from '../components/landing/header';
import LandingFooter from '../components/landing/footer';
import TravelAdmin from './travel-admin';

const AccommodationPage = () => (
  <Box sx={{ backgroundColor: '#F8F9FA' }}>
    <Header aboutClass="to" />
    <Grid container marginLeft={5}>
      <TravelAdmin />
    </Grid>

    <LandingFooter />
  </Box>
);
export default AccommodationPage;
