import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { roomSchema } from '../validation/room.validation';
import {
  createBookingAction,
  fetchAllBookingsAction,
  fetchUserBookingsAction,
  updateBookingAction,
} from '../redux/actions/booking.action';
import store from '../redux/store';

export const BookingModal = ({ open, title, handleClose, ids, inputData }) => {
  const booking = store.getState().bookingReducer;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(roomSchema),
  });
  const role =
    JSON.parse(localStorage.getItem('userCredentials')) ?? unloggedInUser;

  const onSubmit = async (data) => {
    const bookInfo = {
      checkinDate: new Date(data.checkInDate).toISOString(),
      checkoutDate: new Date(data.checkOutDate).toISOString(),
    };
    if (title === 'BOOK NOW') {
      await store.dispatch(createBookingAction(ids.roomId, bookInfo));
      if (
        store.getState().bookingReducer?.booking?.message ===
        'successfully booked a room.'
      ) {
        handleClose();
        reset();
        await store.dispatch(fetchUserBookingsAction());
      }
    } else if (title === 'UPDATE BOOKING') {
      await store.dispatch(
        updateBookingAction(ids.roomId, ids.bookingId, bookInfo),
      );
      if (
        store.getState().bookingReducer?.booking?.message ===
        'updated booking info'
      ) {
        await store.dispatch(fetchUserBookingsAction());
      }
      handleClose();
      reset();
    }
    if (booking.booking) {
      if (role.role_id === 4) dispatch(fetchUserBookingsAction());
      else dispatch(fetchAllBookingsAction(ids.roomId));
    }
    if (!store.getState().bookingReducer?.pending) {
      reset();
      handleClose();
    }
  };
  if (title === 'UPDATE BOOKING' && inputData?.name) {
    setValue('checkInDate', inputData?.checkinDate);
    setValue('checkOutDate', inputData?.checkoutDate);
  }
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="div"
            sx={{
              display: 'flex',
              gap: '15px',
              flexFlow: 'column nowrap',
              padding: '30px',
              margin: '15px',
              position: 'relative',
              backgroundColor: 'white',
              borderRadius: '10px',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <Close
              sx={{ position: 'absolute', top: '10px', right: '10px' }}
              onClick={handleClose}
            />
            <Typography
              id="modal-modal-title"
              variant="h5"
              sx={{
                fontSize: '18px',
                fontWeight: '400',
                color: '#00095E',
              }}
            >
              {title}
            </Typography>
            <Controller
              name="checkInDate"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  value={value}
                  onChange={(newValue) => {
                    /* istanbul ignore next */
                    onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Checkin Date"
                      size="small"
                      color="primary"
                      onKeyDown={(e) => {
                        /* istanbul ignore next */
                        e.preventDefault();
                      }}
                      {...(errors.checkInDate && {
                        error: true,
                        helperText: errors.checkInDate.message,
                      })}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="checkOutDate"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  value={value}
                  minDate={watch('checkInDate')}
                  onChange={(newValue) => {
                    /* istanbul ignore next */
                    onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Checkout Date"
                      size="small"
                      onKeyDown={(e) => {
                        /* istanbul ignore next */
                        e.preventDefault();
                      }}
                      {...(errors.checkOutDate && {
                        error: true,
                        helperText: errors.checkOutDate.message,
                      })}
                    />
                  )}
                />
              )}
            />

            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              {store.getState().bookingReducer?.pending ? (
                <CircularProgress
                  sx={{
                    color: 'white',
                  }}
                  size={30}
                  thickness={4}
                />
              ) : (
                title
              )}
            </Button>
          </Box>
        </Modal>
      </LocalizationProvider>
    </Box>
  );
};
