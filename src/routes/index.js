/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LandingPage from '../view/index';
import Login from '../view/login';
import Signup from '../view/signup';
import EmailVerification from '../view/verifyEmail';
import GoogleLogin from '../view/google_login';
import Forgot from '../view/Forgot';
import ResetPassword from '../view/ResetPassword';
import TravelAdmin from '../view/travel-admin';
import DashboardPreview from '../layouts/requester';
import RequesterContent from '../view/requesterContent';
import Profile from '../view/profile';
import UserSettingsModal from '../components/user_role';
import { AccommodationDetails } from '../view/accommodationDetails';
import AccommodationPage from '../view/allAccommodations';
import BookingPage from '../view/bookingPage';
import PageNotFound from '../components/PageNotFound';
import { ReadOneTrip } from '../components/read_one_trip';
import ChatPage from '../view/chatPage';
import Assignmanager from '../components/assign_manager';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A2D6D',
      text: '#fff',
    },
    secondary: {
      main: '#0B2C5f',
      text: '#fff',
    },
    error: {
      main: '#EC5C5C',
      text: '#1A2D6D',
    },
    success: {
      main: '#0ABDA0',
      text: '#1A2D6D',
    },
    backgroundLightBlue: {
      main: '#EBF2FA',
      text: '#1A2D6D',
    },
    // text: {
    //   primary: '#0000',
    //   secondary: '#fff',
    // },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    margin: 0,
    color: '#1A2D6D',
    '@media (max-width:600px)': {
      fontSize: 12,
    },
  },
});

const AllRoutes = (props) => (
  <ThemeProvider theme={theme}>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/social/login" element={<GoogleLogin />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route path="/accommodations" element={<AccommodationPage />} />
        <Route
          exact
          path="accommodations/:id"
          element={<AccommodationDetails />}
        />
        <Route
          exact
          path="/verify"
          element={<EmailVerification {...props} />}
        />
        <Route exact path="/forgot" element={<Forgot />} />
        <Route
          exact
          path="/resetPassword"
          element={<ResetPassword {...props} />}
        />
        <Route exact path="/dashboard/*" element={<DashboardPreview />}>
          <Route
            exact
            path=""
            element={<Navigate to="trips" replace="true" />}
          />

          <Route exact path="trips" element={<RequesterContent />} />
          <Route exact path="trips/:id" element={<ReadOneTrip />} />
          <Route exact path="profile" element={<Profile />} />
          <Route exact path="roles" element={<UserSettingsModal />} />
          <Route exact path="settings" element={<Assignmanager />} />
          <Route exact path="accommodations" element={<TravelAdmin />} />
          <Route exact path="bookings" element={<BookingPage />} />
          <Route
            exact
            path="accommodations/:id"
            element={<AccommodationDetails />}
          />
          <Route exact path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default AllRoutes;
