export interface IUser {
    id: number
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
    userType: IUserType
}

export interface IUserType {
    id: number
    title: string
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface AuthResponse {
    user: IUser
    accessToken: string
    refreshToken: string
}