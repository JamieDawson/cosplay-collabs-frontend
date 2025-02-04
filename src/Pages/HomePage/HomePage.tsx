import { useEffect, useState } from "react";
import InstagramComponent from "../../Components/InstagramComponent/InstagramComponent.component";
import "./HomePage.css";

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

const HomePage: React.FC = () => {
  const [frontPageAds, setFrontPageAds] = useState<Ad[]>([]);

  useEffect(() => {
    const getAdsForFrontPage = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/ads/most-recent"
        );
        const data = await response.json();

        if (data.success) {
          console.log("Fetched ads:", data.data);
          setFrontPageAds(data.data);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    getAdsForFrontPage();
  }, []);

  return (
    <div className="instagram-grid">
      {frontPageAds.map((ad) => (
        <InstagramComponent key={ad.id.toString()} ad={ad} />
      ))}
    </div>
  );
};

export default HomePage;
