/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import { formatCapitalFirst } from '../helpers/OneTrip.helper';

const RoomCard = ({
  images = ['', ''],
  accommodationName = '',
  roomNo = 0,
  price = 0,
  onButtonClick = () => {},
}) => {
  const role = JSON.parse(localStorage.getItem('userCredentials'));
  return (
    <Card
      sx={{
        width: {
          xs: '200px',
          md: '250px',
        },
        height: {
          xs: '200px',
          md: '250px',
        },
      }}
    >
      <CardActionArea
        sx={{
          height: '50%',
          maxHeight: '80%',
        }}
      >
        <SimpleImageSlider
          width="100%"
          height="100%"
          images={images}
          showBullets
          showNavs
        />
      </CardActionArea>
      <CardContent sx={{ padding: { xs: '10px', md: '15px' } }}>
        <div
          style={{
            display: 'flex',
            margin: {
              xs: '5px 0 5px 0',
              sm: '10px 0 10px 0',
              md: '15px 0 15px 0',
              lg: '30px 0 30px 0',
            },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            color="#00095E"
            component="div"
            fontFamily="Josefin Sans, sans-serif"
          >
            Room: {roomNo}
          </Typography>
          <Typography
            color="#FFC800"
            component="div"
            fontFamily="Josefin Sans, sans-serif"
          >
            RWF {price}
          </Typography>
        </div>
        <Typography
          sx={{
            color: '#677F8B',
            textAlign: 'justify',
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          {formatCapitalFirst(accommodationName)}
        </Typography>
        {role?.role_id === 4 && (
          <Stack alignItems="center" marginTop={{ xs: '4px', md: '10px' }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ width: '100%' }}
              onClick={() => onButtonClick(roomNo)}
            >
              Book Now
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
export default RoomCard;
