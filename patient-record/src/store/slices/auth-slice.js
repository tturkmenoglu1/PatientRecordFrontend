import { createSlice } from "@reduxjs/toolkit";



export const authSlice = createSlice({
    name:" ",
    initialState: {
        isUserLogin: false,
        user: {}
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isUserLogin = true;
            state.user = action.payload;
        },
        loginFailed: (state) => {
            state.isUserLogin = false;
            state.user = {}
        },
        logout: (state) => {
            state.isUserLogin = false;
            state.user = {}
        }
    }
})

export const { loginSuccess, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer;