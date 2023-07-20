import axios from "axios"
import { IUser } from "../../../../types/user.interface";
import { saveToStorage } from "./auth.helper";
import { AuthType } from "../../types/AuthTypes";

type Auth = {
    email: string,
    password: string,
    //--for register----
    firstName?: string,
    lastName?: string,
    //------------------
    //--for validation--
    userExId?: string,
    phone?: string
    //------------------
    token?: string
}

type AuthResponse = {
    user: IUser
    accessToken: string
    refreshToken: string
}

const Controller = 'AuthController'
const IsRestApi = process.env.isRestApi
export const AuthService = {
    async auth(type: AuthType, data: Auth){
        let url 

        if(IsRestApi) {
            url = process.env.SERVER
        } else {
            url = process.env.SERVER + `/auth/${type}`
        }
        
        if(IsRestApi) {
            data = {
                classPoint: Controller,
                funcName: type,
                val: data
              };
        }

        const response = await axios<AuthResponse>({
            url: url,
            method:'POST',
            data
        })
        
        if(response.data.accessToken) saveToStorage(response.data)

        return response.data

    },
    async resendToken(data: string) {
        console.log(data)
    }
}