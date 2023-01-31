/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { useTheme } from '@mui/styles';
import { styled, Link, MenuItem } from '@mui/material';
import MenuBar from '../assets/MenuBar.svg';
import Logo from '../assets/Logo.svg';

const Navlinks = styled(Box)({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
});

const Links = styled('div')({
  fontSize: '14px',
  fontWeight: 500,
  padding: '20px',
  fontFamily: 'Josefin Sans, sans-serif',
});

/* istanbul ignore next */
const NavBar = ({ pages, requester, logo }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const close = () => {
    setOpen(false);
  };

  return (
    <AppBar sx={{ background: '#F8F9FA', position: 'sticky', top: '0px' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: { md: 'flex-end', xs: 'space-between' },
        }}
      >
        <Link href="/" sx={{ display: { xs: 'block', md: 'none' } }}>
          <img src={Logo} alt="Logo" style={{ width: 100, height: 50 }} />
        </Link>
        <Navlinks
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
        >
          {pages?.map((link, index) => (
            <Links key={index}>
              <Link
                href="#"
                underline="none"
                color={theme?.palette.primary.main}
              >
                {link}
              </Link>
            </Links>
          ))}
        </Navlinks>
        <Box
          sx={{
            fontSize: theme?.typography.fontSize,
            display: {
              xs: 'flex',
              md: 'none',
            },
          }}
          onClick={(e) => (open ? setOpen(false) : setOpen(true))}
        >
          <img src={MenuBar} alt="menu bar" />
        </Box>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {pages?.map((link, index) => (
            <MenuItem
              key={index}
              sx={{
                fontFamily: theme?.typography.fontFamily,
                color: '#00095E',
                fontSize: theme?.typography.fontSize,
              }}
              // onClick={close}
            >
              <Links>
                <Link href="#" underline="none" color="#00095E">
                  {link}
                </Link>
              </Links>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
