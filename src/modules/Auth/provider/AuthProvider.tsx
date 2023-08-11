import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useActions } from '../../../hooks/useActions';
import { getAccessToken } from '../services/auth/auth.helper';
import Cookies from 'js-cookie';
import CheckRole from './CheckRole';
import { useNavigate, useLocation } from 'react-router-dom';
import { APP_ROUTER } from '../config/router';

const AuthProvider: FC<PropsWithChildren> = ({children}) => {

    const {user} = useAuth();
    const { checkAuth, logout, setType } = useActions();
    const {pathname} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = getAccessToken()
        if(accessToken) checkAuth()
    },[checkAuth])

    useEffect(() => {
        const refreshToken = Cookies.get('refreshToken')
        if(!refreshToken && user)  {
            logout()
        }
    },[pathname,logout, user])

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    },[user])

    useEffect(() => {
        if(user && 
            (pathname === APP_ROUTER.LOGIN.LINK ||
             pathname === APP_ROUTER.REGISTER.LINK ||
             pathname === APP_ROUTER.VALIDATION.LINK ||
             pathname === APP_ROUTER.TWO_FACTOR.LINK ||
             pathname === APP_ROUTER.FORGOT_PASSWORD.LINK ||
             pathname === APP_ROUTER.VALID_USER_PASSWORD_RESTORE.LINK ||
             pathname === APP_ROUTER.RESTORE_PASSWORD.LINK 
             )) {
                navigate(`${APP_ROUTER.HOME.LINK}`)
        }
    },[navigate, user, pathname])

    useEffect(() => {
        if(pathname === APP_ROUTER.LOGIN.LINK) {
            setType(APP_ROUTER.LOGIN.TYPE)
        }

        if(pathname === APP_ROUTER.REGISTER.LINK) {
            setType(APP_ROUTER.REGISTER.TYPE)
        }

        if(pathname === APP_ROUTER.VALIDATION.LINK) {
            setType(APP_ROUTER.VALIDATION.TYPE)
        }

        if(pathname === APP_ROUTER.TWO_FACTOR.LINK) {
            setType(APP_ROUTER.TWO_FACTOR.TYPE)
        }

        if(pathname === APP_ROUTER.FORGOT_PASSWORD.LINK) {
            setType(APP_ROUTER.FORGOT_PASSWORD.TYPE)
        }

        if(pathname === APP_ROUTER.VALID_USER_PASSWORD_RESTORE.LINK) {
            setType(APP_ROUTER.VALID_USER_PASSWORD_RESTORE.TYPE)
        }

        if(pathname === APP_ROUTER.RESTORE_PASSWORD.LINK) {
            setType(APP_ROUTER.RESTORE_PASSWORD.TYPE)
        }
    },[user, pathname, navigate, setType])

    return (
        <>
            <CheckRole>
                {children} 
            </CheckRole>
        </>
    );
};

export default AuthProvider;