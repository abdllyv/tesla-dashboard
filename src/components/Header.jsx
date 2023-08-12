/* ---------------------------------- React --------------------------------- */
import { useContext } from "react";

/* --------------------------------- Router --------------------------------- */
import { Link } from "react-router-dom";

/* --------------------------------- Context -------------------------------- */
import { Auth } from "../utils/Auth";

/* ------------------------------- React Icon ------------------------------- */
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import logo from "../assets/img/tesla-9.svg"

const Header = () => {
  /* --------------------------------- Context -------------------------------- */
  const { token, logOut } = useContext(Auth);

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="loog" />
            </Link>
            {/* <Link to="/">
              SH<span>oP</span>
            </Link> */}
          </div>
          <nav className="nav-bar">
            {token && (
              <ul className="nav-list">
                <li className="nav-items">
                  <Link to="/">home</Link>
                </li>
                <li className="nav-items">
                  <Link to="/all-product">All Product</Link>
                </li>
                <li className="nav-items">
                  <Link to="/create-product">Create Product</Link>
                </li>
              </ul>
            )}
          </nav>
          <div className="userArea">
            {token ? (
              <Link className="login" to="/login" onClick={logOut}>
                <FiLogOut />
                <span>LOG Out</span>
              </Link>
            ) : (
              <Link className="login" to="/login">
                <FaUserCircle />
                <span>LOG IN</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
