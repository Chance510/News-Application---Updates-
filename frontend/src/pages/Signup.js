import { useState } from "react"
import { useSignup } from "../hooks/useSignup";
import Select from "react-select"
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [categories, setCategories] = useState([])
    const {signup, error, isLoading} = useSignup()
    const {user} = useAuthContext();

    const options = [
        {value: "national", label: "National"},
        {value: "sports", label: "Sports"},
        {value: "business", label: "Business"},
        {value: "politics", label: "Politics"},
        {value: "fashion", label: "Fashion"},
        {value: "entertainment", label: "Entertainment"},
        {value: "travel", label: "Travel"},
        {value: "world", label: "World"}
    ]

    const handleClick = async(e) => { 
        e.preventDefault()
        await signup(email, password, categories)
        
        console.log(user);
    }

    const handleChange = (ele) => {
        let arr = []
        if(ele.length == 0)setCategories(arr);
        else{
            ele.forEach(e => {
                arr.push(e.value);
            });
            setCategories(arr);
        }
    }

    return ( 
        <div className="form-container">
            <form className="signup" onSubmit={handleClick}>
                <h4>Signup</h4>
                <div className="mb-3 mt-3">
                    <label className="form-label" >Email: </label>
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

                <Select 
                    className="mt-4" 
                    isMulti 
                    options={options}
                    closeMenuOnSelect={false}
                    onChange={handleChange}
                />
                
                <div className="button-class">   
                    <button className="btn btn-light auth-btn" disabled={isLoading}>Submit</button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}
 
export default Signup;