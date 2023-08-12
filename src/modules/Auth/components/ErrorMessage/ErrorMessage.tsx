import React from 'react';
import { useAuth } from '../../../../hooks/useAuth';

const ErrorMessage = () => {
    const {errorMessage} = useAuth()
    return (
        <div style={{color:'red'}}>
            {errorMessage}
        </div>
    );
};

export default ErrorMessage;