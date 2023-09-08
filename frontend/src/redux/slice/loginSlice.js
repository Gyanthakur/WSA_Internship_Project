import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const loginSlice = createSlice({
	name: 'loginBools',
	initialState,
	reducers: {
		updateSigninSideVisible: (state, action) => {
			state.isSigninSideVisible = action.payload;
		},
	},
});

export const { updateSigninSideVisible } = loginSlice.actions;
export default loginSlice.reducer;
