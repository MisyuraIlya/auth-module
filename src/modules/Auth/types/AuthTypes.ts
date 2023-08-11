import { IUser } from "../../../types/user.interface"
import { ApiResponse } from "../../../types/api.interface"
export type AuthFormInputs = {
    userExId: string,
    email: string,
    password: string,
    phone: string
    token: string
    firstName: string,
    lastName: string,
    refreshToken: string
}
export type AuthType = "login" | "register" | "validation" | "twoFactor" | "forgotPassword" | "validPasswordRestore" | "restorePassword" | "accessToken";

export type RestApiAuthData = {
    classPoint: string,
    funcName: AuthType,
    val: Auth
  }

export type Auth = {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    userExId?: string,
    phone?: string
    token?: string
}

export type AuthApi = {
    user: IUser
    accessToken: string
    refreshToken: string
}

export interface AuthResponse extends ApiResponse {
  data: AuthApi
}