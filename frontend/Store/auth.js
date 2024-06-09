import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { token: null, isLoggedIn: false };

export const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        loggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        loggedOut(state) {
            state.token = null;
            state.isLoggedIn = false;
        }
    }
});
