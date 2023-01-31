import { Button, styled } from '@mui/material';
import axios from 'axios';
import axiosInstance from '../axios/axios.instance';

export const SignupImage = styled('img')(({ theme }) => ({
  width: 400,
  height: 320,
  marginBottom: '50px',
}));
export const mainBoxSx = {
  display: 'flex',
  flexDirection: {
    xs: 'column',
    md: 'row',
  },
  alignItems: 'center',
  margin: '50px 20px',
  background: 'F8F9FA',
  justifyContent: 'space-evenly',
};
export const SignupBtn = styled(Button)(({ theme }) => ({
  width: 350,
  height: 50,
  margin: '20px 0px',
  backgroundColor: '#00095E',
  fontSize: '18px',
  color: 'white',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#00095E',
    color: '#FFC800',
  },
  [theme?.breakpoints.down('sm')]: {
    width: 280,
    height: 50,
    margin: '20px 0px',
  },
}));
export const SearchBtn = styled(Button)(({ theme }) => ({
  width: 60,
  height: 55,
  margin: '20px 0px',
  backgroundColor: '#00095E',
  fontSize: '18px',
  color: 'white',
  textTransform: 'none',

  [theme?.breakpoints.down('sm')]: {
    width: 280,
    height: 50,
    margin: '20px 0px',
  },
}));
export const BoxCustomStyles = {
  width: {
    xs: 300,
    sm: 460,
  },
  minHeight: {
    xs: 550,
    sm: 650,
    md: 650,
    lg: 650,
  },
  backgroundColor: '#EBF2FA',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 2,
  padding: '10px 0px',
  margin: '0px 20px',
};
export const FormControlSX = {
  '& .MuiFormLabel-root': {
    color: '#00095E',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: '#00095E',
  },
  '& .MuiInputBase-root': {
    color: '#00095E',
    '& fieldset': {
      borderColor: '#00095E',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#00095E',
    },
  },
  '&.Mui-focused .MuiInputBase-root': {
    color: '#00095E',
  },
  marginBottom: { xs: '40px' },
};
export const CreateTripSelector = {
  '& .MuiFormLabel-root': {
    color: '#00095E',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: '#00095E',
  },
  '& .MuiInputBase-root': {
    color: '#00095E',
    '& fieldset': {
      borderColor: '#00095E',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#00095E',
    },
  },
  '&.Mui-focused .MuiInputBase-root': {
    color: '#00095E',
  },
};

export const errorAlert = {
  border: '1px solid #EC5C5C',
  borderRadius: 1,
  width: {
    xs: 250,
    sm: 320,
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 40,
  fontSize: '16px',
  fontWeight: '500',
  fontFamily: 'Robot, sans-serif',
  color: '#f44336',
};
/* istanbul ignore next */
export const getUserLocation = async () =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      try {
        /* istanbul ignore next */
        const SuccessfullLookup = async (position) => {
          const { latitude, longitude } = position.coords;
          const apiLocation = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f771ed1eb4474843aa7ddf98d865dc08`;
          const res = await axios(apiLocation, { method: 'GET' });
          const { country, county, road, state, suburb } =
            res.data.results[0].components;
          const result = await axiosInstance.post('/locations', {
            name: state,
            description: `${road}, ${suburb}, ${county}`,
            country,
            longitude,
            latitude,
          });
          resolve(result.data.create.id);
        };
        navigator.geolocation.getCurrentPosition(SuccessfullLookup);
      } catch (error) {
        /* istanbul ignore next */
        reject(error.message);
      }
    }
  });
