/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import {
  Typography,
  Box,
  Container,
  Paper,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link, matchPath } from 'react-router-dom';
import React from 'react';

const MobLink = ({ sideBarLinks }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const role = JSON.parse(localStorage.getItem('userCredentials'))?.role_id;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
      {sideBarLinks.map((links) => (
        <Paper key={links.id} elevation={0}>
          <Link
            to={links.to}
            key={links.link}
            style={{
              display: 'flex',
              cursor: 'pointer',
              justifyContent: 'start',
              alignItems: 'center',
              borderRadius: '10px',
              marginTop: '10px',
              textDecoration: 'none',
              color: '#1A2D6D',
              textAlign: 'center',
              paddingLeft: '0px',
            }}
          >
            <Typography>{links.link}</Typography>
          </Link>
          <Container
            sx={{
              height: '0.5vh',
              backgroundColor: '#FFC800',
              display: matchPath(window.location.pathname, links.to)
                ? 'block'
                : 'none',
            }}
          />
        </Paper>
      ))}
      {role === 1 ? (
        <Paper elevation={0}>
          <Typography
            sx={{
              display: 'flex',
              cursor: 'pointer',
              justifyContent: 'start',
              alignItems: 'center',
              borderRadius: '10px',
              marginTop: '10px',
              textDecoration: 'none',
              color: '#1A2D6D',
              textAlign: 'center',
              paddingLeft: '0px',
            }}
            onClick={handleClick}
          >
            Settings
          </Typography>
          <Container
            sx={{
              height: '0.5vh',
              backgroundColor: '#FFC800',
              display:
                matchPath(window.location.pathname, '/dashboard/settings') ||
                matchPath(window.location.pathname, '/dashboard/roles')
                  ? 'block'
                  : 'none',
            }}
          />
        </Paper>
      ) : null}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          marginTop: '10px',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to="/dashboard/roles"
            style={{ textDecoration: 'none', color: '#1A2D6D' }}
          >
            {' '}
            Assign role
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to="/dashboard/settings"
            style={{ textDecoration: 'none', color: '#1A2D6D' }}
          >
            {' '}
            Assign manager
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MobLink;
