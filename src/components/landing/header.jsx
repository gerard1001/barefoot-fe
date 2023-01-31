/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-spacing */
import {
  AppBar,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './Group7.svg';
import drop from './Group345.svg';

const Dropdown = ({ status, close }) => {
  return (
    <Menu
      open={status}
      onClose={close}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{ top: '40px' }}
    >
      <MenuItem>
        <Link
          to="/"
          style={{
            color: '#00095E',
            textDecoration: 'none',
            fontFamily: 'Josefin Sans, sans-serif',
          }}
        >
          <Typography>Home</Typography>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to="/About"
          style={{
            color: '#00095E',
            textDecoration: 'none',
            fontFamily: 'Josefin Sans, sans-serif',
          }}
        >
          <Typography>About</Typography>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to="/Accommodation"
          style={{
            color: '#00095E',
            textDecoration: 'none',
            fontFamily: 'Josefin Sans, sans-serif',
          }}
        >
          <Typography>Accommodation</Typography>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to="/login"
          style={{
            color: '#00095E',
            textDecoration: 'none',
            fontFamily: 'Josefin Sans, sans-serif',
          }}
        >
          <Typography>Sign In</Typography>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to="/SignUp"
          style={{
            color: '#00095E',
            textDecoration: 'none',
            fontFamily: 'Josefin Sans, sans-serif',
          }}
        >
          <Typography>Sign Up</Typography>
        </Link>
      </MenuItem>
    </Menu>
  );
};

const Styledappbar = styled(AppBar)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  backgroundColor: '#FFFFFF',
}));

const Styledstack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    color: '#00095E',
    position: 'absolute',
    right: '3%',
  },
  display: 'none',
}));

const Styleddrop = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    position: 'absolute',
    right: '-20px',
  },
  display: 'none',
}));

const Styledlogo = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '25%',
    height: '50px',
    marginLeft: '-100px',
  },
  width: '25%',
  height: '50px',
}));

const Header = ({ aboutClass }) => {
  const [open, setOpen] = useState(false);
  return (
    <Styledappbar>
      {/* istanbul ignore next */}
      <Dropdown status={open} close={(e) => setOpen(false)} />
      <Toolbar>
        <Styledlogo>
          <img
            src={logo}
            alt="logo"
            style={{ width: '100%', height: '100%' }}
          />
        </Styledlogo>
        <Styledstack direction="row" gap={5}>
          <Link
            to="/"
            style={{
              color: '#00095E',
              textDecoration: 'none',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontWeight: '600',
                fontSize: '15px',
              }}
            >
              Home
            </Typography>
          </Link>
          <Link
            to={`#${aboutClass}`}
            style={{ color: '#00095E', textDecoration: 'none' }}
          >
            <Typography
              sx={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontWeight: '600',
                fontSize: '15px',
              }}
            >
              About
            </Typography>
          </Link>
          <Link
            to="/accommodations"
            style={{ color: '#00095E', textDecoration: 'none' }}
          >
            <Typography
              sx={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontWeight: '600',
                fontSize: '15px',
              }}
            >
              Accommodation
            </Typography>
          </Link>
          <Link
            to="/login"
            style={{ color: '#00095E', textDecoration: 'none' }}
          >
            <Typography
              sx={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontWeight: '600',
                fontSize: '15px',
              }}
            >
              Sign In
            </Typography>
          </Link>
          <Link
            to="/signup"
            style={{ color: '#00095E', textDecoration: 'none' }}
          >
            <Typography
              sx={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontWeight: '600',
                fontSize: '15px',
              }}
            >
              Sign Up
            </Typography>
          </Link>
        </Styledstack>
        <Styleddrop onClick={(e) => setOpen(true)}>
          <img
            src={drop}
            alt="drop down"
            style={{ height: '40px', width: '130px', marginTop: '8px' }}
          />
        </Styleddrop>
      </Toolbar>
    </Styledappbar>
  );
};

export default Header;
