import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import InstagramComponent from "../InstagramComponent/InstagramComponent.component";

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

const StateDetails: React.FC = () => {
  const { country, state } = useParams<{
    country: string;
    state: string;
  }>();

  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/ads/by-state/${country}/${state}`
        );
        const data = await response.json();

        //  console.log("Fetched ads data:", data); // Log the entire response

        if (data.success) {
          //  console.log("Ads list:", data.data); // Log only the ads array
          setAds(data.data);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        All ads for {state}, {country}
      </h1>
      <Link to="/places">
        <button type="button">Back to Places</button>
      </Link>

      {ads.length === 0 ? (
        <p>No ads found for {state}.</p>
      ) : (
        ads.map((ad) => <InstagramComponent key={ad.id.toString()} ad={ad} />)
      )}
    </div>
  );
};

export default StateDetails;

/*
Page that displays when you click on a state
*/
