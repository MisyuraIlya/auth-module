import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useActions } from '../../../hooks/useActions';
import { getAccessToken } from '../services/auth/auth.helper';
import Cookies from 'js-cookie';
import CheckRole from './CheckRole';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthProvider: FC<PropsWithChildren> = ({children}) => {

    const {user} = useAuth();
    const { checkAuth, logout } = useActions();
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const accessToken = getAccessToken()
        if(accessToken) checkAuth()
    },[])

    useEffect(() => {
        const refreshToken = Cookies.get('refreshToken')
        if(!refreshToken && user)  {
            logout()
        }
    },[location.pathname])

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    },[location.pathname])

    return (
        <>
            <CheckRole>
                {children} 
            </CheckRole>
        </>
    );
};

export default AuthProvider;