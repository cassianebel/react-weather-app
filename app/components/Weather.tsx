import { useEffect, useState } from "react";
import { useUnits } from "../context/UnitsContext";
import {
  buildForecastUrl,
  buildReverseGeocodeURL,
  translateWeatherCode,
} from "../helperFunctions";
import Panel from "./Panel";

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
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [place, setPlace] = useState<any>(null);

  useEffect(() => {
    async function fetchWeather() {
      const url = buildForecastUrl(lat, lon, units);
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      setCurrentWeather(translateWeatherCode(json.current.weather_code));
      console.log(json);
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

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  if (!data) return <p>Loading weather…</p>;

  return (
    <div>
      <section>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between text-center md:text-left rounded-2xl p-9 bg-blue-700 bg-[url(../images/bg-today-small.svg)] md:bg-[url(../images/bg-today-large.svg)] bg-no-repeat bg-bottom bg-cover">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              <span className="sr-only">Current Conditions for</span> {place}
            </h2>
            <p className="text-neutral-200">{formattedDate}</p>
          </div>
          <p className="flex items-center justify-center gap-4">
            <span className="sr-only">{currentWeather[0]}</span>
            <img
              src={`./images/${currentWeather[1]}`}
              alt={`${currentWeather[0]} icon`}
              className="max-w-[50%]"
            />
            <strong className="font-bold text-7xl italic">
              {Math.round(data.current.temperature_2m)}°
              <span className="sr-only">{units.temp[0].toUpperCase()}</span>
            </strong>
          </p>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
          <Panel>
            <div className="p-2">
              <h3 className="text-neutral-200 mb-4">Feels Like</h3>
              <p className="text-3xl font-light">
                {Math.round(data.current.apparent_temperature)}°
                <span className="sr-only">{units.temp[0].toUpperCase()}</span>
              </p>
            </div>
          </Panel>
          <Panel>
            <div className="p-2">
              <h3 className="text-neutral-200 mb-4">Humidity</h3>
              <p className="text-3xl font-light">
                {Math.round(data.current.relative_humidity_2m)}%
              </p>
            </div>
          </Panel>
          <Panel>
            <div className="p-2">
              <h3 className="text-neutral-200 mb-4">Wind</h3>
              <p className="text-3xl font-light">
                {Math.round(data.current.wind_speed_10m)} {units.wind}
              </p>
            </div>
          </Panel>
          <Panel>
            <div className="p-2">
              <h3 className="text-neutral-200 mb-4">Precipitation</h3>
              <p className="text-3xl font-light">
                {data.current.precipitation} {units.precip}
              </p>
            </div>
          </Panel>
        </ul>
      </section>
      <section>
        <h2 className="mt-8 mb-4 text-lg">Daily forecast</h2>
        <ul className="grid grid-cols-3 md:grid-cols-7 gap-4 text-center">
          {data.daily.time.map((day: string, index: number) => {
            const date = new Date(day);
            const options: Intl.DateTimeFormatOptions = { weekday: "short" };
            const shortWeekday = date.toLocaleDateString("en-US", options);
            const [weather, icon] = translateWeatherCode(
              data.daily.weather_code[index]
            );
            const max = Math.round(data.daily.temperature_2m_max[index]);
            const min = Math.round(data.daily.temperature_2m_min[index]);
            return (
              <Panel key={shortWeekday}>
                <div className="flex flex-col items-center gap-2">
                  <h3>{shortWeekday}</h3>
                  <span className="sr-only">{weather}</span>
                  <img
                    src={`./images/${icon}`}
                    alt={`${weather} icon`}
                    className=""
                  />
                  <p className="w-full flex gap-4 items-center justify-between text-sm">
                    <span>
                      <span className="sr-only">High Temp </span>
                      {max}
                    </span>
                    <span>
                      <span className="sr-only">Low Temp </span>
                      {min}
                    </span>
                  </p>
                </div>
              </Panel>
            );
          })}
        </ul>
      </section>
      <section className="bg-neutral-800 border border-neutral-600 rounded-xl p-4">
        <h2 className="text-lg">Hourly forecast</h2>
      </section>
    </div>
  );
}
