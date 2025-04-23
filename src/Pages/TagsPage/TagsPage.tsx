import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import InstagramComponent from "../../Components/InstagramComponent/InstagramComponent.component";

interface Ad {
  id: number;
  user_id: string;
  title: string;
  description: string;
  instagram_post_url: string;
  keywords: string[];
  country?: string;
  state?: string;
  city?: string;
}

const TagsPage = () => {
  const location = useLocation();
  let { keyword } = location.state || {};
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const gettingAds = async () => {
      keyword = keyword.toLowerCase();
      console.log("keyword now: ", keyword);
      try {
        const response = await fetch(
          `http://localhost:3000/api/ads/ads-by-tag/${keyword}`
        );
        const json = await response.json();
        console.log("Fetched ads:", json); // 👀 Check what's returned here

        setAds(json.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    if (keyword) {
      gettingAds();
    }
  }, [keyword]);

  return (
    <>
      <div>
        <h2>Tags Page</h2>
        <h3>Selected keyword: {keyword}</h3>
      </div>

      <div className="ads-list">
        {ads.length > 0 ? (
          ads.map((ad) => <InstagramComponent key={ad.id.toString()} ad={ad} />)
        ) : (
          <p>No ads found for this tag.</p>
        )}
      </div>
    </>
  );
};

export default TagsPage;
