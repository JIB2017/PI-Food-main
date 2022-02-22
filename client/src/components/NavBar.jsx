import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import SearchBar from "./SearchBar";

export default function NavBar({ setPage }) {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  function login() {
    loginWithRedirect();
  }

  function signup() {
    loginWithRedirect({
      screen_hint: "signup",
    });
  }

  function out() {
    logout({
      returnTo: window.location.origin,
    });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarScroll">
          {isAuthenticated ? <img className={styles.img} src={user.picture} alt={user.name} /> : <></>}
          <div className="dropdown p-2">
            <button
              className="btn btn-warning dropdown-toggle"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Menu
            </button>

            <ul className="dropdown-menu bg-warning" aria-labelledby="dropdownMenuLink">
              <li>
                <Link className="dropdown-item" to="/">
                  Landing page
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/home">
                  Homepage
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/form">
                  Create dog
                </Link>
              </li>
              <hr
                style={{
                  backgroundColor: "black",
                  height: 1,
                }}
              />
              {!isAuthenticated ? (
                <>
                  <li>
                    <button className="dropdown-item" onClick={signup}>
                      Sing Up
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={login}>
                      Login
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <button className="dropdown-item" onClick={out}>
                    Logout
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
        <SearchBar setPage={setPage}/>
      </div>
    </nav>
  );
}
