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

export const AuthService = {
    async auth(type: AuthType, data: Auth){
        if(type === 'validation'){
            return true;
        } else if(type === 'twoFactor') {
            return true;
        } else if (type === 'forgotPassword') {
            return true;
        } else if (type === 'validPasswordResore') {
            return true   
        } else if (type === 'restorePassword') {
            return true
        } else {
            const response = await axios<AuthResponse>({
                url: `http://localhost:4000/auth/${type}`,
                method:'POST',
                data
            })
            
            if(response.data.accessToken) saveToStorage(response.data)
    
            return response.data
        }

    },
    async resendToken(data: string) {
        console.log(data)
    }
}