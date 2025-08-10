import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosAPI from "../utils/axios";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      axiosAPI.post("/api/auth/exchange-token", { token }, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            navigate("/builder");
          } else {
            alert("Authentication failed");
            navigate("/login");
          }
        })
        .catch(() => {
          alert("Authentication failed");
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Authenticating...</p>;
}
