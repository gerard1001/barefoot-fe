import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import NotFound from '../assets/notFound.svg';

const PageNotFound = () => (
  <Paper
    elevation={0}
    sx={{
      display: 'flex',
      width: '100%',
      height: '100%',
      flexDirection: { xs: 'column', md: 'row' },
    }}
  >
    <img src={NotFound} style={{ width: '700px' }} />
    <Grid
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 10,
        paddingTop: 20,
        paddingRight: { xs: 10, md: 0 },
      }}
    >
      <Typography variant="h1" component="h1" sx={{ fontWeight: 600 }}>
        404
      </Typography>
      <Typography>Aha! you see you can be wrong!</Typography>
      <Typography>... either way, you should probably</Typography>
      <Link to="/">go back to homePage</Link>
    </Grid>
  </Paper>
);

export default PageNotFound;
