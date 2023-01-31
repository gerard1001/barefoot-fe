import { Modal, Typography, Box, Divider, Grid } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/styles';
import Buttons from './button';
import {
  markAllNotifications,
  readOneNotification,
} from '../redux/actions/notifications.action';
import Error from '../assets/error.svg';

const style = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 0,
  maxHeight: '70%',
  overflow: 'scroll',
};

export default ({ handleClose, open }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { notifications, unread } = useSelector((state) => state.notifications);

  const handleReadOne = (id) => {
    dispatch(readOneNotification(id));
    setTimeout(() => {});
  };

  const handleReadAll = () => {
    dispatch(markAllNotifications());
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            padding: '0px 10px',
            position: 'sticky',
            top: 0,
            backgroundColor: '#fff',
            zIndex: 1000,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              padding: '12px',
              color: '#1A2D6D',
              fontWeight: 400,
            }}
          >
            Notifications
          </Typography>
          <Buttons
            variant="contained"
            onClick={handleReadAll}
            disabled={unread === 0 && 'disabled'}
            sx={{
              width: {
                xs: 180,
                sm: 150,
              },
              height: 40,
              margin: {
                xs: '30px 0px',
                sm: '20px 0px',
              },
              backgroundColor: '#1A2D6D',
              fontSize: { sm: '15px', sx: '12px' },
              color: 'white',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#1A2D6D',
              },
            }}
            value="Mark All"
          />
        </Grid>
        {unread === 0 && notifications.length <= 0 ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <img src={Error} width="400px" height="200px" />
            <Typography> You do not have any notification yet</Typography>
          </Grid>
        ) : (
          <Box sx={{ border: '1px solid #CCCCCC', padding: '10px' }}>
            {notifications.results?.map((notification) => (
              <>
                <Box
                  onClick={() => handleReadOne(notification.id)}
                  sx={{
                    backgroundColor: '#EBF2FA',
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    sx={{
                      padding: '5px',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: notification.isRead === false ? 500 : 300,
                      }}
                    >
                      from:{' '}
                      {`${notification.sender.first_name} ${notification.sender.last_name}`}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      padding: 2,
                      fontWeight: notification.isRead === false ? 500 : 300,
                      color: '#1A2D6D',
                    }}
                  >
                    {notification.details}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: notification.isRead === false ? 500 : 300,
                      display: 'flex',
                      justifyContent: 'flex-end',
                      color: '#1A2D6D',
                      fontSize: '12px',
                      paddingRight: '8px',
                    }}
                  >
                    {new Date(notification.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <Divider />
              </>
            ))}
          </Box>
        )}
      </Box>
    </Modal>
  );
};
