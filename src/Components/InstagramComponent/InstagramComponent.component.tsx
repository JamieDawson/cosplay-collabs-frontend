import { InstagramEmbed } from "react-social-media-embed";

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

const InstagramComponent: React.FC<InstagramComponentProps> = ({ ad }) => {
  console.log("Rendering ad:", ad);

  return (
    <div className="instagram-item">
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
