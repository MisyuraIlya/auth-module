import { IUser } from "../../types/user.interface"
export interface IInitialState {
    user: IUser | null
    isLoading: boolean
}
export interface IRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export interface ILogin {
    email: string;
    password: string;
}

export interface IGetAccessToken {
    refreshToken: string
}
