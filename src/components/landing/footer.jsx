import React from 'react';
import { Container, Grid, Typography, styled, Stack } from '@mui/material';
import logo from './footerLogo.svg';
import facebookIcon from '../../assets/facebook-icon.svg';
import twitterIcon from '../../assets/twitter-icon.svg';
import gmailIcon from '../../assets/gmail-icon.svg';
import linkedinIcon from '../../assets/linkedin-icon.svg';

const Divv = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    minwidth: '100%',
  },
  minwidth: '100%',
}));

function LandingFooter() {
  const Header = styled(Typography)`
    font-family: 'Roboto';
    font-weight: bold;
    color: white;
    font-size: 16px;
    @media (max-width: 485px) {
      text-align: center;
    }
  `;
  const Body = styled(Typography)`
    font-family: 'Roboto';
    font-weight: 700;
    color: #8a8fab;
    font-size: 14px;
    @media (max-width: 485px) {
      text-align: center;
    }
  `;

  const Icon = styled('img')(({ theme }) => ({
    [theme.breakpoints.down('xl')]: { height: '51px', width: '40px' },
    [theme.breakpoints.down('md')]: { height: '41px', width: '30px' },
    [theme.breakpoints.down('sm')]: { height: '31px' },
  }));

  return (
    <Divv>
      <Container
        maxWidth="100%"
        sx={{
          backgroundImage: 'linear-gradient(to bottom right, #1A2D6D, #0C1534)',
          margin: '0',
          paddingTop: '77px',
          paddingBottom: '77px',
        }}
      >
        <Grid
          justifyContent="space-around"
          alignItems="center"
          spacing={{
            lg: '58px',
            md: '48px',
            sm: '38px',
            xs: '28px',
          }}
          container
        >
          <Grid
            container
            justifyContent="space-around"
            spacing={5}
            item
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'center', sm: 'flex-start' }}
          >
            <Grid item>
              <Stack
                spacing={{
                  lg: '38px',
                  md: '28px',
                  xs: '18px',
                }}
                alignItems={{ xs: 'center', sm: 'flex-start' }}
              >
                <img alt="logo" src={logo} height="62px" width="130.2px" />
                <Body maxWidth="260px">
                  Land behold it created good saw after she&aposd Our set
                  living. Signs midst dominion creepeth morning laboris nisi
                  ufsit aliquip.
                </Body>
              </Stack>
            </Grid>
            <Grid item>
              <Stack
                spacing={{
                  lg: '18px',
                  md: '13px',
                  sm: '8px',
                  xs: '5px',
                }}
              >
                <Header>Navigation</Header>
                <Body>About Us</Body>
                <Body>Accommodation</Body>
                <Body>SignIn</Body>
                <Body>Sign Up</Body>
              </Stack>
            </Grid>
            <Grid item>
              <Stack
                spacing={{
                  lg: '18px',
                  md: '13px',
                  sm: '8px',
                  xs: '5px',
                }}
              >
                <Header>Services</Header>
                <Body>Hotel Booking</Body>
                <Body>Trip Booking</Body>
                <Body>Destination Booking</Body>
              </Stack>
            </Grid>
            <Grid item>
              <Header style={{ textAlign: 'center' }}>Contact</Header>
              <Stack
                spacing={{
                  sm: 3,
                  xs: '5px',
                }}
                direction="row"
                marginTop={2}
              >
                <Icon src={facebookIcon} />
                <Icon src={twitterIcon} alt="twitter icon" />
                <Icon src={gmailIcon} alt="gmail icon" />
                <Icon src={linkedinIcon} alt="linkedin icon" />
              </Stack>
            </Grid>
          </Grid>
          <Grid item marginTop={5}>
            <Body>Copyright ©2022 All rights reserved | by ATLP-cabal</Body>
          </Grid>
        </Grid>
      </Container>
    </Divv>
  );
}

export default LandingFooter;
