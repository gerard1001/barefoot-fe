import React, { useEffect, useState } from 'react';
import { LocationCity } from '@mui/icons-material';
import 'react-multi-carousel/lib/styles.css';
import { Grid, Paper, styled, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Slider from 'react-styled-carousel';
import { getLoc } from '../../redux/actions/location.action';
import store from '../../redux/store';
import { Spinner } from './spinner';

const Stylepaper = styled(Paper)(({ theme }) => ({
  height: '220px',
  width: '90%',
  marginTop: '40px',
  marginLeft: '15%',
  [theme?.breakpoints.up('sm')]: {
    height: '220px',
    marginLeft: '10%',
  },
}));

const Slide = () => {
  const locations = useSelector((state) => state.landingReducer);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    store.dispatch(getLoc());
  }, []);

  const responsive = [
    { breakPoint: 4000, cardsToShow: 3 },
    { breakPoint: 1024, cardsToShow: 3 },
    { breakPoint: 800, cardsToShow: 3 },
    { breakPoint: 600, cardsToShow: 2 },
    { breakPoint: 0, cardsToShow: 1 },
  ];

  useEffect(() => {
    if (locations.locations.length > 2) {
      setLoading(false);
    }
  });

  return (
    <Grid container direction="column" alignItems="center" paddingTop={10}>
      <Grid item textAlign="center">
        <Typography variant="h6" color="#7EA0FF">
          Checkout our most travelled locations
        </Typography>
        <Typography variant="h4" color="#00095E">
          LOCATIONS
        </Typography>
      </Grid>
      {loading === true ? (
        <Grid item paddingTop={10}>
          <Spinner />
        </Grid>
      ) : (
        <Grid
          item
          width={{
            md: '60%',
            sm: '65%',
            xs: '75%',
          }}
          paddingTop={10}
        >
          <Slider responsive={responsive} showDots={false} autoSlide={5000}>
            {locations.locations.map((value) => (
              <Stylepaper elevation={3} key={value.id}>
                <div
                  style={{
                    width: '100%',
                    height: '145px',
                    background: '#F8F9FA',
                  }}
                >
                  <LocationCity
                    sx={{ color: '#00095E', width: '50%', height: '145px' }}
                  />
                </div>
                <p
                  style={{
                    color: '#00095E',
                    float: 'left',
                    marginTop: '40px',
                    marginLeft: '10px',
                  }}
                >
                  {value.name}
                </p>
                <p
                  style={{
                    color: '#7EA0FF',
                    float: 'left',
                    position: 'absolute',
                    bottom: '7%',
                    marginLeft: '10px',
                  }}
                >
                  {value.country}
                </p>
              </Stylepaper>
            ))}
          </Slider>
        </Grid>
      )}
    </Grid>
  );
};

export default Slide;
