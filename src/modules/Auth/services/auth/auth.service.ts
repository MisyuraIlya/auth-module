import axios from "axios"
import { IUser } from "../../../../types/user.interface";
import { saveToStorage } from "./auth.helper";
import { AuthType } from "../../types/AuthTypes";
import { ApiResponse } from "../../../../types/api.interface";
type RestApiAuthData = {
    classPoint: string,
    funcName: AuthType,
    val: Auth
  }

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

type AuthApi = {
    user: IUser
    accessToken: string
    refreshToken: string
}

export interface AuthResponse extends ApiResponse {
  data: AuthApi
}

const Controller = 'AuthController'
export const AuthService = {
  async auth(type: AuthType, data: Auth | RestApiAuthData) {
    let url 
    const IsRestApi = JSON.parse(process.env.REACT_APP_IS_REST_API!)
    if (!IsRestApi) {
      url = process.env.REACT_APP_SERVER
    } else {
      url = process.env.REACT_APP_SERVER + `/auth/${type}`
    }
    
    if (!IsRestApi) {
      // Assert that data is of type RestApiAuthData
      data = {
        classPoint: Controller,
        funcName: type,
        val: data as Auth // You need to ensure that 'data' is of type 'Auth' inside the RestApiAuthData
      };
    }

    const response = await axios<AuthResponse>({
      url: url,
      method: 'POST',
      data
    })

    if (response.data?.data?.accessToken) saveToStorage(response.data.data)

    return response.data
  },
  async resendToken(data: string) {
    console.log(data)
  }
}