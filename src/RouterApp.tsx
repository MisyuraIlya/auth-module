import React from 'react';
import { Routes, Route} from 'react-router-dom';
import AuthModule from './modules/Auth/AuthModule';
import HomePage from './HomePage';
import { APP_ROUTER } from './modules/Auth/config/router';
const RouterApp = () => {

    return (
        <Routes>
            <Route>
                <Route path="/" element={<HomePage/>} />
                <Route path={APP_ROUTER.LOGIN.LINK} element={<AuthModule/>}/>
                <Route path={APP_ROUTER.REGISTER.LINK} element={<AuthModule/>}/>
                <Route path={APP_ROUTER.VALIDATION.LINK} element={<AuthModule/>}/>
                <Route path={APP_ROUTER.TWO_FACTOR.LINK} element={<AuthModule/>}/>
                <Route path={APP_ROUTER.FORGOT_PASSWORD.LINK} element={<AuthModule/>}/>
                <Route path={APP_ROUTER.VALID_USER_PASSWORD_RESTORE.LINK} element={<AuthModule/>}/>
                <Route path={APP_ROUTER.RESTORE_PASSWORD.LINK} element={<AuthModule/>}/>
            </Route>
        </Routes>
    );
};

export default RouterApp;