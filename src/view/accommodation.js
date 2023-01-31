/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import { Typography, Grid, CardActionArea, Paper, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import {
  deleteAccommodationAction,
  fetchAccommodationsAction,
  likeAccommodationAction,
} from '../redux/actions/accommodation.action';
import { Stars } from '../components/landing/stars.component';
import { AccommodationModal } from '../components/AccommodationModal';
import Dialog from '../helpers/Dialog';
import { unloggedInUser } from '../helpers/login.helpers';

export const AccommodationCard = () => {
  const accommodationState = useSelector(
    (state) => state.fetchAllAccommodations,
  );
  const [accommodationId, setAccommodationId] = useState('');
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = (data) => {
    setOpen(true);
    setData(data);
  };
  const handleClose = () => setOpen(false);

  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    setAccommodationId(id);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    dispatch(fetchAccommodationsAction(page, 6));
  }, [page, dispatch]);

  const pagination = accommodationState.accommodations?.data?.pagination;

  const handleNext = () => {
    if (page < pagination.totalpages) {
      setPage(page + 1);
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleDeleteAction = () => {
    dispatch(deleteAccommodationAction(accommodationId));
    handleCloseDialog();
    dispatch(fetchAccommodationsAction(1, 6));
  };
  const likeAccommodation = async (id) => {
    dispatch(likeAccommodationAction(id));
  };
  const role =
    JSON.parse(localStorage.getItem('userCredentials')) ?? unloggedInUser;
  return (
    <Box>
      <Grid
        container
        key="pagination-icons"
        sx={{
          width: '100%',
          justifyContent: 'end',
          padding: '0 30px 0 0',
          color: '#1A2D6D',
          alignItems: 'center',
        }}
      >
        <Typography>
          {page} - {pagination?.totalpages} of {pagination?.totalItems}
        </Typography>
        <IconButton
          disabled={page === 1 ? true : null}
          onClick={handlePrevious}
          style={{
            color: '#1A2D6D',
          }}
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          disabled={page === pagination?.totalpages ? true : null}
          onClick={handleNext}
          style={{
            color: '#1A2D6D',
          }}
        >
          <NavigateNext />
        </IconButton>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          marginLeft: 0,
          // padding: '30px 0 30px 30px',
          fontFamily: 'Josefin Sans, sans-serif',
        }}
      >
        {accommodationState.pending === true && (
          <Paper item sx={{ position: 'realitve', left: '50%' }}>
            <Paper
              elevation={0}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                transform: 'translateY(-50%)',
                background: 'transparent',
              }}
            >
              <CircularProgress size={60} />
            </Paper>
          </Paper>
        )}

        {!accommodationState.loading &&
          accommodationState.accommodations?.data?.results?.map(
            (accommodation) => (
              <Grid
                item
                md={4}
                key={accommodation.id}
                elevation={2}
                sx={{ marginBottom: '50px', paddingRight: '40px' }}
              >
                <Card sx={{ width: 270, height: 350 }}>
                  <Link
                    to={
                      role.role_id === 0
                        ? `/accommodations/${accommodation.id}`
                        : `/dashboard/accommodations/${accommodation.id}`
                    }
                  >
                    <CardActionArea value={accommodation.id}>
                      <CardMedia
                        component="img"
                        alt="Image"
                        height="180"
                        width="auto"
                        image={accommodation.images[0]}
                      />
                    </CardActionArea>
                  </Link>
                  <CardContent>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        color="#00095E"
                        variant="h6"
                        component="div"
                        fontFamily="Josefin Sans, sans-serif"
                      >
                        {accommodation.name}
                      </Typography>
                      <div>
                        <IconButton
                          size="small"
                          style={{
                            color: '#00095E',
                          }}
                          onClick={() => {
                            likeAccommodation(accommodation.id);
                          }}
                        >
                          {accommodation.likes !== 0 && <FavoriteIcon />}
                          {accommodation.likes === 0 && <FavoriteBorderIcon />}
                        </IconButton>
                        {accommodation.likes} likes
                      </div>
                    </div>
                    <Typography variant="subtitle2" color="#7EA0FF">
                      {accommodation.Locations.country}
                    </Typography>
                  </CardContent>
                  <CardActions justifyContent="space-between">
                    <Stars rates={accommodation.rates} />
                    {role.role_id === 2 || role.role_id === 1 ? (
                      <div
                        style={{
                          position: 'relative',
                        }}
                      >
                        <IconButton
                          onClick={() => handleOpen(accommodation)}
                          style={{
                            color: '#1A2D6D',
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleOpenDialog(accommodation.id)}
                          style={{
                            color: '#EC5C5C',
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ) : null}
                  </CardActions>
                </Card>
              </Grid>
            ),
          )}
        <AccommodationModal
          open={open}
          title="Update Accommodation"
          handleClose={handleClose}
          inputData={data}
        />
        <Dialog
          open={openDialog}
          handleClose={handleCloseDialog}
          confirm="Confirm"
          cancel="Cancel"
          text="Are you sure you want to delete this accommodation?"
          handleSubmit={handleDeleteAction}
        />
      </Grid>
    </Box>
  );
};
