import React, {FC} from 'react';
import { AuthType } from '../../types/AuthTypes';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth/auth.service';
import { APP_ROUTER } from '../../../../config/router';
import { FORM_PLACEHOLDER, PLACEHOLDERS } from '../../../../config/placeholders';
FORM_PLACEHOLDER
type AuthBottomProps = {
    type: AuthType
    phoneRestore: string
    handleSwitch: (type: AuthType) => void
}

const AuthBottom:FC<AuthBottomProps> = ({type,phoneRestore,handleSwitch}) => {
    const navigate = useNavigate()
    return (
        <>
            { (type === APP_ROUTER.LOGIN.TYPE || type === APP_ROUTER.REGISTER.TYPE || type === APP_ROUTER.VALIDATION.TYPE ) &&
                <>
                <div className='auth flex items-center justify-center gap-4 text-lg'>
                    <span id="login-btn" data-testid="login-btn" className='cursor-pointer' onClick={() => handleSwitch(APP_ROUTER.LOGIN.TYPE)}>{PLACEHOLDERS.LOGIN.LABEL}</span>
                    <span>|</span>
                    <span id="register-btn" data-testid="register-btn" className='cursor-pointer' onClick={() => handleSwitch(APP_ROUTER.VALIDATION.TYPE)}>{PLACEHOLDERS.REGISTER.LABEL}</span>
                </div>
                <div>
                    <span className='underline cursor-pointer' onClick={() => handleSwitch('forgotPassword')}>{PLACEHOLDERS.FORGOT_PASSWORD.LABEL}</span>
                </div>
                </>
            } 

            {
                type === APP_ROUTER.FORGOT_PASSWORD.TYPE &&
                <div className='py-2'>
                    <span className='underline cursor-pointer' onClick={() => navigate(APP_ROUTER.LOGIN.LINK)}>{PLACEHOLDERS.BACK_TO_LOGIN.LABEL}</span>
                </div>
            }

            {
                (type === APP_ROUTER.TWO_FACTOR.TYPE || type === APP_ROUTER.VALID_USER_PASSWORD_RESTORE.TYPE) &&
                <div className='py-2'>
                    <span className='underline cursor-pointer' onClick={() => AuthService.resendToken(phoneRestore)}>{PLACEHOLDERS.DONT_GET_TOKEN.LABEL}</span>
                </div>
            } 
        </>
    );
};

export default AuthBottom;