import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',  // Slice name
    initialState: {  // Initial state
        user: null,
        role: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.role = action.payload.role;
        },
        logout(state) {
            state.user = null;
            state.role = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;  // Export actions
export default userSlice.reducer;  // Export reducer