import React, { createContext, useContext, useState } from 'react';
import { executeBasicAuthentication } from '../api/todoApiService';
import { apiClient } from '../api/ApiClient';

const AuthContext = createContext();

export const useAuthContext = () =>{
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);

    const [token, setToken] = useState(null);

    // function login(username, password)
    // {
    //     if(username === 'souldeath' && password === '123')
    //     {
    //         setIsAuthenticated(true);
    //         setUsername(username);
    //         return true;
      
    //     }else {
    //         setIsAuthenticated(false);
    //         return false;
    //     }
    // }

    async function login(username, password)
    {

        try {
            
            const baToken = 'Basic ' + window.btoa(username + ":" + password);
    
            const response = await executeBasicAuthentication(baToken);
    
            if(response.status ==  200)
            {
                setIsAuthenticated(true);
                setToken(baToken);
                setUsername(username);
                // Setting an interceptor sayin, "Any rest API calls, add this authorization token"
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('Intercepting and adding a token');
                        config.headers.Authorization = baToken;
                        return config;
                    }
                )
                return true;
                

            }else {
                logout();
                return false;    
            }

        } catch (error) {
            logout();
            return false;
        }

    }

    function logout()
    {
        setIsAuthenticated(false);
        setUsername(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={ { isAuthenticated, login, logout, username, token } }>
            { children }
        </AuthContext.Provider>
    )
}
