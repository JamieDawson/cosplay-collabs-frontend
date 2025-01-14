import React from "react";
import { useParams, Link } from "react-router-dom";

const LocationDetails: React.FC = () => {
  const { country, state, city } = useParams<{
    country: string;
    state: string;
    city: string;
  }>();

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
