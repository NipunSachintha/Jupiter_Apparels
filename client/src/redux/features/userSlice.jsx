import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',  // Slice name
    initialState: {  // Initial state
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;  // Export actions
export default userSlice.reducer;  // Export reducer