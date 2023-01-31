/* eslint-disable no-plusplus */
/* eslint-disable semi-spacing */
/* eslint-disable arrow-parens */
/* eslint-disable import/order */
/* eslint-disable space-infix-ops */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable key-spacing */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-spacing */
import { Button, Grid, styled } from '@mui/material';
import React from 'react';
import landscape from './Group 348.svg';
import { Link } from 'react-router-dom';

const Landscape = () => {
  const Buton = styled(Button)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      backgroundColor: '#00095E',
      marginTop: '-15%',
      display: 'block',
      height: '50px',
      transition: '0.4s linear',
      '&:hover': {
        color: '#00095E',
        backgroundColor: '#F9A826',
      },
    },
  }));
  return (
    <Grid container paddingTop={15} direction="column" alignItems="center">
      <Grid item>
        <Link to="/accommodations" style={{ textDecoration: 'none' }}>
          <Buton variant="contained">Explore Destinations</Buton>
        </Link>
      </Grid>
      <Grid item>
        <img src={landscape} alt="landscape" style={{ width: '100%' }} />
      </Grid>
    </Grid>
  );
};

export default Landscape;
