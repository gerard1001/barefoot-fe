import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';

const Header = ({ title }) => {
  const theme = useTheme();
  return (
    <Grid container data-testid="pending">
      <Typography
        variant="h6"
        sx={{
          color: '#1A2D6D',
          padding: '15px',
          paddingLeft: '30px',
          fontSize: '20px',
          fontFamily: theme?.typography.fontFamily,
          '@media (max-width:900px)': {
            display: 'none',
          },
        }}
      >
        {title}
      </Typography>
    </Grid>
  );
};
export default Header;
