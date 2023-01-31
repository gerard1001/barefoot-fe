/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Box,
  Typography,
  Grid,
  ThemeProvider,
  Avatar,
  MenuItem,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import { styled } from '@mui/styles';
import countryListJs from 'country-list-js';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { theme } from '../styles/styles';
import Buttons from '../components/button';
import { profileSchema } from '../validation/profile.validation';
import nationalities from '../data/nationality.json';
import { getAllLocations } from '../redux/actions/location.action';
import store from '../redux/store';
import {
  retrieveAction,
  updatingAction,
} from '../redux/actions/profile.action';
import { getUserLocation } from '../helpers/signup.helper';
import ControlledInputs from '../components/controlledInput';
import ControlledSelect from '../components/controlledSelect';
import ControlledDate from '../components/controlledDate';
import ControlledSwitch from '../components/controlledSwitch';
import ControlledFile from '../components/controlledFileInput';
import { loggedInUser } from '../redux/actions/auth';

const Responsive = styled('div')(() => ({
  [theme.breakpoints.up('mobile')]: {},
  [theme.breakpoints.up('tablet')]: {},
  [theme.breakpoints.up('desktop')]: {},
}));

const countries = countryListJs.names();
/* istanbul ignore next */
const Profile = () => {
  const [fullLoad, setFullLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLocation, setFetchLocation] = useState([]);
  const gender = ['Male', 'Female'];
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      age: 0,
      occupation: '',
      language: '',
      country: '',
      nationality: '',
      bio: '',
      gender: '',
      location: '',
      dateOfBirth: null,
      profilePicture: '',
    },
    resolver: yupResolver(profileSchema),
  });
  /* istanbul ignore next */
  const submit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('first_name', data.firstName);
    formData.append('last_name', data.lastName);
    formData.append('age', data.age);
    data.occupation === null
      ? formData.append('occupation', '')
      : formData.append('occupation', data.occupation);
    data.language === null
      ? formData.append('language', '')
      : formData.append('language', data.language);
    data.nationality === null
      ? formData.append('nationality', '')
      : formData.append('nationality', data.nationality);
    data.dateOfBirth === null
      ? formData.append('date_of_birth', '')
      : formData.append(
          'date_of_birth',
          new Date(data.dateOfBirth).toISOString(),
        );
    data.bio === null
      ? formData.append('bio', '')
      : formData.append('bio', data.bio);
    typeof data.profilePicture === 'object'
      ? formData.append('profile_picture', data.profilePicture)
      : null;
    data.gender === null
      ? formData.append('gender', '')
      : formData.append('gender', data.gender);
    data.country === null
      ? formData.append('country', '')
      : formData.append('country', data.country);
    formData.append('email_notification', data.emailNotification);
    formData.append('in_app_notification', data.appNotification);
    data.location == 'Use my current location'
      ? formData.append('location_id', await getUserLocation())
      : formData.append('location_id', data.location);

    store.dispatch(updatingAction(formData));
    store.subscribe(() => {
      const { profileReducer } = store.getState();
      if (profileReducer.profile) {
        setLoading(false);
        store.dispatch(retrieveAction());
      } else {
        setLoading(false);
      }
    });
  };
  /* istanbul ignore next */
  const actions = async () => {
    await store.dispatch(retrieveAction());
    await store.dispatch(getAllLocations());
    const { profileReducer, locationReducer } = store.getState();
    setFetchLocation(locationReducer.data.data.results);
    if (profileReducer.data) {
      setValue('firstName', profileReducer.data.user.first_name, {
        shouldTouch: true,
      });
      setValue('lastName', profileReducer.data.user.last_name, {
        shouldTouch: true,
      });
      setValue('age', profileReducer.data.user.profile.age, {
        shouldTouch: true,
      });
      setValue('language', profileReducer.data.user.profile.language, {
        shouldTouch: true,
      });
      setValue('dateOfBirth', profileReducer.data.user.profile.date_of_birth, {
        shouldTouch: true,
      });
      setValue('nationality', profileReducer.data.user.profile.nationality, {
        shouldTouch: true,
      });
      setValue('bio', profileReducer.data.user.profile.bio, {
        shouldTouch: true,
      });
      setValue('gender', profileReducer.data.user.profile.gender, {
        shouldTouch: true,
      });
      setValue('country', profileReducer.data.user.profile.country, {
        shouldTouch: true,
      });
      setValue(
        'appNotification',
        profileReducer.data.user.in_app_notification,
        {
          shouldTouch: true,
        },
      );
      setValue(
        'emailNotification',
        profileReducer.data.user.email_notification,
        { shouldTouch: true },
      );
      setValue('location', profileReducer.data.user.location_id, {
        shouldTouch: true,
      });
      setValue('occupation', profileReducer.data.user.profile.occupation, {
        shouldTouch: true,
      });
      setValue('profilePicture', profileReducer.data.user.profile_picture);

      setFullLoad(true);
    }
  };
  useEffect(() => {
    actions();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Responsive>
        <>
          <Box sx={{ display: 'flex' }}>
            <Paper elevation={0}>
              <Typography
                variant="h6"
                sx={{
                  color: '#00095E',
                  padding: '15px',
                  paddingLeft: '30px',
                  fontSize: '18px',
                  fontFamily: 'Josefin Sans, sans-serif',
                }}
              >
                Profile setting
              </Typography>
              <form onSubmit={handleSubmit(submit)}>
                <Grid container rowSpacing={{ mobile: 3, tablet: 0 }}>
                  <Grid item tablet={4} mobile={12}>
                    {fullLoad ? (
                      <Box
                        sx={{
                          backgroundColor: '#EBF2FA',
                          color: '#00095E',
                          margin: {
                            tablet: '0px 0px 0px 20px',
                            mobile: '0px 20px 0px 20px',
                          },
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: '10px 0px',
                          borderRadius: '10px',
                        }}
                      >
                        {watch('profilePicture') &&
                        typeof watch('profilePicture') === 'string' ? (
                          <Avatar
                            alt="profile picture"
                            name="imagePreview"
                            src={watch('profilePicture')}
                            sx={{ width: 150, height: 150, margin: '10px 0px' }}
                          />
                        ) : (
                          <Avatar
                            alt="profile picture"
                            name="imagePreview"
                            src={window.URL.createObjectURL(
                              new Blob([watch('profilePicture')], {
                                type: 'application/zip',
                              }),
                            )}
                            sx={{ width: 150, height: 150, margin: '10px 0px' }}
                          />
                        )}
                        <ControlledFile
                          name="profilePicture"
                          control={control}
                        />
                      </Box>
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        sx={{
                          backgroundColor: '#EBF2FA',
                          color: '#00095E',
                          width: '250px',
                          height: '300px',
                          borderRadius: '10px',
                          margin: '0px 0px 0px 30px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item tablet={8}>
                    {fullLoad ? (
                      <Box
                        sx={{
                          backgroundColor: '#EBF2FA',
                          color: '#00095E',
                          margin: '0px 20px',
                          borderRadius: '10px',
                          padding: '10px 30px',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#00095E',
                            fontSize: '22px',
                          }}
                        >
                          Edit information
                        </Typography>
                        <Grid container columnSpacing={2}>
                          <Grid item laptop={6} mobile={12}>
                            <ControlledInputs
                              name="firstName"
                              control={control}
                              label="First name"
                              {...(errors?.firstName && {
                                error: true,
                                helperText: errors.firstName.message,
                              })}
                            />
                          </Grid>
                          <Grid item laptop={6} mobile={12}>
                            <ControlledInputs
                              name="lastName"
                              control={control}
                              label="Last name"
                              {...(errors?.lastName && {
                                error: true,
                                helperText: errors.lastName.message,
                              })}
                            />
                          </Grid>
                          <Grid item laptop={6} mobile={12}>
                            <ControlledInputs
                              name="age"
                              control={control}
                              label="Age"
                              inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                              }}
                              {...(errors?.age && {
                                error: true,
                                helperText: errors.age.message,
                              })}
                            />
                          </Grid>
                          <Grid item laptop={6} paddingTop={2.5} mobile={12}>
                            <ControlledSelect
                              name="gender"
                              inputValue="Gender"
                              control={control}
                              label="Gender"
                              menu={gender.map((g) => (
                                <MenuItem value={g} key={g}>
                                  {g}
                                </MenuItem>
                              ))}
                              currentLocation={null}
                            />
                          </Grid>
                          <Grid
                            item
                            laptop={6}
                            mobile={12}
                            sx={{
                              paddingTop: {
                                mobile: 2.5,
                                laptop: 0,
                              },
                            }}
                          >
                            <ControlledInputs
                              name="occupation"
                              label="Occupation"
                              control={control}
                              {...(errors?.occupation && {
                                error: true,
                                helperText: errors.occupation.message,
                              })}
                            />
                          </Grid>
                          <Grid item laptop={6} paddingTop={2.5} mobile={12}>
                            <ControlledSelect
                              name="country"
                              inputValue="Country"
                              control={control}
                              label="Country"
                              menu={countries.map((name) => (
                                <MenuItem value={name} key={name}>
                                  {name}
                                </MenuItem>
                              ))}
                              currentLocation={null}
                            />
                          </Grid>
                          <Grid
                            item
                            laptop={6}
                            mobile={12}
                            sx={{
                              paddingTop: {
                                mobile: 2.5,
                                laptop: 0,
                              },
                            }}
                          >
                            <ControlledInputs
                              name="language"
                              label="Language"
                              control={control}
                              {...(errors?.language && {
                                error: true,
                                helperText: errors.language.message,
                              })}
                            />
                          </Grid>
                          <Grid item laptop={6} paddingTop={2.5} mobile={12}>
                            <ControlledSelect
                              name="nationality"
                              inputValue="Nationality"
                              control={control}
                              label="Nationality"
                              menu={nationalities.map((origin) => (
                                <MenuItem
                                  value={origin.nationality}
                                  key={origin.nationality}
                                >
                                  {origin.nationality}
                                </MenuItem>
                              ))}
                              currentLocation={null}
                            />
                          </Grid>

                          <Grid
                            item
                            laptop={6}
                            mobile={12}
                            sx={{
                              paddingTop: {
                                mobile: 4.5,
                                laptop: 2.5,
                                desktop: 2.5,
                              },
                            }}
                          >
                            <ControlledDate
                              name="dateOfBirth"
                              label="Date of birth"
                              control={control}
                            />
                          </Grid>
                          <Grid item laptop={6} paddingTop={2.5} mobile={12}>
                            <ControlledSelect
                              name="location"
                              inputValue="Location"
                              control={control}
                              label="Location"
                              menu={
                                fetchLocation
                                  ? fetchLocation.map((locations) => (
                                      <MenuItem
                                        value={locations.id}
                                        key={locations.id}
                                        data-testid={`id-${locations.id}`}
                                      >
                                        {locations.name}
                                      </MenuItem>
                                    ))
                                  : null
                              }
                              currentLocation={
                                <MenuItem
                                  key="x"
                                  value="Use my current location"
                                  fontSize="20"
                                >
                                  Use my current location
                                </MenuItem>
                              }
                            />
                          </Grid>
                          <Grid item mobile={12}>
                            <ControlledInputs
                              name="bio"
                              label="Bio"
                              control={control}
                              multiline
                              rows={5}
                            />
                          </Grid>
                          <Grid item mobile={12}>
                            <ControlledSwitch
                              name="emailNotification"
                              control={control}
                              label="Email notification"
                            />
                          </Grid>
                          <Grid item mobile={12}>
                            <ControlledSwitch
                              name="appNotification"
                              control={control}
                              label="App notification"
                              sx={{
                                marginTop: 0,
                              }}
                            />
                          </Grid>
                        </Grid>

                        <Box>
                          <Buttons
                            variant="contained"
                            type="submit"
                            sx={{
                              height: '50px',
                              width: 200,
                              backgroundColor: '#00095E',
                              fontSize: '18px',
                              color: 'white',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: '#00095E',
                              },
                              margin: '20px 0px',
                            }}
                            value={
                              loading ? (
                                <CircularProgress
                                  sx={{
                                    color: 'white',
                                  }}
                                  size={30}
                                  thickness={4}
                                  data-testid="spinner"
                                />
                              ) : (
                                'Update profile'
                              )
                            }
                          />
                        </Box>
                      </Box>
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        sx={{
                          backgroundColor: '#EBF2FA',
                          color: '#00095E',
                          borderRadius: '10px',
                          width: {
                            mobile: '250px',
                            tablet: '400px',
                          },
                          height: '600px',
                          margin: {
                            mobile: '0px 0px 0px 30px',
                            tablet: '0px 0px 0px 80px',
                          },
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Box>
        </>
      </Responsive>
    </ThemeProvider>
  );
};

export default Profile;
