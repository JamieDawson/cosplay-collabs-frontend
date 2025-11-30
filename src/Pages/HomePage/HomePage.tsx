import { useEffect, useState } from "react";
import InstagramComponent from "../../Components/InstagramComponent/InstagramComponent.component";

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
          setFrontPageAds(data.data);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    getAdsForFrontPage();
  }, []);

  // Function to remove an ad from the state after deletion
  const removeAdFromFrontPage = (deletedId: number) => {
    setFrontPageAds((prevAds) => prevAds.filter((ad) => ad.id !== deletedId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8">
        {frontPageAds.map((ad) => (
          <InstagramComponent
            key={ad.id.toString()}
            ad={ad}
            onDelete={removeAdFromFrontPage}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
