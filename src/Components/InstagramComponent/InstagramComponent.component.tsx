import { InstagramEmbed } from "react-social-media-embed";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

interface InstagramComponentProps {
  key: string;
  ad: Ad;
}

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
}

interface deleteAdProps {
  id: number;
}

const deleteAd = ({ id }: deleteAdProps) => {
  console.log("deleted add number: " + id);

  const runDeleteAd = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  runDeleteAd();
};

const InstagramComponent: React.FC<InstagramComponentProps> = ({ ad }) => {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const goToUpdateForm = (ad: Ad) => {
    console.log("update form");
    console.log(ad);
    navigate("/UpdatePostForm", { state: { ad } });
  };

  const goToTagPage = (keyword: string) => {
    console.log(keyword);
    navigate("/tags-page", { state: { keyword } });
  };

  return (
    <div className="instagram-item">
      {user?.sub === ad.user_id ? (
        <>
          <button onClick={() => deleteAd({ id: ad.id })}>Delete</button>
          <button onClick={() => goToUpdateForm(ad)}>Update</button>
        </>
      ) : (
        <></>
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
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default InstagramComponent;

/*
        {ad.keywords.map((keyword, index) => (
          <button onClick={() => goToTagPage(keyword)} key={index}>
            {keyword}
          </button>
        ))}

*/
