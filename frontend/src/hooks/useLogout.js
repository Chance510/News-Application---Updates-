import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router";

export const useLogout = () => {

    const navigate = useNavigate();
    const {dispatch} = useAuthContext()

    const logout = () => {

        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'});

        navigate("/");
    }

    return {logout};
}