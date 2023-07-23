export interface IUser {
    id: number;
    userExId: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface AuthResponse {
    user: IUser
    accessToken: string
    refreshToken: string
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}