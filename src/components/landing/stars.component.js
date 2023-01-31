import { Star, StarBorder, StarHalf } from '@mui/icons-material';
import { Stack } from '@mui/material';
import React, { useEffect } from 'react';

/* istanbul ignore next */
export const Stars = ({ rates }) => {
  switch (rates) {
    case 2:
      return (
        <Stack direction="row">
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <StarBorder />
          <StarBorder />
          <StarBorder />
        </Stack>
      );
    case 2.5:
      return (
        <Stack direction="row">
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <StarHalf sx={{ color: '#FFC800' }} />
          <StarBorder />
          <StarBorder />
        </Stack>
      );
    case 3:
      return (
        <Stack direction="row">
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <StarBorder />
          <StarBorder />
        </Stack>
      );
    case 3.5:
      return (
        <Stack direction="row">
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <StarHalf sx={{ color: '#FFC800' }} />
          <StarBorder />
        </Stack>
      );
    case 4:
      return (
        <Stack direction="row">
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <StarBorder />
        </Stack>
      );
    case 4.5:
      return (
        <Stack direction="row">
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <StarHalf sx={{ color: '#FFC800' }} />
        </Stack>
      );
    case 5:
      return (
        <Stack direction="row">
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
          <Star sx={{ color: '#FFC800' }} />
        </Stack>
      );
    default:
      break;
  }
};
