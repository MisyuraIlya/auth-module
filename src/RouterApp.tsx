import React from 'react';
import { Routes, Route} from 'react-router-dom';
import AuthModule from './modules/Auth/AuthModule';
import HomePage from './HomePage';
const RouterApp = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<HomePage/>} />
                <Route path='/auth' element={<AuthModule/>}/>
            </Route>
        </Routes>
    );
};

export default RouterApp;