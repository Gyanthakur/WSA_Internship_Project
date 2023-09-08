import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: JSON.parse(window.localStorage.getItem('locationInfo')) || {
    location: 'patna',
    lat: '25.603916',
    lng: '85.1360248',
  },
};
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { changeLocation } = locationSlice.actions;
export default locationSlice.reducer;
