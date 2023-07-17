import React, {useState} from 'react';
import { AuthService } from '../../../../services/auth/auth.service';
import { useForm, SubmitHandler } from "react-hook-form";
import OtpInput from 'react-otp-input';

type Inputs = {
    email: string,
    password: string,
    //--for register----
    firstName?: string,
    lastName?: string,
    //------------------
    //--for validation--
    userExId?: string,
    phone?: string
    //------------------
    token?: string



  };

  type AuthType = "login" | "register" | "validation" | "twoFactor" | "forgotPassword" | "validMailPasswordResore" | "restorePassword";

const AuthForm = () => {

    const [otp, setOtp] = useState('');
    const [type, setType] = useState<AuthType>('login')
    const { register, handleSubmit, reset , formState: { errors } } = useForm<Inputs>();
  
    const handleSwitch = (type: 'login' | 'register' | 'validation' | "twoFactor" | "forgotPassword" | "validMailPasswordResore" | "restorePassword" ) => {
      reset()
      setType(type)

    }
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if(otp) {
            data.token = otp
        }
        const response = await AuthService.auth(type, data)
        if(type === 'validation') {
            reset()
            if(response) {
                setType('twoFactor')
            }
        }
        if(type === 'twoFactor') {
            reset()
            setOtp('')
            if(response) {
                setType('register')
            } 
        }

        if(type === 'forgotPassword') {
           setType('validMailPasswordResore') 
        }   

        if(type === 'validMailPasswordResore') {
            setType('restorePassword') 
         }   


         if(type === 'restorePassword') {
            setType('login')
         }

    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='border border-gray-500 rounded-lg text-center px-12 py-10'>
            <h1 id="auth-heading" data-testid="auth-heading" className='font-bold text-xl'>{type}</h1>

            {(type === 'login' || type === 'register' || type === 'forgotPassword') &&
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
                <>
                    <div>
                        <input id="userExId" {...register("userExId")}  placeholder='userExId' className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'/>
                        {errors.userExId && <span>This field is required</span>}
                    </div>
                    <div>
                        <input id="phone" {...register("phone")}  placeholder='phone' className='px-2 py-2 border border-gray-400 rounded-md w-96 m-2'/>
                        {errors.phone && <span>This field is required</span>}
                    </div>
                </>
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

            {/* {
                type === 'validMailPasswordResore' &&
                <div className='py-2'>
                    <button className='underline cursor-pointer' onClick={() => handleSwitch('forgotPassword')}>dont get mail/sms ?</button>
                </div>
            } */}

            <div className='m-2'>
                <button id="auth-btn" data-testid="auth-btn" type="submit" className='font-bold bg-blue-400 text-white py-2 rounded-xl px-12 hover:bg-blue-600'>{type}</button>
            </div>
        </form>
    );
};

export default AuthForm;