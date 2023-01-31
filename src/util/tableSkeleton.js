import { Skeleton, Box } from '@mui/material';
import React from 'react';

const skeletonCss = {
  padding: '25px',
  paddingBottom: '10px',
};

export const TableSkeleton = () => (
  <Box>
    <Skeleton animation="wave" sx={skeletonCss} />
    <Skeleton animation="wave" sx={skeletonCss} />
    <Skeleton animation="wave" sx={skeletonCss} />
    <Skeleton animation="wave" sx={skeletonCss} />
    <Skeleton animation="wave" sx={skeletonCss} />
    <Skeleton animation="wave" sx={skeletonCss} />
    <Skeleton animation="wave" sx={skeletonCss} />
  </Box>
);
