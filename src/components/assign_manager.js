/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  assignManager,
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

function Assignmanager() {
  const { roles } = useSelector((state) => state.getRoleReducer);
  const { detailed } = useSelector((state) => state.getUserReducer);
  const init = ['REQUESTER@gmail.com'];
  const [loading, setLoading] = useState();
  const [user, setUser] = useState('');
  const [manager, setManager] = useState('');
  const message = useSelector((state) => state.assignRoleReducer);
  const handleChangeU = (user) => setUser(user);
  const handleChangeM = (manager) => setManager(manager);

  const managers = detailed
    .filter((det) => {
      if (det.role_id === 3) {
        return det;
      }
    })
    .map((result) => result.email);

  const users = detailed
    .filter((det) => {
      if (det.role_id === 4) {
        return det.email;
      }
    })
    .map((result) => result.email);

  const handleClick = async () => {
    setLoading(true);

    const data = {};

    detailed.map((det) => {
      if (det.email === user) {
        data.userId = det.id;
      }
    });

    detailed.map((de) => {
      if (de.email === manager) {
        data.managerId = de.id;
      }
    });
    await store.dispatch(assignManager(data));

    setLoading(false);
  };

  useEffect(() => {
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
          Assign manager to user
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
          onChange={(e, value) => handleChangeU(value)}
          renderInput={(params) => <TextField {...params} label="User" />}
        />
        <Autocomplete
          disablePortal
          options={managers || init}
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
          onChange={(e, value) => handleChangeM(value)}
          renderInput={(params) => <TextField {...params} label="Manager" />}
        />
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

export default Assignmanager;
