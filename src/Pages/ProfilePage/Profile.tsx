// Profile.tsx
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import InstagramComponent from "../../Components/InstagramComponent/InstagramComponent.component";
import axios from "axios";
import { useUser } from "../../UserContext";

import "../ProfilePage/Profile.css";

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
  const { logout } = useAuth0();
  const { setUsername } = useUser(); // add this at the top
  const { username } = useParams<{ username: string }>();

  const [ads, setProfileAds] = useState<Ad[]>([]);
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const [customUserData, setCustomUserData] = useState<CustomUserData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [finalWarningPopup, setFinalWarningPopup] = useState(false);
  const [popUpAfterDeleting, setPopUpAfterDeleting] = useState(false); // Will be set to true

  //useEffect checks if user exist, if not, finalize it with the complete-profile function
  useEffect(() => {
    if (isAuthenticated && user && username) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/users/username/${encodeURIComponent(
              username
            )}`
          );
          const userData = response.data.user;
          setCustomUserData(userData);
          if (userData?.username && user?.nickname === username) {
            setUsername(userData.username);
          }
        } catch (error: any) {
          console.error("Error fetching custom user data:", error);
          if (
            error.response &&
            error.response.status === 404 &&
            user?.nickname === username // only redirect if viewing your own profile
          ) {
            navigate("/complete-profile");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated, user, username]); // ✅ add `username` here!

  useEffect(() => {
    const getAdsForProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/ads/user/" + user?.sub
        );
        const data = await response.json();

        console.log("data is ", data);

        if (data.success) {
          setProfileAds(data.data);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    getAdsForProfile();
  }, [user]);

  const showFinalWarning = () => {
    if (finalWarningPopup === true) {
      setFinalWarningPopup(false);
    } else {
      setFinalWarningPopup(true);
    }
  };

  const deleteCurrentUserProfile = async () => {
    console.log("deleteCurrentUserProfile");
    console.log(user?.sub);

    try {
      // Change URL to your backend's full address
      const response = await fetch(
        "http://localhost:3000/api/users/delete-account/" +
          encodeURIComponent(user?.sub!),
        { method: "DELETE" }
      );

      console.log(response);

      if (response.ok) {
        alert("Account deleted successfully");
        setPopUpAfterDeleting(true);
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };

  const sendToHomePageAfterDeletingUser = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

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
      <button onClick={() => showFinalWarning()}>Delete your profile</button>
      {finalWarningPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="xbutton" onClick={showFinalWarning}>
              X
            </button>
            <p>
              Are you sure you want to delete your profile? This will remove
              your profile and all of your ads. This decision can not be
              reversed.
            </p>
            <button
              className="bothButtons"
              style={{ backgroundColor: "red" }}
              onClick={() => deleteCurrentUserProfile()}
            >
              Yes! Delete my profile
            </button>
            <button className="bothButtons" onClick={showFinalWarning}>
              No! I want to keep this!
            </button>
          </div>
        </div>
      )}

      {popUpAfterDeleting && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Your account is now deleted!</p>
            <button onClick={() => sendToHomePageAfterDeletingUser()}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
