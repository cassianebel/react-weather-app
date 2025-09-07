import { useEffect, useState } from "react";
import { useUnits } from "../context/UnitsContext";
import { buildForecastUrl, buildReverseGeocodeURL } from "../helperFunctions";

interface NominatimResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    hamlet?: string;
    state?: string;
    country?: string;
  };
}

function formatLocation(address: {
  city?: string;
  town?: string;
  village?: string;
  hamlet?: string;
  state?: string;
  country?: string;
}) {
  const place =
    address.city ||
    address.town ||
    address.village ||
    address.hamlet ||
    "Unknown place";
  // U.S. → prefer city + state
  if (address.country === "United States" && address.state) {
    return `${place}, ${address.state}`;
  }
  // Else → city + country
  if (address.country) {
    return `${place}, ${address.country}`;
  }
  // Fallback
  return place;
}

export default function Weather({ lat, lon }: { lat: number; lon: number }) {
  const { units } = useUnits();
  const [data, setData] = useState<any>(null);
  const [place, setPlace] = useState<any>(null);

  useEffect(() => {
    async function fetchWeather() {
      const url = buildForecastUrl(lat, lon, units);
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    }
    fetchWeather();
  }, [lat, lon, units]);

  useEffect(() => {
    async function fetchCity() {
      const url = buildReverseGeocodeURL(lat, lon);
      const res = await fetch(url);
      const data: NominatimResponse = await res.json();
      const address = data.address;
      const place = formatLocation(address);

      console.log(place);
      setPlace(place);
    }
    fetchCity();
  }, [lat, lon]);

  if (!data) return <p>Loading weather…</p>;

  return (
    <div>
      <h2>{place}</h2>
      <p>Current temperature: {data.current.temperature_2m}°</p>
      <p>Feels like: {data.current.apparent_temperature}°</p>
      <p>
        Wind: {data.current.wind_speed_10m} {units.wind}
      </p>
    </div>
  );
}
