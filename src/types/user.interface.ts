import { ApiResponse } from "./api.interface";

export interface IUser {
    id: number;
    userExId: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface BooleanResponse extends ApiResponse {
    data: boolean
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}