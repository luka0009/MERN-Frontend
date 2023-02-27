import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthcontext";
import { useState } from "react";
import {IoIosArrowDropdownCircle} from 'react-icons/io';

export default function Navbar() {
  const { logOut } = useLogout();
  const { user } = useAuthContext();
  const [show, setShow] = useState(false);

  const hadnleClick = () => {
    logOut();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workouts</h1>
        </Link>
        <nav>
          {user && (
            <div className="navbar-container">
              <span 
              style={{position: 'relative', cursor: 'pointer',}} 
              onClick={() => setShow(prevState => !prevState)}
              >{!show ? 'See Your Profile' : <span style={{fontSize: '19px', marginRight: '22px' ,color: 'red'}}>Close</span>}</span>
              {show && <span 
              style={{padding: '20px', color: 'white', background: 'gray', position: 'absolute', right: '30px', top: '80px'}}
              >Email - {user.email}</span>}
              <button onClick={hadnleClick}>Log Out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
