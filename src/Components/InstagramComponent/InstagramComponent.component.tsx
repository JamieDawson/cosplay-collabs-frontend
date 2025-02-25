import { InstagramEmbed } from "react-social-media-embed";
import { useAuth0 } from "@auth0/auth0-react";

interface Ad {
  _id: string;
  // Add other properties here
}

interface InstagramComponentProps {
  key: string;
  ad: Ad;
}

interface Ad {
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
  console.log(user);

  console.log(ad);
  return (
    <div className="instagram-item">
      {user?.sub === ad.user_id ? (
        <button onClick={() => deleteAd({ id: ad.id })}>Delete</button>
      ) : (
        <></>
      )}

      <InstagramEmbed url={ad.instagram_post_url} />
      <div className="instagram-item-title">{ad.title}</div>
      <div className="instagram-item-description">{ad.description}</div>
      <div className="instagram-item-tags">
        {ad.keywords.map((keyword, index) => (
          <button key={index}>{keyword}</button>
        ))}
      </div>
    </div>
  );
};

export default InstagramComponent;
