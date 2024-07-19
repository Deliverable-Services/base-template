import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: true,
  },
  reducers: {
    setUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { isLoading } = userSlice.actions;

export default userSlice.reducer;
