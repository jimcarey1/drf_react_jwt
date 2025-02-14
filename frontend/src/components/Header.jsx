import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  let {user, logout} = useContext(AuthContext);
  return (
    <header>
      <nav>
        <ul>
          {user ? (
            <li>
              <Link to="/logout" onClick={logout}>Logout</Link>
            </li>
          ) : (
            <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          </>)}
        </ul>
      </nav>
      {user ? (
        <p>Welcome, {user.username}</p>
      ) : (
        <p>Welcome, Guest</p>
      )}
    </header>
  );
}

export default Header;