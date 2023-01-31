/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { formatISO } from 'date-fns';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  FETCH_REQUESTS_ERROR,
  FETCH_REQUESTS_PENDING,
  FETCH_REQUESTS_SUCCESS,
} from '../redux/types/Requester.Types';
import axiosInstance from '../axios/axios.instance';
import { getAllLocations } from '../redux/actions/location.action';

const SelectFormControl = styled(FormControl)(() => ({
  width: '100%',
  '& .MuiFormLabel-root': {
    top: '-7px',
  },
  '& .MuiFormLabel-root.MuiInputLabel-shrink': {
    top: '0px',
  },
}));

const CustomDatePicker = styled(DatePicker)(() => ({
  '& .MuiFormLabel-root.MuiInputLabel-root.Mui-error': {
    color: 'green',
    backgroundColor: 'yellow',
  },
  '& .MuiOutlinedInput-notchedOutline': {},
}));

/* istanbul ignore next */
function serializeDateToIso(date) {
  return formatISO(new Date(date));
}

const theme = createTheme({
  palette: {
    error: {
      main: '#1A2D6D',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    margin: 0,
    fontSize: 12,
  },
});

function TripSearch({ page, rowsPerPage, handleOpen }) {
  const inputWidth = 150;
  const dispatch = useDispatch();
  const locationsState = useSelector((state) => state.locationReducer);
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripStatus, setTripStatus] = useState('');
  const [destination, setDestination] = useState('');

  const searchData = new URLSearchParams();

  if (page) searchData.set('page', page + 1);
  if (rowsPerPage) searchData.set('limit', rowsPerPage);
  /* istanbul ignore next */
  if (tripStatus !== '' && tripStatus !== 'All')
    searchData.set('status', tripStatus);
  /* istanbul ignore next */
  if (departDate !== '')
    searchData.set('duration', serializeDateToIso(departDate));
  /* istanbul ignore next */
  if (returnDate !== '')
    searchData.set('endDate', serializeDateToIso(returnDate));
  /* istanbul ignore next */
  if (destination !== '' && destination !== 'All')
    searchData.set('destination', destination);

  const searchLocation = async () => {
    await dispatch({
      type: FETCH_REQUESTS_PENDING,
    });

    axiosInstance
      .get(`/search?${searchData}`)
      .then(async (res) => {
        await dispatch({
          type: FETCH_REQUESTS_SUCCESS,
          payload: res.data,
          error: null,
        });
      })
      .catch(async (error) => {
        await dispatch({
          type: FETCH_REQUESTS_ERROR,
          payload: error.response.data,
        });
      });
  };

  useEffect(() => {
    dispatch(getAllLocations());

    /* istanbul ignore next */
    window.addEventListener('offline', () => {
      dispatch(getAllLocations());
      setDestination('');
    });
    /* istanbul ignore next */
    window.addEventListener('online', () => {
      dispatch(getAllLocations());
      setDestination('');
    });
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid
            container
            spacing={{ xs: '15px' }}
            justifyContent="center"
            sx={{ width: '100% !important', margin: '0px !important' }}
          >
            <Grid width={inputWidth} item>
              <CustomDatePicker
                value={departDate}
                onChange={(newValue) => {
                  /* istanbul ignore next */
                  setDepartDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    data-testid="tripDate"
                    label="Depart Date"
                    size="small"
                    onKeyDown={(e) => {
                      /* istanbul ignore next */
                      e.preventDefault();
                    }}
                  />
                )}
              />
            </Grid>
            <Grid width={inputWidth} item>
              <CustomDatePicker
                minDate={departDate}
                value={returnDate}
                onChange={(newValue) => {
                  /* istanbul ignore next */
                  setReturnDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    data-testid="returnDate"
                    label="Return Date"
                    size="small"
                    onKeyDown={(e) => {
                      /* istanbul ignore next */
                      e.preventDefault();
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item width={inputWidth}>
              <SelectFormControl aria-labelledby="tripStatus">
                <InputLabel id="tripStatus">Trip Status</InputLabel>
                <Select
                  data-testid="selectTripStatus"
                  size="small"
                  label="Trip Status"
                  name="tripStatus"
                  value={tripStatus}
                  onChange={(e) => {
                    /* istanbul ignore next */
                    setTripStatus(e.target.value);
                  }}
                >
                  <MenuItem value="All" data-testid="menuItemAll">
                    All
                  </MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </SelectFormControl>
            </Grid>
            <Grid item width={inputWidth}>
              <SelectFormControl aria-labelledby="destinationLabel">
                <InputLabel id="destinationLabel">Destination</InputLabel>
                <Select
                  data-testid="selectDestination"
                  size="small"
                  label="Destination"
                  name="destination"
                  value={destination}
                  onChange={(e) => {
                    /* istanbul ignore next */
                    setDestination(e.target.value);
                  }}
                >
                  {(() => {
                    if (locationsState.loading) {
                      return (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <CircularProgress size={20} />
                        </Box>
                      );
                    }
                    if (locationsState.error !== '') {
                      return (
                        <MenuItem>
                          {locationsState.error.response.data.message}
                        </MenuItem>
                      );
                    }
                    return locationsState.data.data.results.reduce(
                      (previousLocation, currentLocation) => {
                        previousLocation.push(
                          <MenuItem
                            key={currentLocation.id}
                            value={currentLocation.name}
                          >
                            {currentLocation.name}
                          </MenuItem>,
                        );

                        return previousLocation;
                      },
                      [
                        <MenuItem key={0} value="All">
                          All
                        </MenuItem>,
                      ],
                    );
                  })()}
                </Select>
              </SelectFormControl>
            </Grid>
            <Grid item width={inputWidth}>
              <Button
                data-testid="searchButton"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#1A2D6D',
                  height: 37,
                }}
                onClick={searchLocation}
              >
                Search Trip
              </Button>
            </Grid>
            <Grid item width={inputWidth}>
              <Button
                data-testid="createTripbutton"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#1A2D6D',
                  height: 37,
                }}
                onClick={handleOpen}
              >
                + CREATE TRIP
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

TripSearch.propTypes = {
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default TripSearch;
