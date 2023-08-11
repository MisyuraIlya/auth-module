import { IUser } from "../../types/user.interface"
import { AuthType } from "../../modules/Auth/types/AuthTypes";
export interface IInitialState {
    user: IUser | null
    isLoading: boolean
    type: AuthType
    email: string
}

export interface ILogin {
    email: string;
    password: string;
}
export interface IRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface IValidation {
    userExId: string;
    phone: string;
}

export interface ITwoFactor {
    mail: string;
    token: string;
}

export interface IForgotPassword {
    email: string;
}

export interface IValidPasswordRestore {
    email: string;
    token: string;
}

export interface IRestorePassword {
    phone: string;
    password: string;
}

export interface IGetAccessToken {
    refreshToken: string
}
