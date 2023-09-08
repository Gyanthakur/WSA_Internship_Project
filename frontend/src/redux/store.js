import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import searchReducer from './slice/searchSlice';
import authReducer from './slice/authSlice';
import loginReducer from './slice/loginSlice';
import locationReducer from './slice/locationSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    auth: authReducer,
    loginBools: loginReducer,
    location: locationReducer,
  },
});

export default store;
