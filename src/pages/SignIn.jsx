import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        alert("Google login successful!");
        localStorage.setItem("userId", res.user.uid);
        navigate("/");
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="container">
      <div className="col-lg-5 mx-auto my-5 p-4 shadow bg-white rounded text-center">
        <h3 className="mb-4">Welcome Back</h3>
        <button
          onClick={signInWithGoogle}
          className="btn btn-outline-danger w-100 py-2"
        >
          <i className="bi bi-google me-2"></i> Sign in with Google
        </button>

        <p className="mt-3">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
