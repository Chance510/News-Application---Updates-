import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router";

export const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async(email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:4000/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        
        else{
            localStorage.setItem('User', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(false);

            navigate("/");
        }
    }
    return {login, error, isLoading};
}

