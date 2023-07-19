import React, {useEffect, useState} from 'react';
import { AuthService } from '../../services/auth/auth.service';
import { useForm, SubmitHandler } from "react-hook-form";
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthFormInputs, AuthType } from '../../types/AuthTypes';
import AuthBottom from '../AuthBottom/AuthBottom';


const AuthForm = () => {

    const [otp, setOtp] = useState('');
    const [type, setType] = useState<AuthType>('login')
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
        if(type === 'validation') {
            reset()
            if(response) {
                setType('twoFactor')
                navigate(`/twoFactor`)
            }
        }
        if(type === 'twoFactor') {
            reset()
            setOtp('')
            if(response) {
                setType('register')
                navigate(`/register`)
            } 
        }

        if(type === 'forgotPassword') {
           setPhoneRestore(data.phone!) 
           setType('validMailPasswordResore') 
           navigate(`/validMailPasswordResore`)
        }   

        if(type === 'validMailPasswordResore') {
            setType('restorePassword') 
            navigate(`/restorePassword`)
         }   


         if(type === 'restorePassword') {
            setType('login')
            navigate(`/login`)
            setOtp('')
         }

    }

    const handleType = (path: string) => {
        if(path == 'login') {
            setType('login')
        } else if (path == 'register') {
            setType('register')
        } else if (path == 'validation') {
            setType('validation')
        } else if (path == 'twoFactor') {
            setType('twoFactor')
        } else if (path == 'forgotPassword') {
            setType('forgotPassword')
        } else if (path == 'validMailPasswordResore') {
            setType('validMailPasswordResore')
        } else if (path == 'restorePassword') {
            setType('restorePassword')
        } else {
            setType('login')
        }
    }


    useEffect(() => {
        handleType(path)
    },[path])



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='border border-gray-500 rounded-lg text-center px-12 py-10'>
            <h1 id="auth-heading" data-testid="auth-heading" className='font-bold text-xl'>{type}</h1>

            {(type === 'login' || type === 'register') &&
                <div>
                    <input id="email" {...register("email")}  placeholder='email' className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'/>
                    {errors.email && <span>This field is required</span>}
                </div>
            }
            {
                type === 'register' &&
                <>
                    <div>
                        <input id="firstName" {...register("firstName")}  placeholder='firstName' className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2' />
                        {errors.email && <span>This field is required</span>}
                    </div>
                    <div>
                        <input id="lastName" {...register("lastName")}  placeholder='lastName' className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'/>
                        {errors.email && <span>This field is required</span>}
                    </div>
                </>
            }
            {
                type === 'validation' &&
                    <div>
                        <input id="userExId" {...register("userExId")}  placeholder='userExId' className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'/>
                        {errors.userExId && <span>This field is required</span>}
                    </div>
   
            }

            {
                 (type === 'validation' || type === 'forgotPassword') &&
                 <div>
                    <input id="phone" {...register("phone")}  placeholder='phone' className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'/>
                    {errors.phone && <span>This field is required</span>}
                </div>

            }
            {
                (type === 'login' || type === 'register' || type === 'restorePassword') &&
                <div>
                    <input id="password" {...register("password", { required: true })} placeholder='password' className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'/>
                    {errors.password && <span>This field is required</span>}
                </div>

            }
            {
               (type === 'twoFactor' || type === 'validMailPasswordResore') &&
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