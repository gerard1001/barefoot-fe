/* istanbul ignore next */
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Menu,
  MenuItem,
  Modal,
  Skeleton,
  Stack,
  styled,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { useTheme } from '@mui/styles';
import {
  createTripCommentAction,
  deleteTripCommentAction,
  editTripCommentAction,
  getTripCommentsAction,
  getTripMoreCommentsAction,
} from '../redux/actions/tripComment.action';
import {
  formatCapitalAll,
  formatCapitalFirst,
} from '../helpers/OneTrip.helper';
import {
  createCommentSchema,
  editCommentSchema,
} from '../validation/OneTrip.validation';
import Error from '../assets/error.svg';
import store from '../redux/store';

const WrappingCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme?.palette.backgroundLightBlue.main,
  position: 'relative',
  padding: '10px',
}));
const HeaderText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '16px',
  fontFamily: 'Josefin Sans',
  [theme?.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
}));
const HeaderLargeText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '20px',
  fontFamily: 'Josefin Sans',
  [theme?.breakpoints.down('sm')]: {
    fontSize: '16px',
  },
}));
const BodyText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '14px',
  fontFamily: 'Roboto',
  [theme?.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
}));
const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: '50px',
  height: '50px',
  [theme?.breakpoints.down('sm')]: {
    width: '40px',
    height: '40px',
  },
}));
const CustomMoreHorizIcon = styled(MoreHorizIcon)(({ theme }) => ({
  position: 'absolute',
  top: '3px',
  right: '5px',
  zIndex: 100,
}));
const ModalConfirmationButton = styled(Button)(({ type, theme, loading }) => ({
  maxWidth: '111px',
  width: '100%',
  height: '37px',
  color: theme?.palette.success.text,
  backgroundColor:
    type === 'success'
      ? theme?.palette.success.main
      : theme?.palette.error.main,
  '&:hover': {
    backgroundColor:
      type === 'success'
        ? theme?.palette.success.main
        : theme?.palette.error.main,
  },
  [theme?.breakpoints.down('sm')]: {
    maxWidth: '80px',
    height: '30px',
  },
}));
const InputField = ({ otherStyles, ...props }) => (
  <TextField
    {...props}
    sx={{
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
      ...otherStyles,
    }}
  />
);
const LoadingSkeleton = () => (
  <WrappingCard>
    <Stack direction="row" spacing={{ xs: '10px' }}>
      <Skeleton variant="circular" width="50px" height="50px" />
      <Grid direction="column" container>
        <Grid item>
          <Skeleton variant="text" height="20px">
            <HeaderText color="primary">
              {`${formatCapitalAll('Loading')} ${formatCapitalFirst('Name')}`}
            </HeaderText>
          </Skeleton>
        </Grid>
        <Grid item>
          <Skeleton variant="text" height="20px">
            <BodyText color="primary">
              vadv asdvasd vsdvasdv asde5r gagnbae rfbaes ner dbawrfn awrv arn
              ae rgvae bar bar b a rbf ara t ba r w r awrbwrbrbaw bawr
            </BodyText>
          </Skeleton>
        </Grid>
      </Grid>
    </Stack>
  </WrappingCard>
);

/* istanbul ignore next */
function TripComment() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [activeComment, setActiveComment] = useState();

  const displayError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const commentFetchLimit = 4;
  const open = Boolean(anchorEl);

  const { id: tripId } = useParams();
  const dispatch = useDispatch();
  const {
    commentRes,
    loading: commentLoading,
    loadingMore: commentLoadingMore,
    loadingDelete: commentLoadingDelete,
    loadingEdit: commentLoadingEdit,
    loadingCreate: commentLoadingCreate,
  } = useSelector((state) => state.tripCommentReducer);
  const {
    control: createControl,
    handleSubmit: createHandleSubmit,
    reset: createReset,
    formState: { errors: createErrors },
  } = useForm({
    resolver: yupResolver(createCommentSchema),
  });
  const {
    control: editControl,
    handleSubmit: editHandleSubmit,
    setValue: editSetValue,
    formState: { errors: editErrors },
  } = useForm({
    resolver: yupResolver(editCommentSchema),
  });

  // set the current page for the next comment fetch
  if (
    commentRes.data &&
    currentPage !== commentRes.data.pagination.currentpage + 1
  ) {
    setCurrentPage(commentRes.data.pagination.currentpage + 1);
  }

  const handleMoreHorizonIconClick = (event, commentId) => {
    setActiveComment(commentId);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditModalOpen = () => {
    commentRes.data.results.map((comment) => {
      if (comment.id === activeComment) {
        editSetValue('editComment', comment.comment, {
          shouldTouch: true,
        });
      }
    });
    setOpenEditModal(true);
  };
  const loadMoreComment = () => {
    dispatch(getTripMoreCommentsAction(currentPage, commentFetchLimit, tripId));
  };
  const deleteComment = () => {
    dispatch(
      deleteTripCommentAction(
        tripId,
        activeComment,
        commentRes.data.pagination.currentpage,
        commentFetchLimit,
        () => setOpenDeleteModal(false),
      ),
    );
  };
  const editComment = (data) => {
    dispatch(
      editTripCommentAction(tripId, activeComment, data.editComment, () => {
        setOpenEditModal(false);
      }),
    );
  };
  const createComment = (data) => {
    dispatch(createTripCommentAction(tripId, data.comment));
    createReset();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userCredentials'));
    if (!user && user?.role_id != 4 && user?.role_id != 3) history('/login');

    const storeSubscription = store.subscribe(() => {
      // displays the error when a state changed and their was an error
      const { error } = store.getState().tripCommentReducer;
      if (error) {
        displayError(error.message);
      }
    });

    dispatch(getTripCommentsAction(currentPage, commentFetchLimit, tripId));

    return () => {
      storeSubscription();
    };
  }, []);

  return (
    <Container
      sx={{
        backgroundColor: '#F8F9FA',
        marginTop: { xs: '10px', sm: '30px', md: '40px' },
      }}
    >
      <HeaderText color="primary">Add Comment:</HeaderText>
      <Stack direction="row" spacing="12px" alignItems="start">
        <Controller
          name="comment"
          control={createControl}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Comment"
              size="small"
              variant="outlined"
              value={value}
              onChange={onChange}
              multiline
              otherStyles={{
                maxWidth: '500px',
                width: '100%',
              }}
              {...(createErrors?.comment && {
                error: true,
                helperText: createErrors.comment.message,
              })}
            />
          )}
        />
        <Button
          variant="contained"
          width={200}
          height="42px"
          color="primary"
          onClick={createHandleSubmit(createComment)}
          disabled={commentLoadingCreate}
        >
          Comment
        </Button>
      </Stack>
      <Stack
        direction="column"
        spacing={{ xs: '7px', md: '10px', xl: '15px' }}
        margin="10px 0px 10px 0px"
        maxWidth="765px"
      >
        {commentLoadingCreate && (
          <WrappingCard>
            <Stack justifyContent="center" alignItems="center">
              <CircularProgress size="30px" />
            </Stack>
          </WrappingCard>
        )}
        {(() => {
          if (commentLoading) {
            return Array.from(Array(6)).map(() => <LoadingSkeleton />);
          }

          if (commentRes.data.results.length === 0) {
            return (
              <WrappingCard
                sx={{
                  display: 'grid',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '30px',
                }}
              >
                <Box maxWidth="500px">
                  <img
                    src={Error}
                    alt="profile image"
                    width="100%"
                    style={{ borderRadius: '15px' }}
                  />
                </Box>
                <BodyText align="center" color="primary">
                  No comments found !!!
                </BodyText>
              </WrappingCard>
            );
          }

          return commentRes.data.results
            .map((comment) => (
              <WrappingCard key={comment.id} data-set-id={comment.id}>
                <CustomMoreHorizIcon
                  color="primary"
                  onClick={(event) =>
                    handleMoreHorizonIconClick(event, comment.id)
                  }
                />
                <Stack direction="row" spacing={{ xs: '10px' }}>
                  <CustomAvatar
                    src={comment.user.profile_picture}
                    alt="profile pic"
                  />
                  <Grid direction="column" container>
                    <Grid item>
                      <HeaderText color="primary">
                        {`${formatCapitalAll(
                          comment.user.first_name,
                        )} ${formatCapitalFirst(comment.user.last_name)}`}
                      </HeaderText>
                    </Grid>
                    <Grid item>
                      <BodyText color="primary">{comment.comment}</BodyText>
                    </Grid>
                  </Grid>
                </Stack>
              </WrappingCard>
            ))
            .concat([
              <Button
                key={0}
                disabled={
                  !!(
                    commentRes.data.pagination.totalpages ===
                      commentRes.data.pagination.currentpage ||
                    commentLoadingMore
                  )
                }
                sx={{
                  display:
                    commentRes.data.pagination.totalpages <= 1
                      ? 'none'
                      : 'flex',
                  flexFlow: 'row nowrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '0px',
                }}
                onClick={() => loadMoreComment()}
              >
                {commentLoadingMore ? (
                  <CircularProgress size={30} />
                ) : (
                  [
                    <KeyboardArrowDownIcon
                      key={0}
                      size="small"
                      sx={{ margin: '5px' }}
                    />,
                    <Typography
                      key={1}
                      fontWeight="bold"
                      fontSize={{ xs: '10px', sm: '14px', md: '16px' }}
                    >
                      Click here to load more comments
                    </Typography>,
                  ]
                )}
              </Button>,
            ]);
        })()}
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleEditModalOpen()}>
          <BodyText color="primary">Edit Comment</BodyText>
        </MenuItem>
        <MenuItem onClick={() => setOpenDeleteModal(true)}>
          <BodyText color="primary">Delete Comment</BodyText>
        </MenuItem>
      </Menu>
      <Modal
        open={openDeleteModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card
          sx={{
            maxWidth: {
              sm: '432px',
              xs: '332px',
            },
            width: '100%',
            padding: '20px',
            margin: '30px',
            borderRadius: '15px',
          }}
        >
          <HeaderLargeText color="primary">Delete Comment</HeaderLargeText>
          <BodyText color="primary">
            Do you want to delete this comment
          </BodyText>
          <Stack
            direction="row"
            justifyContent="end"
            mt={{
              md: '80px',
              sm: '60px',
              xs: '30px',
            }}
            spacing={{ xs: '10px', sm: '15px', md: '21px' }}
          >
            <ModalConfirmationButton
              loading={`${commentLoadingDelete}`}
              type="error"
              onClick={() => setOpenDeleteModal(false)}
              disabled={!!commentLoadingDelete}
            >
              <BodyText color="primary">No</BodyText>
            </ModalConfirmationButton>
            <ModalConfirmationButton
              loading={`${commentLoadingDelete}`}
              type="success"
              onClick={() => deleteComment()}
              disabled={!!commentLoadingDelete}
            >
              <BodyText color="primary">
                {commentLoadingDelete ? (
                  <CircularProgress size="20px" />
                ) : (
                  'Yes'
                )}
              </BodyText>
            </ModalConfirmationButton>
          </Stack>
        </Card>
      </Modal>
      <Modal
        open={openEditModal}
        onClose={commentLoadingEdit ? null : () => setOpenEditModal(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card
          sx={{
            maxWidth: {
              sm: '432px',
              xs: '332px',
            },
            width: '100%',
            padding: '20px',
            margin: '30px',
            borderRadius: '15px',
          }}
        >
          <HeaderLargeText color="primary">Update Comment</HeaderLargeText>
          <Controller
            name="editComment"
            control={editControl}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Edit Comment"
                size="small"
                variant="outlined"
                value={value}
                onChange={onChange}
                fullWidth
                multiline
                otherStyles={{
                  marginTop: '20px',
                }}
                {...(editErrors?.editComment && {
                  error: true,
                  helperText: editErrors.editComment.message,
                })}
              />
            )}
          />
          <Stack
            direction="row"
            justifyContent="end"
            mt={{
              md: '80px',
              sm: '60px',
              xs: '30px',
            }}
            spacing={{ xs: '10px', sm: '15px', md: '21px' }}
          >
            <ModalConfirmationButton
              loading={`${commentLoadingDelete}`}
              type="success"
              color="primary"
              onClick={editHandleSubmit(editComment)}
              disabled={!!commentLoadingEdit}
            >
              <BodyText color="primary" fontWeight="bold">
                {commentLoadingEdit ? <CircularProgress size="20px" /> : 'Edit'}
              </BodyText>
            </ModalConfirmationButton>
          </Stack>
        </Card>
      </Modal>
    </Container>
  );
}

export default TripComment;
