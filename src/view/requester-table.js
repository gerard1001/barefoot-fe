/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import {
  TableRow,
  Paper,
  TableHead,
  TableContainer,
  Table,
  TableBody,
  Button,
  Grid,
  TableFooter,
  TablePagination,
  Typography,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import format from 'date-fns/format';
import { StyledTableCell, StyledTableRow } from '../assets/styles/tableStyles';
import {
  approveRequestAction,
  deleteRequestAction,
  rejectRequestAction,
  retrieveRequests,
} from '../redux/actions/requester.action';
import Spinner from '../helpers/Spinner';
import { TablePaginationActions } from '../helpers/pagination';
import Dialog from '../helpers/Dialog';
import Approve from '../util/Approve';
import { TableSkeleton } from '../util/tableSkeleton';
import Error from '../assets/error.svg';
import TripSearch from '../components/tripSearch';

const RequesterTable = ({ handleEdit, handleOpen }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [requesterId, setRequesterId] = useState(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const theme = useTheme();
  const { pending, error, loading } = useSelector(
    (state) => state.requestsReducer,
  );
  const { data } = useSelector((state) => state.requestsReducer.requests);

  const handleChangePage = (event, newPage) => {
    /* istanbul ignore next */
    setPage(newPage);
  };
  /* istanbul ignore next */
  const handleClickOpen = (id) => {
    setOpen(true);
    setRequesterId(id);
  };

  /* istanbul ignore next */
  const handleClose = () => {
    setOpen(false);
  };
  /* istanbul ignore next */
  const handleSubmit = () => {
    dispatch(deleteRequestAction(requesterId));
    setOpen(false);
  };
  /* istanbul ignore next */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  /* istanbul ignore next */
  const handleApprove = (id) => {
    const status = 'APPROVED';
    dispatch(approveRequestAction(id, status));
  };
  /* istanbul ignore next */
  const handleReject = (id) => {
    const status = 'REJECTED';
    dispatch(rejectRequestAction(id, status));
  };

  const role = JSON.parse(localStorage.getItem('userCredentials'));

  const handleUpdate = (dataTobeUpdated = null) => {
    handleEdit(dataTobeUpdated);
  };

  const history = useNavigate();
  useEffect(() => {
    if (!role && role?.role_id !== 4 && role?.role_id !== 3) history('/login');
    dispatch(retrieveRequests(page, rowsPerPage));
  }, [page, rowsPerPage, dispatch]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.results.length) : 0;
  return (
    <>
      <TripSearch
        handleOpen={handleOpen}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <TableContainer component={Paper} elevation={0} sx={{ padding: '10px' }}>
        {loading && <Spinner />}
        {pending ? (
          <TableSkeleton />
        ) : !pending && data?.results.length > 0 ? (
          <Table
            sx={{ minWidth: 650, backgroundColor: '#EBF2FA' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Reason</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Trip date</StyledTableCell>
                <StyledTableCell align="center">Return Date</StyledTableCell>
                <StyledTableCell align="center">Details</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results.length > 0 &&
                /* istanbul ignore next */
                data?.results.map((row) => (
                  <StyledTableRow
                    key={row.id}
                    style={{ height: '20px !important ' }}
                    onClick={() => {
                      // history(`./${row.id}`);
                    }}
                  >
                    <StyledTableCell align="center">
                      {row.reason}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{
                        color: `${
                          row.status === 'APPROVED'
                            ? '#018786'
                            : row.status === 'REJECTED'
                            ? '#EC5C5C'
                            : '#FFC800'
                        }`,
                        fontSize: 12,
                      }}
                    >
                      {row.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(row.tripDate).toDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(row.returnDate).toDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/dashboard/trips/${row.id}`}
                      >
                        <Button variant="outlined">Details</Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {role.role_id === 1 && (
                        <Approve
                          row={row}
                          handleApprove={handleApprove}
                          handleReject={handleReject}
                        />
                      )}
                      {role.role_id === 3 && (
                        <Approve
                          row={row}
                          handleApprove={handleApprove}
                          handleReject={handleReject}
                        />
                      )}
                      {role.role_id === 4 && (
                        <Grid
                          container
                          justifyContent="space-around"
                          width="70%"
                          alignItems="center"
                          sx={{ marginLeft: 5 }}
                        >
                          <Typography style={{ cursor: 'pointer' }}>
                            {row.status === 'PENDING' && (
                              <EditIcon
                                onClick={() => handleUpdate(row)}
                                sx={{ color: '#1A2D6D' }}
                              />
                            )}
                          </Typography>
                          <Typography style={{ cursor: 'pointer' }}>
                            {row.status === 'PENDING' && (
                              <DeleteIcon
                                sx={{ color: '#EC5C5C' }}
                                onClick={() => handleClickOpen(row.id)}
                              />
                            )}
                          </Typography>
                        </Grid>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 5 * emptyRows }}>
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
            <TableFooter>
              <StyledTableRow>
                <TablePagination
                  sx={{ marginBottom: '0px' }}
                  align="right"
                  rowsPerPageOptions={[5, 10, 25]}
                  labelRowsPerPage="limit"
                  colSpan={6}
                  data={data.results}
                  count={(data && data.pagination.totalItems) || 10}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'limit',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </StyledTableRow>
            </TableFooter>
          </Table>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '100px',
              padding: '2px',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={Error} alt="error message" width="500px" />
            <Typography variant="body1"> You have No trips Requests</Typography>
          </Box>
        )}
      </TableContainer>
      <Dialog
        open={open}
        handleClose={handleClose}
        confirm="Confirm"
        cancel="Cancel"
        text="Are you sure you want to delete this trip"
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default RequesterTable;
