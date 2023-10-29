import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async(e) => {
        e.preventDefault();

        await login(email, password)
    }

    return ( 
        <div className="form-container">
            <form className="login" onSubmit={handleSubmit}>
                <h4>Login</h4>
                <div className="mb-3 mt-3">
                    <label className="form-label">Email: </label>
                    <input 
                        type="email" 
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}    
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Password: </label>
                    <input 
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} 
                    />
                </div>
                <div className="button-class">
                    <button className="btn btn-light auth-btn"disabled={isLoading}> Submit </button>
                </div>
                
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}
    
export default Login;