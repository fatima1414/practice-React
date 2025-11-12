// layout/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthed(!!user);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  if (checking) return null; // or spinner
  return authed ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
