import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth/auth.service';
import { APP_ROUTER } from '../../config/router';
import { PLACEHOLDERS } from '../../config/placeholders';
import { useActions } from '../../../../hooks/useActions';
import { useAuth } from '../../../../hooks/useAuth';


const AuthBottom = () => {

    const {setType} = useActions()
    const {type, email} = useAuth()
    const navigate = useNavigate()
    return (
        <>
            { (type === APP_ROUTER.LOGIN.TYPE || type === APP_ROUTER.REGISTER.TYPE || type === APP_ROUTER.VALIDATION.TYPE ) &&
                <>
                <div className='auth flex items-center justify-center gap-4 text-lg'>
                    <span 
                    id="login-btn" 
                    data-testid="login-btn" 
                    className='cursor-pointer' 
                    onClick={() => {setType(APP_ROUTER.LOGIN.TYPE); navigate(`${APP_ROUTER.LOGIN.LINK}`)}}
                    >
                        {PLACEHOLDERS.LOGIN.LABEL}
                    </span>
                    <span>|</span>
                    <span 
                    id="register-btn" 
                    data-testid="register-btn" 
                    className='cursor-pointer' 
                    onClick={() => {setType(APP_ROUTER.VALIDATION.TYPE); navigate(`${APP_ROUTER.VALIDATION.LINK}`)}}
                    >
                        {PLACEHOLDERS.REGISTER.LABEL}
                    </span>
                </div>
                <div>
                    <span 
                    className='underline cursor-pointer' 
                    data-testid="forgotPassword-btn" 
                    onClick={() => {setType(APP_ROUTER.FORGOT_PASSWORD.TYPE); navigate(`${APP_ROUTER.FORGOT_PASSWORD.LINK}`)}}
                    >
                        {PLACEHOLDERS.FORGOT_PASSWORD.LABEL}
                    </span>
                </div>
                </>
            } 

            {
                type === APP_ROUTER.FORGOT_PASSWORD.TYPE &&
                <div className='py-2'>
                    <span 
                    className='underline cursor-pointer' 
                    data-testid="backToLogin-btn" 
                    onClick={() => setType(APP_ROUTER.LOGIN.TYPE)}
                    >
                        {PLACEHOLDERS.BACK_TO_LOGIN.LABEL}
                    </span>
                </div>
            }

            {
                (type === APP_ROUTER.TWO_FACTOR.TYPE || type === APP_ROUTER.VALID_USER_PASSWORD_RESTORE.TYPE) &&
                <div className='py-2'>
                    <span className='underline cursor-pointer' 
                    onClick={() => AuthService.forgotPassword({email})}
                    >
                        {PLACEHOLDERS.DONT_GET_TOKEN.LABEL}
                    </span>
                </div>
            } 
        </>
    );
};

export default AuthBottom;