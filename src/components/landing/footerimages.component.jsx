/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-spacing */
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getAcc,
  fetchAccommodationsAction,
} from '../../redux/actions/accommodation.action';
import store from '../../redux/store';
import { Stars } from './stars.component';

const FooterImage = () => {
  const accommodation = useSelector((state) => state.accommodationReducer);
  let accommodations = [];

  useEffect(() => {
    store.dispatch(getAcc());
  }, []);

  if (window.innerWidth < 600) {
    /* istanbul ignore next */
    accommodations = accommodation.accommodations.slice(0, 1);
  } else {
    accommodations = accommodation.accommodations;
  }

  return (
    <ImageList
      gap={0}
      data-testid="image-list"
      sx={{
        marginBottom: '0',
        paddingTop: '200px',
        '@media(max-width: 600px)': {
          overflow: 'hidden',
        },
      }}
      cols={accommodations.length}
    >
      {accommodations.length > 0 ? (
        /* istanbul ignore next */
        accommodations.map((item) => (
          /* istanbul ignore next */
          <ImageListItem key={item.id}>
            <img
              src={`${item.images[0]}?w=248&fit=crop&auto=format`}
              srcSet={`${item.images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{ maxHeight: '200px' }}
            />
            <ImageListItemBar
              aria-label="bar"
              title={item.name}
              subtitle={item.amenities[0]}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.name}`}
                >
                  <Stars rates={item.rates} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))
      ) : (
        <>
          <ImageListItem>
            <Skeleton variant="rectangular" height="200px" />
            <ImageListItemBar
              title={<Skeleton />}
              subtitle={<Skeleton />}
              actionIcon={
                <IconButton>
                  <Skeleton variant="circular" />
                </IconButton>
              }
            />
          </ImageListItem>
        </>
      )}
    </ImageList>
  );
};

export default FooterImage;
