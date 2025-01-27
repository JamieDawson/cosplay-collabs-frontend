import { InstagramEmbed } from "react-social-media-embed";

const InstagramComponent: React.FC = () => {
  return (
    <div>
      <InstagramEmbed
        url="https://www.instagram.com/p/CUbHfhpswxt/"
        width={328}
        height={382}
      />
    </div>
  );
};

export default InstagramComponent;
