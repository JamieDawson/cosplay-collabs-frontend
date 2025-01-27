import InstagramComponent from "../../Components/InstagramComponent/InstagramComponent.component";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="instagram-grid">
      <InstagramComponent />
      <InstagramComponent />
      <InstagramComponent />
      <InstagramComponent />
      <InstagramComponent />
      <InstagramComponent />
    </div>
  );
};

export default HomePage;
