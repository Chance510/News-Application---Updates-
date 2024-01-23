import { Link, useNavigate } from "react-router-dom";
import { useTopicContext } from "../hooks/useTopicContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
    const navigate = useNavigate();
    const {dispatch} = useTopicContext();
    const {user} = useAuthContext()
    const {logout} = useLogout()

    const handleClick = (e) => {
        e.preventDefault();
       console.log(e.target.value);
       dispatch({type: 'SET_TOPIC', payload: e.target.value});
       navigate("/");
    }

    const handleLogout = (e) => {
        logout()
    }

    const handleFeedClick = (e) => {
        navigate("/user/feed");
    }


    return ( 
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand fs-3"  onClick={() => dispatch({type: 'SET_TOPIC', payload: 'all'})}>Updates!!</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item text-secondary">
                            <button value="politics" className="btn btn-light" onClick={(e) => handleClick(e)}> Politics </button>
                        </li>
                        <li className="nav-item text-secondary">
                            <button value="national" className="btn btn-light" onClick={(e) => handleClick(e)}> National </button>
                        </li>
                        <li className="nav-item text-secondary">
                            <button value="business" className="btn btn-light" onClick={(e) => handleClick(e)}> Business </button>
                        </li>
                        <li className="nav-item text-secondary">
                            <button value="sports" className="btn btn-light" onClick={(e) => handleClick(e)}> Sports </button>
                        </li>
                        <li className="nav-item text-secondary">
                            <button value="entertainment" className="btn btn-light" onClick={(e) => handleClick(e)}> Entertainment </button>
                        </li>
                        <li className="nav-item text-secondary">
                            <button value="world" className="btn btn-light" onClick={(e) => handleClick(e)}> World </button>
                        </li>
                        <li className="nav-item text-secondary">
                            <button value="travel" className="btn btn-light" onClick={(e) => handleClick(e)}> Travel </button>
                        </li>
                        <li className="nav-item text-secondary">
                            <button value="fashion" className="btn btn-light" onClick={(e) => handleClick(e)}> Fashion </button>
                        </li>
                        <li className="nav-item text-secondary">
                            <button className="btn btn-light" disabled={!user} onClick={(e) => handleFeedClick(e)}>My Feed</button>
                        </li>
                    </ul>
                    <ul className="navbar-nav d-flex">
                        {!user && 
                            <div className="auth-functions d-flex">
                                <li className="nav-item text-secondary px-2 fs-5">
                                    <Link to="/login" className="nav-link auth-link">Login</Link>
                                </li>
                                <li className="nav-item text-secondary px-2 fs-5">
                                    <Link to="/signup" className="nav-link auth-link">Signup</Link>
                                </li>
                            </div>
                        }
                        {user &&
                            <div className="auth-functions d-flex">
                                <p>{user.email}</p>
                                <li className="nav-item text-secondary">
                                    <button className="btn btn-light" onClick={(e)=>handleLogout(e)}>Logout</button>
                                </li>
                            </div>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;