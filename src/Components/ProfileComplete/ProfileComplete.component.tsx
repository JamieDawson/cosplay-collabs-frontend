// ProfileComplete.component.tsx
import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ProfileCompletion: React.FC = () => {
  const { user } = useAuth0();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting profile completion for:", user);
    try {
      const userData = {
        auth0_id: user?.sub,
        email: user?.email,
        name: user?.name,
        username: username,
      };

      const response = await axios.post(
        "http://localhost:3000/api/users/complete-profile",
        userData
      );
      console.log("Profile updated successfully:", response.data);
      // Redirect after successful update
      navigate("/profile", { replace: true });
      // If navigate doesn't work, you can try:
      // window.location.href = "/profile";
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Custom Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileCompletion;
