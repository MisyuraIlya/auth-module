import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorCatch } from "@/api/api.helper";
import { IAuthResponse, IEmailPassword } from "./user.interface";
import { removeFromStorage } from "../../modules/Auth/services/auth/auth.helper";
import { AuthService } from "../../modules/Auth/services/auth/auth.service";

export const register = createAsyncThunk<IAuthResponse, IEmailPassword> ('auth/register',
    async(data,thunkApi) => {
        try {
            const response = await AuthService.main('register', data)
            return response
        } catch(error){
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await AuthService.main('login',data)
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

export const checkAuth = createAsyncThunk<IAuthResponse>(
    'auth/check-auth',
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