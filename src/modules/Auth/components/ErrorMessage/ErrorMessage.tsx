import React from 'react';
import { useAuth } from '../../../../hooks/useAuth';

const ErrorMessage = () => {
    const {errorMessage} = useAuth()
    return (
        <div style={{color:'red'}} id="error">
            {errorMessage}
        </div>
    );
};

export default ErrorMessage;