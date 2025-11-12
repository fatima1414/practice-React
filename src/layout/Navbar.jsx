import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase";

const navbar= () => {
 const [authUser,setAuthUser] = useState({})
 useEffect(()=>{
        onAuthStateChanged(auth,(result)=>{
         setAuthUser(result)
        })
    })

  return(
  <>

  {
    authUser!=null ?
        <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Navbar
          </NavLink>
          <button 

          
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/addTask">
                  add form
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
       </header>
    :
    ""
   
  }
 
  </>
  )
};

export default navbar;
