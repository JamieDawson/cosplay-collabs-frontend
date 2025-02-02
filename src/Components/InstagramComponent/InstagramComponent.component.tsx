import { InstagramEmbed } from "react-social-media-embed";

const InstagramComponent: React.FC = () => {
  return (
    <div className="instagram-item">
      <InstagramEmbed
        url="https://www.instagram.com/p/CUbHfhpswxt/"
        // width={330}
        // height={380}
      />
      <div className="instagram-item-title">
        Batman cosplayer looking for Robin Cosplayer to team up
      </div>
      <div className="instagram-item-description">
        I'm a Batman cosplayer based in CA and I'd love to team up with a
        cosplayer who dreses as Robin!
      </div>
      <div className="instagram-item-tags">
        <button>The number one Batman</button> <button>Robin</button>{" "}
        <button>DC</button> <button>Dark Knight</button>
      </div>
    </div>
  );
};

export default InstagramComponent;
