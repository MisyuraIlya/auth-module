import axios from "axios"
import { IUser } from "../../types/user.interface";
import { saveToStorage } from "./auth.helper";

type Auth = {
    email: string;
    password: string;
}

type AuthResponse = {
    user: IUser
    accessToken: string
    refreshToken: string
}

export const AuthService = {
    async auth(type: 'login' | 'register' | 'validation' | 'twoFactor', data: Auth){
        if(type === 'validation'){
            return true;
        } else if(type === 'twoFactor') {
            return true;
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
}