import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	isAuth: false,
};
const cartSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuth = true;
			state.user = action.payload;
		},

		logout: state => {
			state.isAuth = false;
		},
	},
});

export const { login, logout } = cartSlice.actions;
export default cartSlice.reducer;
