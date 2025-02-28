// Profile.tsx
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import InstagramComponent from "../../Components/InstagramComponent/InstagramComponent.component";
import axios from "axios";

interface CustomUserData {
  id: number;
  auth0_id: string;
  email: string;
  full_name: string;
  username: string | null;
  created_at: string;
  updated_at: string;
}

interface Ad {
  _id: string;
  id: number;
  user_id: string;
  title: string;
  description: string;
  country: string;
  state: string;
  city: string;
  instagram_post_url: string;
  keywords: string[];
  created_at: string;
}

function Profile() {
  const [ads, setProfileAds] = useState<Ad[]>([]);
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const [customUserData, setCustomUserData] = useState<CustomUserData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/users/${encodeURIComponent(user.sub!)}`
          );
          setCustomUserData(response.data.user);
        } catch (error: any) {
          console.error("Error fetching custom user data:", error);
          // If the user is not found in your DB, redirect to the profile completion page
          if (error.response && error.response.status === 404) {
            navigate("/complete-profile");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    const getAdsForProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/ads/user/" + user?.sub
        );
        const data = await response.json();

        if (data.success) {
          // console.log("Fetched ads:", data.data);
          setProfileAds(data.data);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    getAdsForProfile();
  }, []);

  return !isAuthenticated ? (
    <div>Please log in.</div>
  ) : loading ? (
    <div>Loading profile...</div>
  ) : (
    <div>
      <h2>Welcome, {user?.name || "unknown"}</h2>
      <p>Custom Username: {customUserData?.username || "Not set"}</p>
      <p>Your unique ID is: {user?.sub || "unknown"}</p>
      <p>Your email is: {user?.email || "unknown"}</p>
      {ads.map((ad) => (
        <InstagramComponent key={ad.id.toString()} ad={ad} />
      ))}
    </div>
  );
}

export default Profile;
