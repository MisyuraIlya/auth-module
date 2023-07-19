import React, {useEffect, useState} from 'react';
import { AuthService } from '../../services/auth/auth.service';
import { useForm, SubmitHandler } from "react-hook-form";
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthFormInputs, AuthType } from '../../types/AuthTypes';
import AuthBottom from '../AuthBottom/AuthBottom';
import { APP_ROUTER } from '../../../../config/router';
import { PLACEHOLDERS, FORM_PLACEHOLDER } from '../../../../config/placeholders';
const AuthForm = () => {

    const [otp, setOtp] = useState<string>('');
    const [type, setType] = useState<AuthType>(APP_ROUTER.LOGIN.TYPE)
    const { register, handleSubmit, reset , formState: { errors } } = useForm<AuthFormInputs>();
    const [phoneRestore, setPhoneRestore] = useState<string>('')
    let navigate = useNavigate();
    let location = useLocation()
    let path = location.pathname.split('/')[1]

    const handleSwitch = (type: AuthType ) => {
      reset()
      setType(type)
      navigate(`/${type}`)

    }
    const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
        if(otp) {
            data.token = otp
        }
        const response = await AuthService.auth(type, data)
        if(type === APP_ROUTER.VALIDATION.TYPE) {
            reset()
            if(response) {
                setType(APP_ROUTER.TWO_FACTOR.TYPE)
                navigate(APP_ROUTER.TWO_FACTOR.LINK)
            }
        }
        if(type === APP_ROUTER.TWO_FACTOR.TYPE) {
            reset()
            setOtp('')
            if(response) {
                setType(APP_ROUTER.REGISTER.TYPE)
                navigate(APP_ROUTER.REGISTER.LINK)
            } 
        }

        if(type === APP_ROUTER.FORGOT_PASSWORD.TYPE) {
           setPhoneRestore(data.phone!) 
           setType(APP_ROUTER.VALID_USER_PASSWORD_RESTORE.TYPE) 
           navigate(APP_ROUTER.VALID_USER_PASSWORD_RESTORE.LINK)
        }   

        if(type === APP_ROUTER.VALID_USER_PASSWORD_RESTORE.TYPE) {
            setType(APP_ROUTER.RESTORE_PASSWORD.TYPE) 
            navigate(APP_ROUTER.RESTORE_PASSWORD.LINK)
         }   


         if(type === APP_ROUTER.RESTORE_PASSWORD.TYPE) {
            setType(APP_ROUTER.LOGIN.TYPE)
            navigate(APP_ROUTER.LOGIN.LINK)
            setOtp('')
         }

    }

    const handleType = (path: string) => {
        if(path == APP_ROUTER.LOGIN.TYPE) {
            setType(APP_ROUTER.LOGIN.TYPE)
        } else if (path == APP_ROUTER.REGISTER.TYPE) {
            setType(APP_ROUTER.REGISTER.TYPE)
        } else if (path == APP_ROUTER.VALIDATION.TYPE) {
            setType(APP_ROUTER.VALIDATION.TYPE)
        } else if (path == APP_ROUTER.TWO_FACTOR.TYPE) {
            setType(APP_ROUTER.TWO_FACTOR.TYPE)
        } else if (path == APP_ROUTER.FORGOT_PASSWORD.TYPE) {
            setType(APP_ROUTER.FORGOT_PASSWORD.TYPE)
        } else if (path == APP_ROUTER.VALID_USER_PASSWORD_RESTORE.TYPE) {
            setType(APP_ROUTER.VALID_USER_PASSWORD_RESTORE.TYPE)
        } else if (path == APP_ROUTER.RESTORE_PASSWORD.TYPE) {
            setType(APP_ROUTER.RESTORE_PASSWORD.TYPE)
        } else {
            setType(APP_ROUTER.LOGIN.TYPE)
        }
    }


    useEffect(() => {
        handleType(path)
    },[path])



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='border border-gray-500 rounded-lg text-center px-12 py-10'>
            <h1 id="auth-heading" data-testid="auth-heading" className='font-bold text-xl'>{type}</h1>

            {(type === APP_ROUTER.LOGIN.TYPE || type === APP_ROUTER.REGISTER.TYPE) &&
                <div>
                    <input id="email" {...register(FORM_PLACEHOLDER.EMAIL.VALUE)}  placeholder={FORM_PLACEHOLDER.EMAIL.LABEL} className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'/>
                    {errors.email && <span>{FORM_PLACEHOLDER.EMAIL.ERROR}</span>}
                </div>
            }
            {
                type === APP_ROUTER.REGISTER.TYPE &&
                <>
                    <div>
                        <input id="firstName" {...register(FORM_PLACEHOLDER.FIRSTNAME.VALUE)}  placeholder={FORM_PLACEHOLDER.FIRSTNAME.LABEL} className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2' />
                        {errors.email && <span>{FORM_PLACEHOLDER.FIRSTNAME.ERROR}</span>}
                    </div>
                    <div>
                        <input id="lastName" {...register(FORM_PLACEHOLDER.LASTNAME.VALUE)}  placeholder={FORM_PLACEHOLDER.LASTNAME.LABEL} className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'/>
                        {errors.email && <span>{FORM_PLACEHOLDER.LASTNAME.ERROR}</span>}
                    </div>
                </>
            }
            {
                type === APP_ROUTER.VALIDATION.TYPE &&
                    <div>
                        <input id="userExId" {...register(FORM_PLACEHOLDER.USER_EXT_ID.VALUE)}  placeholder='userExId' className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'/>
                        {errors.userExId && <span>{FORM_PLACEHOLDER.USER_EXT_ID.ERROR}</span>}
                    </div>
   
            }

            {
                 (type === APP_ROUTER.VALIDATION.TYPE || type === APP_ROUTER.FORGOT_PASSWORD.TYPE) &&
                 <div>
                    <input id="phone" {...register(FORM_PLACEHOLDER.PHONE.VALUE)}  placeholder='phone' className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'/>
                    {errors.phone && <span>{FORM_PLACEHOLDER.PHONE.ERROR}</span>}
                </div>

            }
            {
                (type === APP_ROUTER.LOGIN.TYPE || type === APP_ROUTER.REGISTER.TYPE || type === APP_ROUTER.RESTORE_PASSWORD.TYPE) &&
                <div>
                    <input id="password" {...register(FORM_PLACEHOLDER.PASSWORD.VALUE, { required: true })} placeholder='password' className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'/>
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

            <AuthBottom type={type} phoneRestore={phoneRestore} handleSwitch={handleSwitch}/>


            <div className='m-2'>
                <button id="auth-btn" data-testid="auth-btn" type="submit" className='font-bold bg-blue-400 text-white py-2 rounded-xl px-12 hover:bg-blue-600'>{type}</button>
            </div>
        </form>
    );
};

export default AuthForm;