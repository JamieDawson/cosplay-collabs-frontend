// PostLoginRedirect.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

export default function PostLoginRedirect() {
  const { username } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      navigate(`/profile/${username}`);
    }
  }, [username, navigate]);

  return <p>Redirecting to your profile...</p>;
}
