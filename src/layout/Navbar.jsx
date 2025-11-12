import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Navbar = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      if (user) localStorage.setItem("userId", user.uid);
      else localStorage.removeItem("userId");
    });
    return () => unsub();
  }, []);

  async function signInGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("userId", user.uid);
      setAuthUser(user);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleSignOut() {
    await signOut(auth);
    setAuthUser(null);
    localStorage.removeItem("userId");
    navigate("/signin");
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand" to="/">MyTasks</NavLink>
          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {authUser && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/addTask">Add Task</NavLink>
                  </li>
                </>
              )}
            </ul>

            <div className="d-flex align-items-center">
              {authUser ? (
                <>
                  <span className="me-2">{authUser.displayName || authUser.email}</span>
                  <button className="btn btn-outline-danger btn-sm" onClick={handleSignOut}>Logout</button>
                </>
              ) : (
                <>
                  <button className="btn btn-outline-primary me-2" onClick={() => navigate('/signin')}>Login</button>
                  <button className="btn btn-primary" onClick={signInGoogle}>Sign in with Google</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
