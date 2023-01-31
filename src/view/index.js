/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/landing/header';
import Welcome from '../components/landing/welcome';
import Landscape from '../components/landing/landscape';
import About from '../components/landing/about';
import Service from '../components/landing/service';
import LandingFooter from '../components/landing/footer';
import FooterImage from '../components/landing/footerimages.component';
import Slide from '../components/landing/slide';

const LandingPage = () => (
  <Box sx={{ backgroundColor: '#F8F9FA' }}>
    <Header aboutClass="to" />
    <Welcome />
    <Landscape />
    <Slide />
    <About aboutClass="to" />
    <Service />
    <FooterImage />
    <LandingFooter />
  </Box>
);

export default LandingPage;
