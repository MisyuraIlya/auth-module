import React from 'react';
import { Routes, Route} from 'react-router-dom';
import AuthModule from './modules/Auth/AuthModule';
import HomePage from './HomePage';
const RouterApp = () => {

    // const handleSwitch = (type: 'login' | 'register' | 'validation' | "twoFactor" | "forgotPassword" | "validMailPasswordResore" | "restorePassword"
    return (
        <Routes>
            <Route>
                <Route path="/" element={<HomePage/>} />
                <Route path='/login' element={<AuthModule/>}/>
                <Route path='/register' element={<AuthModule/>}/>
                <Route path='/validation' element={<AuthModule/>}/>
                <Route path='/twoFactor' element={<AuthModule/>}/>
                <Route path='/forgotPassword' element={<AuthModule/>}/>
                <Route path='/validMailPasswordResore' element={<AuthModule/>}/>
                <Route path='/restorePassword' element={<AuthModule/>}/>
            </Route>
        </Routes>
    );
};

export default RouterApp;