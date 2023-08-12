import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponse } from "../../modules/Auth/types/AuthTypes";
import { ILogin, IRegister} from "./user.interface";
import { removeFromStorage } from "../../modules/Auth/services/auth/auth.helper";
import { AuthService } from "../../modules/Auth/services/auth/auth.service";
import {errorCatch} from '../../api/api.helper';

export const login = createAsyncThunk<AuthResponse, ILogin>('auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await AuthService.login(data)
            return response.data
        } catch(error: any) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const register = createAsyncThunk<AuthResponse , IRegister> ('auth/register',
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
            if(response.data.status === 'success') {
                return response.data

            } else {
                return thunkAPI.rejectWithValue(response.data.message) 
            }
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
