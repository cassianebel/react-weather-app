import { useEffect, useState } from "react";
import { useUnits } from "../context/UnitsContext";
import { buildForecastUrl } from "../openMeteo";

export default function Weather({ lat, lon }: { lat: number; lon: number }) {
  const { units } = useUnits();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchWeather() {
      const url = buildForecastUrl(lat, lon, units);
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      console.log("Fetched weather data:", json);
    }

    fetchWeather();
  }, [lat, lon, units]); // 🔑 refetch when units change

  if (!data) return <p>Loading weather…</p>;

  return (
    <div>
      <h2>Current temperature: {data.current.temperature_2m}°</h2>
      <p>Feels like: {data.current.apparent_temperature}°</p>
      <p>
        Wind: {data.current.wind_speed_10m} {units.wind}
      </p>
    </div>
  );
}
