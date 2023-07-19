import React, {FC} from 'react';
import { AuthType } from '../../types/AuthTypes';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth/auth.service';
type AuthBottomProps = {
    type: AuthType
    phoneRestore: string
    handleSwitch: (type: AuthType) => void
}

const AuthBottom:FC<AuthBottomProps> = ({type,phoneRestore,handleSwitch}) => {
    const navigate = useNavigate()
    return (
        <>
            { (type === 'login' || type === 'register' || type === 'validation' ) &&
                <>
                <div className='auth flex items-center justify-center gap-4 text-lg'>
                    <span id="login-btn" data-testid="login-btn" className='cursor-pointer' onClick={() => handleSwitch('login')}>Login</span>
                    <span>|</span>
                    <span id="register-btn" data-testid="register-btn" className='cursor-pointer' onClick={() => handleSwitch('validation')}>Register</span>
                </div>
                <div>
                    <span className='underline cursor-pointer' onClick={() => handleSwitch('forgotPassword')}>forgot password?</span>
                </div>
                </>
            } 

            {
                type === 'forgotPassword' &&
                <div className='py-2'>
                    <span className='underline cursor-pointer' onClick={() => navigate('/login')}>back to login</span>
                </div>
            }

            {
                (type === 'twoFactor' || type === 'validMailPasswordResore') &&
                <div className='py-2'>
                    <span className='underline cursor-pointer' onClick={() => AuthService.resendToken(phoneRestore)}>donst get sms/email?</span>
                </div>
            } 
        </>
    );
};

export default AuthBottom;