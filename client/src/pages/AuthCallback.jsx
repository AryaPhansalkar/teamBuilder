// src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Grab the token from query params
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("reached frontend")
    console.log("Token from URL:", token);
    if (token) {
      // Store it in localStorage (or cookie)
      localStorage.setItem("token", token);

      // Redirect to protected page (e.g. dashboard/builder)
      navigate("/builder");
    } else {
      const savedToken = localStorage.getItem("token");
    if (savedToken) {
      navigate("/builder"); // already logged in
    } else {
      navigate("/login"); // truly no auth
    }
    }
  }, [navigate]);

  return <p>Finishing login...</p>;
}
