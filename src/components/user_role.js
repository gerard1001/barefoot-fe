/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import { InputRounded } from '@mui/icons-material';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  styled,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  assign,
  getAll,
  getUsers,
} from '../redux/actions/user_role_settings.action';
import store from '../redux/store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const formSection = {
  width: {
    xs: 300,
    sm: 460,
  },
  minheight: {
    xs: 370,
    md: 430,
  },
  backgroundColor: '#EBF2FA',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 2,
  padding: '10px 0px',
  margin: '150px 20px',
};

const FormControlSX = {
  width: {
    xs: 250,
    sm: 350,
  },
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

function UserSettingsModal() {
  const { roles } = useSelector((state) => state.getRoleReducer);
  const { users } = useSelector((state) => state.getUserReducer);
  const init = ['REQUESTER@gmail.com'];
  const [loading, setLoading] = useState();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const message = useSelector((state) => state.assignRoleReducer);
  const handleChangeE = (email) => setEmail(email);
  const handleChangeR = (role) => setRole(role);
  const handleClick = async () => {
    setLoading(true);
    const data = {
      email,
      role,
    };

    await store.dispatch(assign(data));

    setLoading(false);
  };

  useEffect(() => {
    store.dispatch(getAll());
    store.dispatch(getUsers());
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      <Box sx={formSection}>
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              xs: '23px',
              sm: '33px',
            },
            fontWeight: '600',
            color: '#00095E',
            fontFamily: 'Robot, sans-serif',
            paddingTop: '20px',
            paddingBottom: '30px',
          }}
        >
          Assign role to users
        </Typography>

        <Autocomplete
          disablePortal
          options={users || init}
          sx={{
            width: {
              xs: 250,
              sm: 350,
            },
            paddingBottom: '30px',
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
          }}
          onChange={(e, value) => handleChangeE(value)}
          renderInput={(params) => <TextField {...params} label="Email" />}
        />
        <FormControl sx={FormControlSX}>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            {roles.map((role) => (
              <MenuItem value={role.name}>{role.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText />
        </FormControl>
        <Button
          variant="contained"
          sx={{
            width: {
              xs: 250,
              sm: 350,
            },
            height: 50,
            margin: {
              xs: '30px 0px',
              sm: '20px 0px',
            },
            backgroundColor: '#00095E',
            fontSize: '16px',
            color: 'white',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#00095E',
            },
          }}
          onClick={handleClick}
        >
          {loading ? (
            <CircularProgress
              sx={{
                color: 'white',
              }}
              size={30}
              thickness={4}
            />
          ) : (
            'ASSIGN'
          )}
        </Button>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default UserSettingsModal;
