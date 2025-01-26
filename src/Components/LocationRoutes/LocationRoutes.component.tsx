import { Routes, Route } from "react-router-dom";
import LocationsMapper from "../LocationsMapper/LocationsMapper.component"; // Adjust path
import LocationDetails from "../LocationDetails/LocationDetails"; // Adjust path

const LocationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LocationsMapper />} />
      <Route
        path="/places/:country/:state/:city"
        element={<LocationDetails />}
      />
    </Routes>
  );
};

export default LocationRoutes;
