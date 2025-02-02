import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const LocationDetails: React.FC = () => {
  const { country, state, city } = useParams<{
    country: string;
    state: string;
    city: string;
  }>();

  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/ads/${country}/${state}/${city}`
        );
        const data = await response.json();

        console.log("Fetched ads data:", data); // Log the entire response

        if (data.success) {
          console.log("Ads list:", data.data); // Log only the ads array
          setAds(data.data);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);

  console.log("Component rendered"); // This should appear every render

  useEffect(() => {
    console.log("WORK");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        Details for {city}, {state}, {country}
      </h1>
      <p>This page could have ads for {city}.</p>
      <Link to="/">Back to Locations</Link>
    </div>
  );
};

export default LocationDetails;

/*
I need to run a query to get the ads for this location.

SQL example:
SELECT * FROM ads
WHERE country = 'USA' AND state = 'CA' AND city = 'San Francisco'

*/
