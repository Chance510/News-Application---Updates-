import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext"
import { useState } from "react";

export const useSignup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async(email, password, categories) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://updates-v1-server.vercel.app/user/signup', {
            method: `POST`,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password, categories })
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            localStorage.setItem('User', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)

            navigate("/");
        }
    }

    return {signup, error, isLoading}
} 