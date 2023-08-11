import axios from "axios"
import { BooleanResponse } from "../../../../types/user.interface";
import { saveToStorage } from "./auth.helper";
import { AuthType } from "../../types/AuthTypes";
import Cookies from "js-cookie";
import { getContentType } from "../../../../api/api.helper";
import { Auth, AuthResponse,RestApiAuthData } from "../../types/AuthTypes";
import { IForgotPassword, ILogin, IRegister, IRestorePassword, IValidPasswordRestore, IValidation } from "../../../../store/user/user.interface";


const Controller = 'AuthController'
const IsRestApi = JSON.parse(process.env.REACT_APP_IS_REST_API!)


export const AuthService = {

  async login(data: ILogin) {
    
    let newData = {
      classPoint: Controller,
      funcName: 'login',
      val: data as Auth,
    };
  
    let url = !IsRestApi
      ? process.env.REACT_APP_SERVER || '' 
      : process.env.REACT_APP_SERVER + '/auth/login';
  
    let requestData = !IsRestApi ? newData : data;
  
      const response = await axios.post<AuthResponse>(url, requestData);
  
      if (response.data?.data?.accessToken) {
        saveToStorage(response.data);
      }
  
      return response.data;
  
  },

  async register(data: IRegister) {
    let newData = {
      classPoint: Controller,
      funcName: 'register',
      val: data as Auth,
    };
  
    let url = !IsRestApi
      ? process.env.REACT_APP_SERVER || '' 
      : process.env.REACT_APP_SERVER + '/auth/register';
  
    let requestData = !IsRestApi ? newData : data;
  
      const response = await axios.post<AuthResponse>(url, requestData);
  
      if (response.data?.data?.accessToken) {
        saveToStorage(response.data);
      }
  
      return response.data;
  },

  async validation(data: IValidation) {
    let newData = {
      classPoint: Controller,
      funcName: 'validation',
      val: data as Auth,
    };
  
    let url = !IsRestApi
      ? process.env.REACT_APP_SERVER || '' 
      : process.env.REACT_APP_SERVER + '/auth/validation';
  
    let requestData = !IsRestApi ? newData : data;
    const response = await axios.post<BooleanResponse>(url, requestData);
    return response.data;
  },

  async twoFactor(phone:string, token:string) {
    let newData = {
      classPoint: Controller,
      funcName: 'twoFactor',
      val: {phone: phone,token},
    };
  
    let url = !IsRestApi
      ? process.env.REACT_APP_SERVER || '' 
      : process.env.REACT_APP_SERVER + '/auth/twoFactor';
  
    let requestData = !IsRestApi ? newData : {email: phone,token};
    const response = await axios.post<BooleanResponse>(url, requestData);
    return response.data;
  },

  async forgotPassword(data: IForgotPassword) {
    let newData = {
      classPoint: Controller,
      funcName: 'forgotPassword',
      val: data,
    };
  
    let url = !IsRestApi
      ? process.env.REACT_APP_SERVER || '' 
      : process.env.REACT_APP_SERVER + '/auth/forgotPassword';
  
    let requestData = !IsRestApi ? newData : data;
    const response = await axios.post<BooleanResponse>(url, requestData);
    return response.data;
  },

  async validPasswordRestore(data: IValidPasswordRestore) {
    let newData = {
      classPoint: Controller,
      funcName: 'validPasswordRestore',
      val: data,
    };
  
    let url = !IsRestApi
      ? process.env.REACT_APP_SERVER || '' 
      : process.env.REACT_APP_SERVER + '/auth/validPasswordRestore';
  
    let requestData = !IsRestApi ? newData : data;
    const response = await axios.post<BooleanResponse>(url, requestData);
    return response.data;
  },

  async restorePassword(data: IRestorePassword) {
    let newData = {
      classPoint: Controller,
      funcName: 'restorePassword',
      val: data,
    };
  
    let url = !IsRestApi
      ? process.env.REACT_APP_SERVER || '' 
      : process.env.REACT_APP_SERVER + '/auth/restorePassword';
  
    let requestData = !IsRestApi ? newData : data;
    const response = await axios.post<BooleanResponse>(url, requestData);
    return response.data;
  },

  async auth(type: AuthType, data: Auth | RestApiAuthData) {
    let url 
    if (!IsRestApi) {
      url = process.env.REACT_APP_SERVER
    } else {
      url = process.env.REACT_APP_SERVER + `/auth/${type}`
    }
    
    if (!IsRestApi) {
      data = {
        classPoint: Controller,
        funcName: type,
        val: data as Auth 
      };
    }

    const response = await axios<AuthResponse>({
      url: url,
      method: 'POST',
      data
    })

    if (response.data?.data?.accessToken) saveToStorage(response.data)

    return response.data.data
  },

  async resendToken(data: string) {
    console.log(data)
  },

  async getNewTokens(){
    const refreshToken = Cookies.get('refreshToken')
    let data
    let url 
    const IsRestApi = JSON.parse(process.env.REACT_APP_IS_REST_API!)
    if (!IsRestApi) {
      url = process.env.REACT_APP_SERVER
    } else {
      url = process.env.REACT_APP_SERVER + `/auth/refreshToken`
    }

    if (!IsRestApi) {
      data = {
        classPoint: Controller,
        funcName: 'accessToken',
        val: {
          refreshToken
        } 
      };
    } else {
      data = refreshToken
    }

    const response = await axios<AuthResponse>({
      url: url,
      method:'POST',
      headers: getContentType(),
      data
    })

    if(response.data.data.accessToken) saveToStorage(response.data)

    return response
  }
}