import { useEffect } from "react";
import { useNavigate ,useSearchParams} from "react-router-dom";
import axiosAPI from "../utils/axios";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const exchangeToken = async () => {
      try {
        const res = await axiosAPI.post('/api/auth/exchange-token', { token }, { withCredentials: true });
        if (res.data.success) {
          navigate('/builder');
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error('Token exchange failed', err);
        navigate('/login');
      }
    };

    exchangeToken();
  }, [token, navigate]);

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;