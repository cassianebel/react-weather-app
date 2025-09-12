import { useEffect, useState, useRef } from "react";
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

const getLocalDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const translateDateName = (dateString: string, format: string = "long") => {
  // Parse manually so there's no timezone conversion
  const [year, month, date] = dateString.split("-").map(Number);
  const localDate = new Date(year, month - 1, date);
  const weekday = localDate.toLocaleDateString("en-US", {
    weekday: format,
  });
  return weekday;
};

export default function Weather({ lat, lon }: { lat: number; lon: number }) {
  const { units } = useUnits();
  const [data, setData] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [place, setPlace] = useState<any>(null);
  const [displayDays, setDisplayDays] = useState(false);
  const [hourlyDate, setHourlyDate] = useState<string>(getLocalDate());
  const [hourlyDay, setHourlyDay] = useState<string>("");
  const listRef = useRef<HTMLUListElement>(null);

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

  useEffect(() => {
    setHourlyDay(translateDateName(hourlyDate));
  }, [hourlyDate]);

  useEffect(() => {
    if (!listRef.current) return;

    const now = new Date();
    const currentHour = now.getHours(); // 0–23

    // Find the <li> with matching hour
    const items = listRef.current.querySelectorAll("li[data-hour]");
    const target = Array.from(items).find(
      (li) => Number(li.getAttribute("data-hour")) === currentHour
    );

    if (target && listRef.current) {
      listRef.current.scrollTop = target.offsetTop;
    }
  }, [data]);

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
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
        <section className="mt-8">
          <h2 className="mb-4 text-lg">Daily forecast</h2>
          <ul className="grid grid-cols-3 md:grid-cols-7 gap-4 text-center">
            {data.daily.time.map((day: string, index: number) => {
              const [weather, icon] = translateWeatherCode(
                data.daily.weather_code[index]
              );
              const max = Math.round(data.daily.temperature_2m_max[index]);
              const min = Math.round(data.daily.temperature_2m_min[index]);
              return (
                <Panel key={day}>
                  <div className="flex flex-col items-center gap-2">
                    <h3>{translateDateName(day, "short")}</h3>
                    <span className="sr-only">{weather}</span>
                    <img
                      src={`./images/${icon}`}
                      alt={`${weather} icon`}
                      className=""
                    />
                    <p className="w-full flex gap-4 items-center justify-between text-sm">
                      <span>
                        <span className="sr-only">High Temp </span>
                        {max}°
                        <span className="sr-only">
                          {units.temp[0].toUpperCase()}
                        </span>
                      </span>
                      <span>
                        <span className="sr-only">Low Temp </span>
                        {min}°
                        <span className="sr-only">
                          {units.temp[0].toUpperCase()}
                        </span>
                      </span>
                    </p>
                  </div>
                </Panel>
              );
            })}
          </ul>
        </section>
      </div>
      <section className="bg-neutral-800 border border-neutral-600 rounded-xl p-4 pe-0 min-h-100">
        <div className="flex items-center justify-between gap-4 relative pe-4">
          <h2 className="text-lg">Hourly forecast</h2>
          <button
            onClick={() => setDisplayDays(!displayDays)}
            className="flex items-center justify-center gap-2 bg-neutral-600 py-2 px-4 rounded-md cursor-pointer"
          >
            {hourlyDay}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="8"
              fill="none"
              viewBox="0 0 13 8"
            >
              <path
                fill="#fff"
                d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"
              />
            </svg>
          </button>
          {displayDays ? (
            <fieldset className="absolute right-0 top-12 min-w-55 border border-neutral-600 bg-neutral-800 p-2 rounded-xl">
              <legend className="sr-only">Hourly Forecast Day</legend>
              {data.daily.time.map((day: string) => {
                return (
                  <div key={day}>
                    <label className="block px-2 py-1 my-1 rounded-lg cursor-pointer hover:bg-neutral-700">
                      <input
                        type="radio"
                        name="day"
                        value={day}
                        checked={day === hourlyDate}
                        onChange={() => setHourlyDate(day)}
                        className="sr-only"
                      />
                      {translateDateName(day)}
                    </label>
                  </div>
                );
              })}
            </fieldset>
          ) : (
            ""
          )}
        </div>
        <ul ref={listRef} className="max-h-140 overflow-y-scroll pe-4 mt-2 ">
          {data.hourly.time.map((hour: string, index: number) => {
            if (hour.startsWith(hourlyDate)) {
              const [weather, icon] = translateWeatherCode(
                data.hourly.weather_code[index]
              );
              const date = new Date(hour);
              const hourRef = date.getHours();
              const label = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                hour12: true,
              });
              const temp = Math.round(data.hourly.temperature_2m[index]);
              return (
                <li
                  key={hour}
                  data-hour={hourRef}
                  className="flex items-center justify-between gap-2 bg-neutral-700 border border-neutral-600 rounded-xl p-2 my-3"
                >
                  <img
                    src={`./images/${icon}`}
                    alt={`${weather} icon`}
                    className="max-w-10"
                  />
                  <span>{label}</span>
                  <span className="ms-auto me-4">
                    {temp}°
                    <span className="sr-only">
                      {units.temp[0].toUpperCase()}
                    </span>
                  </span>
                </li>
              );
            }
          })}
        </ul>
      </section>
    </div>
  );
}
