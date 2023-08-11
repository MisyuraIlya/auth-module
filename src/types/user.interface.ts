export interface IUser {
    id: number;
    userExId: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface BooleanResponse {
    data: boolean
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}