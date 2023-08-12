import React, {useState} from 'react';
import { AuthService } from '../../services/auth/auth.service';
import { useForm, SubmitHandler } from "react-hook-form";
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { AuthFormInputs, AuthType } from '../../types/AuthTypes';
import AuthBottom from '../AuthBottom/AuthBottom';
import { APP_ROUTER } from '../../config/router';
import { FORM_PLACEHOLDER } from '../../config/placeholders';
import { useAuth } from '../../../../hooks/useAuth';
import { useActions } from '../../../../hooks/useActions';
import { getTypeName } from '../../helpers/getTypeName';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const AuthForm = () => {
    const {login, register, setType, setEmail, setErrorMessage} = useActions()
    const {type} = useAuth()
    const [otp, setOtp] = useState<string>('');

    const { register: registerForm, handleSubmit , formState: { errors } } = useForm<AuthFormInputs>();

    let navigate = useNavigate();

    const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
        setErrorMessage('')
        if(otp) {
            data.token = otp
        }
        if(type === APP_ROUTER.LOGIN.TYPE) {
            login(data)
        }

        if(type === APP_ROUTER.REGISTER.TYPE){
            register(data)
        }
        if(type === APP_ROUTER.VALIDATION.TYPE) {
            const response = await AuthService.validation(data);
            if(response.data.status === 'success') {
                    navigate(APP_ROUTER.TWO_FACTOR.LINK)
                    setType(APP_ROUTER.TWO_FACTOR.TYPE as AuthType)
            } else {
                setErrorMessage(response.data.message)
            }
        }
        if(type === APP_ROUTER.TWO_FACTOR.TYPE) {
            const response = await AuthService.twoFactor(data.phone,otp)
            if(response.data.status === 'success') {
                setOtp('')
                setType(APP_ROUTER.REGISTER.TYPE as AuthType)
                navigate(APP_ROUTER.REGISTER.LINK)
            } else {
                setErrorMessage(response.data.message)
            }
        }
        if(type === APP_ROUTER.FORGOT_PASSWORD.TYPE) {
            const response = await AuthService.forgotPassword(data)
            if(response.data.status === 'success') {
                setEmail(data.email)
                setType(APP_ROUTER.VALID_USER_PASSWORD_RESTORE.TYPE as AuthType) 
                navigate(APP_ROUTER.VALID_USER_PASSWORD_RESTORE.LINK)
            } else {
                setErrorMessage(response.data.message)
            }
        }   

        if(type === APP_ROUTER.VALID_USER_PASSWORD_RESTORE.TYPE) {
            const response = await AuthService.validPasswordRestore(data)
            if(response.data.status === 'success') {
                setType(APP_ROUTER.RESTORE_PASSWORD.TYPE as AuthType) 
                navigate(APP_ROUTER.RESTORE_PASSWORD.LINK)
            } else {
                setErrorMessage(response.data.message)
            }
         }   
         if(type === APP_ROUTER.RESTORE_PASSWORD.TYPE) {
            const response = await AuthService.restorePassword(data)
            if(response.data.status === 'success'){
                setType(APP_ROUTER.LOGIN.TYPE as AuthType)
                navigate(APP_ROUTER.LOGIN.LINK)
                setOtp('') 
            }   else {
                setErrorMessage(response.data.message)
            }
         }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='border border-gray-500 rounded-lg text-center px-12 py-10'>
            <h1 id="auth-heading" data-testid="auth-heading" className='font-bold text-xl'>{getTypeName(type)}</h1>

            {(type === APP_ROUTER.LOGIN.TYPE || type === APP_ROUTER.REGISTER.TYPE || type === APP_ROUTER.FORGOT_PASSWORD.TYPE) &&
                <div>
                    <input 
                    id="email" 
                    data-testid="email"
                    {...registerForm(FORM_PLACEHOLDER.EMAIL.VALUE as keyof AuthFormInputs)}  
                    placeholder={FORM_PLACEHOLDER.EMAIL.LABEL} 
                    className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'
                    />
                    {errors.email && <span>{FORM_PLACEHOLDER.EMAIL.ERROR}</span>}
                </div>
            }
            {
                type === APP_ROUTER.REGISTER.TYPE &&
                <>
                    <div>
                        <input 
                        id="firstName" 
                        data-testid="firstName"
                        {...registerForm(FORM_PLACEHOLDER.FIRSTNAME.VALUE  as keyof AuthFormInputs)}  
                        placeholder={FORM_PLACEHOLDER.FIRSTNAME.LABEL} 
                        className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2' 
                        />
                        {errors.email && <span>{FORM_PLACEHOLDER.FIRSTNAME.ERROR}</span>}
                    </div>
                    <div>
                        <input 
                        id="lastName" 
                        data-testid="lastName"
                        {...registerForm(FORM_PLACEHOLDER.LASTNAME.VALUE  as keyof AuthFormInputs)}  
                        placeholder={FORM_PLACEHOLDER.LASTNAME.LABEL} 
                        className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'
                        />
                        {errors.email && <span>{FORM_PLACEHOLDER.LASTNAME.ERROR}</span>}
                    </div>
                </>
            }
            {
                type === APP_ROUTER.VALIDATION.TYPE &&
                    <div>
                        <input 
                        id="userExId" 
                        data-testid="userExId"
                        {...registerForm(FORM_PLACEHOLDER.USER_EXT_ID.VALUE  as keyof AuthFormInputs)}  
                        placeholder={FORM_PLACEHOLDER.USER_EXT_ID.LABEL} 
                        className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'
                        />
                        {errors.userExId && <span>{FORM_PLACEHOLDER.USER_EXT_ID.ERROR}</span>}
                    </div>
   
            }

            {
                 (type === APP_ROUTER.VALIDATION.TYPE ) &&
                 <div>
                    <input 
                    id="phone" 
                    data-testid="phone"
                    {...registerForm(FORM_PLACEHOLDER.PHONE.VALUE  as keyof AuthFormInputs)}  
                    placeholder={FORM_PLACEHOLDER.PHONE.LABEL} 
                    className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'
                    />
                    {errors.phone && <span>{FORM_PLACEHOLDER.PHONE.ERROR}</span>}
                </div>

            }
            {
                (type === APP_ROUTER.LOGIN.TYPE || type === APP_ROUTER.REGISTER.TYPE || type === APP_ROUTER.RESTORE_PASSWORD.TYPE) &&
                <div>
                    <input 
                    id="password" 
                    data-testid="password"
                    {...registerForm(FORM_PLACEHOLDER.PASSWORD.VALUE  as keyof AuthFormInputs, { required: true })} 
                    placeholder={FORM_PLACEHOLDER.PASSWORD.LABEL} 
                    className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'
                    />
                    {errors.password && <span>{FORM_PLACEHOLDER.PASSWORD.ERROR}</span>}
                </div>

            }
            {
               (type === APP_ROUTER.TWO_FACTOR.TYPE || type === APP_ROUTER.VALID_USER_PASSWORD_RESTORE.TYPE) &&
               <div className='flex justify-center items-center'>
                    <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span className='m-2 text-center flex justify-center items-center'> </span>}
                    renderInput={(props) => <input  {...props}  style={{border:'1px solid black', borderRadius:'50%', height:'50px', width:"50px", textAlign:'center'}}/>}
                    />
                </div>
            }

            <AuthBottom/>
            <ErrorMessage/>

            <div className='m-2'>
                <button id="auth-btn" data-testid="auth-btn" type="submit" className='font-bold bg-blue-400 text-white py-2 rounded-xl px-12 hover:bg-blue-600'>{getTypeName(type)}</button>
            </div>
        </form>
    );
};

export default AuthForm;