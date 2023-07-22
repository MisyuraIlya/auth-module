import { IUser } from "@/types/user.interface"

export interface IUserState {
    id: number
    email: string
    name: string
    firstName: string
    lastName: string
    userType: {
        id: number
        title: 'admin' | 'student'| 'teacher'
    }
    isAdmin: boolean
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IInitialState {
    user: IUserState | null
    isLoading: boolean
    
}

export interface IEmailPassword {
    email: string
    password: string
}

export interface IAuthResponse extends ITokens {
    user: IUser & {
        isAdmin: boolean
    }
}