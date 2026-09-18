import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

import './AuthLoading.css';

const LoginRedirect = ({ children }) => {

    const navigate = useNavigate();

    const { estaAutenticado } = useAuth();

    useEffect(() => {
     setTimeout(() => {
        if (estaAutenticado) {

            navigate('/', {
                replace: true
            });

        }
    }, 1500);

    }, [estaAutenticado, navigate]);


    if (estaAutenticado) {

        return (
            <div className="auth-loading">

                <div className="auth-loading-logo">
                    ☼
                </div>

                <div className="auth-loading-spinner"></div>

                <h2>
                    GAMAR GO
                </h2>

                <p>
                    Restaurando tu sesión...
                </p>

            </div>
        );

    }


    return children;
};

export default LoginRedirect;