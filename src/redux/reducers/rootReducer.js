/* eslint-disable import/no-duplicates */
import { combineReducers } from 'redux';
import { userReducer, loggedInUserReducer } from './userReducer';
import { signupReducer } from './signup.reducer';
import { locationReducer } from './location.reducer';
import landingReducer from './locations.reducer';
import { emailVerificationReducer } from './verification.reducer';
import { forgot } from './ForgotReducer';
import { Reset } from './ResetPasswordReducer';
import accommodationReducer from './accommodation.reducer';
import { requestsReducer } from './requesterDashboard';
import { profileReducer } from './profileReducer';
import { CreateTripReducer } from './CreateTrip.reducer';
import { UpdateTrip } from './UpdateTrip.reducer';
import { assignRoleReducer } from './user_role_settings.reducer';
import { getRoleReducer } from './get_roles_reducer';
import { getUserReducer } from './get_users_reducer';
import { fetchNotifications } from './notification.reducer';
import {
  fetchSingleAccommodationReducer,
  fetchAllAccommodations,
  createAccommodationReducer,
  deleteAccommodationReducer,
  updateAccommodationReducer,
  fetchCommentsReducer,
} from './accommodation.reducer';
import { createRoomReducer, fetchRoomsReducer } from './room.reducer';
import { bookingReducer } from './booking.reducer';
import { getTripReducer } from './read_one_trip.reducer';
import chatReducer from './chat.reducer';
import { assignManagerReducer } from './assign_manager.reducer';
import tripCommentReducer from './tripComment.reducer';

const rootReducer = combineReducers({
  getUserReducer,
  getRoleReducer,
  loggedInUser: loggedInUserReducer,
  userReducer,
  signupReducer,
  locationReducer,
  landingReducer,
  emailVerificationReducer,
  fetchAllAccommodations,
  fetchSingleAccommodationReducer,
  createAccommodationReducer,
  updateAccommodationReducer,
  deleteAccommodationReducer,
  createRoomReducer,
  fetchRoomsReducer,
  forgot,
  Reset,
  accommodationReducer,
  requestsReducer,
  profileReducer,
  CreateTripReducer,
  UpdateTrip,
  assignRoleReducer,
  notifications: fetchNotifications,
  accommodationComments: fetchCommentsReducer,
  getTripReducer,
  chatReducer,
  assignManagerReducer,
  tripCommentReducer,
  bookingReducer,
});
export default rootReducer;
