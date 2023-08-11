import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth, AuthApi } from "../../modules/Auth/services/auth/auth.service";
import { ILogin, IRegister} from "./user.interface";
import { removeFromStorage } from "../../modules/Auth/services/auth/auth.helper";
import { AuthService } from "../../modules/Auth/services/auth/auth.service";
import { BooleanResponse} from "../../types/user.interface";
import {errorCatch} from '../../api/api.helper';
import { AuthResponse } from "../../modules/Auth/services/auth/auth.service";

export const login = createAsyncThunk<AuthApi, ILogin>('auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await AuthService.login(data)
            return response.data
        } catch(error: any) {
            if (error.response) {
                // onErrorAlert(error.response.data.message, 'כדאי לבדוק את הפרטים שהזנת ולנסות שוב')
            }
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const register = createAsyncThunk<AuthApi , IRegister> ('auth/register',
    async(data,thunkApi) => {
        try {
            const response = await AuthService.register(data)
            return response.data
        } catch(error){
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const checkAuth = createAsyncThunk<AuthResponse>(
    'auth/accessToken',
    async(_, thunkAPI) => {
        try {
            const response = await AuthService.getNewTokens()
            return response.data
        } catch(error) {
            if(errorCatch(error) === 'jwt expired') {
                thunkAPI.dispatch(logout())
            }

            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async () => {
    removeFromStorage()
    window.location.reload();
})
