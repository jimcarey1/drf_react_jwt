import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate()
    
    useEffect(() => {
        const authData = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
        setAuthTokens(authData);
        if(authData){
            setUser(jwtDecode(authData.access));
            navigate('/')
        }
    }, []);
    
    const loginUser = async(e) => {
        e.preventDefault()
        let response = await fetch('http://localhost:8000/api/token/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        if(response.status == 200){
            let data = await response.json()
            setAuthTokens(data)
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate('/')
            setUser(jwtDecode(data.access));
        }else{
            alert('Invalid credentials')
        }
    };
    
    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate('/login')
    };
    
    return (
        <AuthContext.Provider value={{user, loginUser, logout}}>
        {children}
        </AuthContext.Provider>
    );
    }

export { AuthProvider, AuthContext };