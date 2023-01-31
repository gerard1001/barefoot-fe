import { styled } from '@mui/material';

export const EmailImage = styled('img')(({ theme }) => ({
  width: 400,
  height: 320,
  objectFit: 'cover',
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
export const bodySx = {
  width: {
    xs: 300,
    sm: 460,
  },
  height: {
    xs: 550,
    md: 530,
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 2,
  padding: '10px 0px',
  margin: '0px 20px',
};
export const commonStyles = {
  textAlign: 'center',
  color: '#00095E',
  fontFamily: 'Josefin Sans, sans-serif',
  paddingBottom: '10px',
};

export const linkStyles = {
  marginTop: '40px',
  textDecoration: 'none',
  color: '#00095E',
  fontWeight: '600',
  fontSize: '30px',
};
