import React, {useState} from 'react';
import { AuthService } from '../../../../services/auth/auth.service';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string,
    password: string,
    firstName?: string
    lastName?: string
  };

const AuthForm = () => {

    const [isRegister, setIsRegister] = useState(false)
    const { register, handleSubmit, reset , formState: { errors } } = useForm<Inputs>();
  
    const handleSwitch = (type: boolean) => {
      reset()
      setIsRegister(type)
    }
    const onSubmit: SubmitHandler<Inputs> = data => AuthService.auth(isRegister ? 'register' : 'login', data)

    
    return (
        <div className='container-auth'>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <h1 data-testid="login-heading" className='head'>{isRegister ? 'Register' : 'Login'}</h1>
            <div className='input'>
                <input {...register("email")}  placeholder='email'/>
                {errors.email && <span>This field is required</span>}
            </div>
            {
                isRegister &&
                <>
                <div className='input'>
                <input {...register("firstName")}  placeholder='firstName'/>
                {errors.email && <span>This field is required</span>}
                </div>
                <div className='input'>
                <input {...register("lastName")}  placeholder='lastName'/>
                {errors.email && <span>This field is required</span>}
                </div>
                </>
            }

            <div className='input'>
                <input {...register("password", { required: true })} placeholder='password'/>
                {errors.password && <span>This field is required</span>}
            </div>
            <div className='auth'>
                <span data-testid="login-btn" onClick={() => handleSwitch(false)}>Login</span>
                <span>|</span>
                <span data-testid="register-btn" onClick={() => handleSwitch(true)}>Register</span>
            </div>
            <div className='button'>
                <button data-testid="auth-btn" type="submit">{isRegister ? 'Register' : 'Login'}</button>
            </div>
            </form>
        </div>
    );
};

export default AuthForm;