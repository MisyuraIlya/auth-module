import React, {FC, PropsWithChildren} from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTER } from '../config/router';
const CheckRole:FC<PropsWithChildren> = ({children}) => {
    const {user} = useAuth()
    const {pathname} = useLocation()
    const navigate = useNavigate()
    // navigate(`${APP_ROUTER.HOME.LINK}`)
    // pathname == APP_ROUTER.LOGIN.LINK &&  navigate(`${APP_ROUTER.HOME.LINK}`)
    // pathname == APP_ROUTER.REGISTER.LINK &&  navigate(`${APP_ROUTER.HOME.LINK}`)
    // pathname == APP_ROUTER.VALIDATION.LINK &&  navigate(`${APP_ROUTER.HOME.LINK}`)
    // pathname == APP_ROUTER.TWO_FACTOR.LINK &&  navigate(`${APP_ROUTER.HOME.LINK}`)
    // pathname == APP_ROUTER.FORGOT_PASSWORD.LINK &&  navigate(`${APP_ROUTER.HOME.LINK}`)
    // pathname == APP_ROUTER.VALID_USER_PASSWORD_RESTORE.LINK &&  navigate(`${APP_ROUTER.HOME.LINK}`)
    // pathname == APP_ROUTER.RESTORE_PASSWORD.LINK &&  navigate(`${APP_ROUTER.HOME.LINK}`)
    // if(user)
     return <>{children}</>

    // return null;
};

export default CheckRole;