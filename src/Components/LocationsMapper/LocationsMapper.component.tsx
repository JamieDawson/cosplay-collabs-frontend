import { Link } from "react-router-dom";
import { locationData } from "../../Data/locations";

const LocationsMapper: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Locations</h1>
      <div>
        {Object.entries(locationData.countries).map(
          ([country, countryData]) => (
            <div key={country}>
              <h2>{country}</h2>
              {Object.entries(countryData.states).map(([state, cities]) => (
                <div key={state} style={{ marginLeft: "20px" }}>
                  <h3>{state}</h3>
                  <ul>
                    {cities.map((city) => (
                      <li key={city}>
                        <Link to={`/places/${country}/${state}/${city}`}>
                          {city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LocationsMapper;
