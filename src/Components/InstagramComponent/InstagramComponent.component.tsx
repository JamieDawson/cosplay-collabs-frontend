import React from "react";
import { InstagramEmbed } from "react-social-media-embed";

const InstagramComponent: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <InstagramEmbed
        url="https://www.instagram.com/p/CUbHfhpswxt/"
        width={328}
        height={382}
      />
    </div>
  );
};

export default InstagramComponent;
