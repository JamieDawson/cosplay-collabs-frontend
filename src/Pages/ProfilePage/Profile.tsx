// Profile.tsx
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import InstagramComponent from "../../Components/InstagramComponent/InstagramComponent.component";
import axios from "axios";
import { useUser } from "../../UserContext";
import "../ProfilePage/Profile.css";

// Define the interface for custom user data from your PostgreSQL DB
interface CustomUserData {
  id: number;
  auth0_id: string;
  email: string;
  full_name: string;
  username: string | null;
  created_at: string;
  updated_at: string;
}

// Define interface for Ads
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
  const { logout, isAuthenticated, user } = useAuth0(); // Auth0 context
  const { setUsername } = useUser(); // Our global context for username
  const { username } = useParams<{ username: string }>(); // Username from URL params
  const navigate = useNavigate();

  const [ads, setProfileAds] = useState<Ad[]>([]);
  const [customUserData, setCustomUserData] = useState<CustomUserData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [finalWarningPopup, setFinalWarningPopup] = useState(false);
  const [popUpAfterDeleting, setPopUpAfterDeleting] = useState(false);

  /**
   * Fetch user data based on the username in URL
   * We'll query PostgreSQL by username, which should be indexed for performance.
   * - If user is viewing their own profile, we'll also update the context username.
   */
  useEffect(() => {
    if (!isAuthenticated || !user || !username) return;

    const fetchUserData = async () => {
      try {
        // Call backend API to get user data by username (PostgreSQL should use index on username)
        const response = await axios.get(
          `http://localhost:3000/api/users/username/${encodeURIComponent(
            username
          )}`
        );
        const userData: CustomUserData = response.data.user;
        setCustomUserData(userData);

        // If the profile viewed belongs to the logged-in user (matching auth0_id), set context username
        if (userData?.auth0_id === user.sub) {
          setUsername(userData.username || ""); // Optional: fallback if username is null
        }
      } catch (error: any) {
        console.error("Error fetching custom user data:", error);

        // If username not found (404) and it's the logged-in user's profile, redirect to complete-profile
        if (error.response?.status === 404 && user?.nickname === username) {
          navigate("/complete-profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, user, username, navigate, setUsername]);

  /**
   * Fetch ads created by this user.
   * - If viewing own profile, use user.sub (auth0_id).
   * - If viewing someone else's profile, use customUserData.auth0_id.
   */
  useEffect(() => {
    const getAdsForProfile = async (auth0Id: string) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/ads/user/${encodeURIComponent(auth0Id)}`
        );
        const data = await response.json();
        if (data.success) {
          setProfileAds(data.data);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    // Only fetch ads if we have customUserData (loaded) or own profile (user.sub)
    if (customUserData?.auth0_id) {
      getAdsForProfile(customUserData.auth0_id);
    } else if (user?.sub && user?.nickname === username) {
      getAdsForProfile(user.sub);
    }
  }, [customUserData?.auth0_id, user?.sub, username]);

  /**
   * Show the warning popup for account deletion
   */
  const showFinalWarning = () => {
    setFinalWarningPopup((prev) => !prev);
  };

  /**
   * Delete the user's account from PostgreSQL using auth0_id
   */
  const deleteCurrentUserProfile = async () => {
    if (!user?.sub) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/delete-account/${encodeURIComponent(
          user.sub
        )}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setPopUpAfterDeleting(true);
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  /**
   * After deletion, log out and navigate home
   */
  const sendToHomePageAfterDeletingUser = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  // Handle loading state
  if (!isAuthenticated) return <div>Please log in.</div>;
  if (loading) return <div>Loading profile...</div>;

  return (
    <div>
      <h2>Welcome, {customUserData?.full_name || user?.name || "unknown"}</h2>
      <p>Custom Username: {customUserData?.username || "Not set"}</p>
      <p>
        Your unique ID is: {customUserData?.auth0_id || user?.sub || "unknown"}
      </p>
      <p>Your email is: {customUserData?.email || user?.email || "unknown"}</p>

      {/* Render user's ads */}
      {ads.map((ad) => (
        <InstagramComponent key={ad._id} ad={ad} />
      ))}

      {/* Delete profile button and warning */}

      {customUserData?.auth0_id === user?.sub ? (
        <button onClick={showFinalWarning}>Delete your profile</button>
      ) : (
        ""
      )}

      {finalWarningPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="xbutton" onClick={showFinalWarning}>
              X
            </button>
            <p>
              Are you sure you want to delete your profile? This cannot be
              reversed.
            </p>
            <button
              className="bothButtons"
              style={{ backgroundColor: "red" }}
              onClick={deleteCurrentUserProfile}
            >
              Yes, delete it
            </button>
            <button className="bothButtons" onClick={showFinalWarning}>
              No, keep it
            </button>
          </div>
        </div>
      )}

      {/* Post-deletion popup */}
      {popUpAfterDeleting && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Your account has been deleted.</p>
            <button onClick={sendToHomePageAfterDeletingUser}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
