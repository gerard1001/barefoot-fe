/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-spacing */
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import image from './image1.svg';

const About = ({aboutClass}) => {
  return (
    <Grid
      container
      gap={{
        sm: 12,
      }}
      marginTop={30}
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      className={aboutClass}
    >
      <Grid
        item
        md={6}
        marginLeft={5}
        width={{
          xs: '70%',
        }}
      >
        <img
          src={image}
          alt="travelling"
          style={{ width: '100%', height: '65%' }}
        />
      </Grid>
      <Grid
        item
        md={4}
        paddingTop={{
          sm: 3,
          xs: 10,
        }}
        marginLeft={3}
        width={{
          xs: '90%',
        }}
      >
        <Typography
          variant="h3"
          fontSize={{
            sm: '20px',
            xs: '20px',
          }}
          color="#7EA0FF"
        >
          About us
        </Typography>
        <Typography
          variant="h6"
          marginTop={4}
          color="#00095E"
          fontSize={{
            sm: '23px',
            xs: '22px',
          }}
        >
          Get ready for real time
        </Typography>
        <Typography
          variant="h6"
          color="#00095E"
          fontSize={{
            sm: '23px',
            xs: '22px',
          }}
        >
          adventure
        </Typography>
        <Typography
          variant="h1"
          marginTop={4}
          color="#677F8B"
          fontFamily="roboto"
          fontSize={{
            sm: '25px',
            xs: '20px',
          }}
        >
          Let’s start your journey with us, your dream will come true. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam quis nostrud exercitation.
        </Typography>
        <Button
          sx={{
            backgroundColor: '#F9A826',
            height: '50px',
            width: '240px',
            marginTop: '40px',
            color: 'white',
            '&:hover': {
              backgroundColor: '#F9A826',
            },
            '@media(max-width:600px)': {
              height: '40px',
              width: '130px',
              marginTop: '20px',
            },
          }}
        >
          Get started
        </Button>
      </Grid>
    </Grid>
  );
};

export default About;
