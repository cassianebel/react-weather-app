import { useEffect, useState, useRef } from "react";
import { useUnits } from "../context/UnitsContext";
import { buildForecastUrl, buildReverseGeocodeURL } from "../helperFunctions";
import CurrentConditions from "./CurrentConditions";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import Skeleton from "./Skeleton";

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

export default function Weather({
  lat,
  lon,
  data,
}: {
  lat: number;
  lon: number;
  data: any;
}) {
  const { units } = useUnits();
  // const [data, setData] = useState<any>(null);
  const [place, setPlace] = useState<any>(null);

  // // get the weather data
  // useEffect(() => {
  //   async function fetchWeather() {
  //     const url = buildForecastUrl(lat, lon, units);
  //     try {
  //       //const res = await fetch(url);
  //       const res = await fetch("/api/fail");

  //       if (!res.ok) {
  //         console.error(`HTTP error! status: ${res.status}`);
  //         setError("Unable to load weather. Please try again later.");
  //         return;
  //       }

  //       const json = await res.json();
  //       setData(json);
  //       console.log(json);
  //     } catch (err) {
  //       console.error(`Weather fetch failed: ${err}`);
  //       setError("Unable to load weather. Please try again later.");
  //     }
  //   }
  //   fetchWeather();
  // }, [lat, lon, units]);

  // get the location
  useEffect(() => {
    async function fetchCity() {
      const url = buildReverseGeocodeURL(lat, lon);
      const res = await fetch(url);
      const data: NominatimResponse = await res.json();
      const address = data.address;
      const name = formatLocation(address);
      setPlace({ name: name, lat: lat, lon: lon });
    }
    fetchCity();
  }, [lat, lon]);

  if (!data) {
    return <Skeleton />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CurrentConditions place={place} data={data} units={units} />
        <DailyForecast data={data} units={units} />
      </div>
      <HourlyForecast data={data} units={units} />
    </div>
  );
}
