import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();

    useEffect(() => {

        localStorage.clear();

        navigate('/login');
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <h2>Logging out...</h2>
        </div>
    );
};

export default LogOut;
