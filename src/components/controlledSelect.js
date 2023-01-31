import React from 'react';
import { Controller } from 'react-hook-form';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

const ControlledSelect = ({
  inputValue,
  name,
  label,
  menu,
  currentLocation,
  control,
}) => (
  <FormControl
    sx={{
      '& .MuiInputBase-root': {
        color: '#00095E',
        '& fieldset': {
          borderColor: '#00095E',
        },

        '&.Mui-focused fieldset': {
          borderColor: '#00095E',
        },
      },
      '& .MuiFormLabel-root': {
        color: '#00095E',
      },
      '& .MuiFormLabel-root.Mui-focused': {
        color: '#00095E',
      },
      width: '100%',
    }}
  >
    <InputLabel>{inputValue}</InputLabel>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          label={label}
          onChange={onChange}
          value={value}
          data-testid="locations-select"
        >
          <MenuItem value={'' || null}>
            <em>None</em>
          </MenuItem>
          {menu}
          {currentLocation}
          {/* {fetchLocation
            ? fetchLocation.map((locations) => (
              <MenuItem
                value={locations.id}
                key={locations.id}
                data-testid={`id-${locations.id}`}
              >
                {locations.name}
              </MenuItem>
            ))
            : null}
          <MenuItem key="x" value="Use my current location" fontSize="20">
            Use my current location
          </MenuItem> */}
        </Select>
      )}
    />
  </FormControl>
);

export default ControlledSelect;
