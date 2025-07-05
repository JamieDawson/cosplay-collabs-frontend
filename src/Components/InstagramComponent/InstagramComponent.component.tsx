import { InstagramEmbed } from "react-social-media-embed";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./InstagramComponent.css";

interface Ad {
  _id?: string;
  id: number;
  user_id: string;
  title: string;
  description: string;
  instagram_post_url: string;
  keywords: string[];
}

interface InstagramComponentProps {
  ad: Ad;
  onDelete: (deletedId: number) => void;
  onTagClick?: (tag: string) => void; // ✅ optional prop
}

const InstagramComponent: React.FC<InstagramComponentProps> = ({
  ad,
  onDelete,
  onTagClick,
}) => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [confirmDeletedPopup, setConfirmDeletedPopup] = useState(false);
  const [adToDelete, setAdToDelete] = useState<number | null>(null);

  const goToUpdateForm = (ad: Ad) => {
    navigate("/UpdatePostForm", { state: { ad } });
  };

  const goToTagPage = (keyword: string) => {
    if (onTagClick) {
      onTagClick(keyword); // ✅ Notify parent
    } else {
      const encodedKeyword = encodeURIComponent(keyword);
      navigate(`/tags-page?q=${encodedKeyword}`);
    }
  };

  const handleDeleteAd = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success) {
        setShowDeletePopup(false);
        setConfirmDeletedPopup(true);
        setAdToDelete(id);
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const handleConfirmDeletedPopup = () => {
    setConfirmDeletedPopup(false);
    if (adToDelete !== null) {
      onDelete(adToDelete);
      setAdToDelete(null);
    }
  };

  return (
    <>
      <div className="instagram-item">
        {user?.sub === ad.user_id && (
          <>
            <button onClick={() => setShowDeletePopup(true)}>Delete</button>
            <button onClick={() => goToUpdateForm(ad)}>Update</button>
          </>
        )}

        <InstagramEmbed url={ad.instagram_post_url} />
        <div className="instagram-item-title">{ad.title}</div>
        <div className="instagram-item-description">{ad.description}</div>
        <div className="instagram-item-tags">
          {ad.keywords.map((keyword, index) =>
            keyword.length > 0 ? (
              <button onClick={() => goToTagPage(keyword)} key={index}>
                {keyword}
              </button>
            ) : null
          )}
        </div>
      </div>

      {showDeletePopup && (
        <div className="delete-popup">
          <p>Are you sure you want to delete this ad?</p>
          <button onClick={() => handleDeleteAd(ad.id)}>Yes, Delete</button>
          <button onClick={() => setShowDeletePopup(false)}>Cancel</button>
        </div>
      )}

      {confirmDeletedPopup && (
        <div className="delete-popup">
          <p>Your ad has been deleted!</p>
          <button onClick={handleConfirmDeletedPopup}>Close</button>
        </div>
      )}
    </>
  );
};

export default InstagramComponent;
