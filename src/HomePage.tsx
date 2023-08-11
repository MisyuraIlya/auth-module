import React from 'react';
import { useActions } from './hooks/useActions';

const HomePage = () => {
    const {logout} = useActions()
    return (
        <div>
            Hello world
            <div>
                <button onClick={() => {logout()}}>Logout</button>
            </div>
        </div>
    );
};

export default HomePage;