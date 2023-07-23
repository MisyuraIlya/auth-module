import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "../../modules/Auth/services/auth/auth.service";
import { ILogin, IRegister, IGetAccessToken} from "./user.interface";
import { removeFromStorage } from "../../modules/Auth/services/auth/auth.helper";
import { AuthService } from "../../modules/Auth/services/auth/auth.service";
import { AuthResponse } from "../../types/user.interface";
import {errorCatch} from '../../api/api.helper';

export const register = createAsyncThunk<AuthResponse , IRegister> ('auth/register',
    async(data,thunkApi) => {
        try {
            const response = await AuthService.auth('register', data)
            return response
        } catch(error){
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const login = createAsyncThunk<AuthResponse, ILogin>(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await AuthService.auth('login',data)
            return response
        } catch(error: any) {
            if (error.response) {
                // onErrorAlert(error.response.data.message, 'כדאי לבדוק את הפרטים שהזנת ולנסות שוב')
            }
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async () => {
    removeFromStorage()
})

export const checkAuth = createAsyncThunk<AuthResponse>(
    'auth/accessToken',
    async(_, thunkAPI) => {
        try {
            const response = await AuthService.getNewTokens()
            return response.data.data
        } catch(error) {
            if(errorCatch(error) === 'jwt expired') {
                thunkAPI.dispatch(logout())
            }

            return thunkAPI.rejectWithValue(error)
        }
    }
)