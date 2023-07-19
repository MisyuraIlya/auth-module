import Cookies from 'js-cookie'
import {ITokens} from '../../../../types/user.interface'
import { AuthResponse } from '../../../../types/user.interface'

export const getAccessToken = () => {
    const accessToken = Cookies.get('accessToken')
    return accessToken || null
}

export const saveTokensStorage = (data: ITokens) => {
    Cookies.set('accessToken', data.accessToken)
    Cookies.set('refreshToken', data.refreshToken)
}

export const getUserFromStorage = () => {
    return JSON.parse(localStorage.getItem('user') || '{}')
}
 
export const removeFromStorage = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    localStorage.removeItem('user')
}

export const saveToStorage = (data: AuthResponse) => {
    saveTokensStorage(data)
    localStorage.setItem('user', JSON.stringify(data.user))
}