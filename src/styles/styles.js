/* eslint-disable import/prefer-default-export */
import { createTheme } from '@mui/material';

export const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1200,
    },
  },
});
