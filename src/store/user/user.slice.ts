import { IInitialState } from "./user.interface"
import { createSlice } from "@reduxjs/toolkit"
import { login, logout, register } from "./user.actions"
import { getStoreLocal } from "../../utils/local-storage"
const initialState: IInitialState = {
    user: getStoreLocal('user'),
    isLoading: false,
    type: 'login',
    email: '',
    errorMessage: '',
    message:''
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setType: (state, action) => {
            state.type = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.user = payload.data.user;
            state.message = payload.message
        })
        .addCase(register.rejected, state => {
            state.isLoading = false;
        })
        .addCase(login.pending, state => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, {payload}) => {
            if(payload.status === 'success') {
                state.isLoading = false
                state.user = payload.data.user;
                state.message = payload.message;
            } else {
                state.isLoading = false
                state.errorMessage = payload.message
            }

        })
        .addCase(login.rejected, state => {
            state.isLoading = false
            state.user = null
        })
        .addCase(logout.fulfilled, state => {
            state.isLoading = false
            state.user = null
        })

    }
})