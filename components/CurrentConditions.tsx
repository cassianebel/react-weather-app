import { useState, useEffect, use } from "react";
import { translateWeatherCode } from "../helperFunctions";
import Panel from "./Panel";
import FavoriteButton from "./FavoriteButton";

export default function CurrentConditions({
  place,
  data,
  units,
}: {
  place: {name: string, lat: number, lon: number};
  data: any;
  units: { temp: string; wind: string; precip: string };
}) {
  if (!place) return null;
  const [currentWeather, setCurrentWeather] = useState<any>(
    data && data.current ? translateWeatherCode(data.current.weather_code) : null 
  );
  const [isFavorite, setIsFavorite] = useState(false);

  type FavoriteLocation = { name: string; lat: number; lon: number };

  useEffect(() => {
    setCurrentWeather(translateWeatherCode(data.current.weather_code));
  }, [data]);

  // check if the location is in favorites on initial load
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorite-locations");
    if (storedFavorites) {
      const favorites: FavoriteLocation[] = JSON.parse(storedFavorites);
      setIsFavorite(favorites.some((fav) => fav.name === place.name));
    }
  }, [place]);

  // get today's date
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  function toggleFavorite() {
    const storedFavorites = localStorage.getItem("favorite-locations");
    let favorites: FavoriteLocation[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];

    const exists = favorites.some((fav) => fav.name === place.name);

    if (exists) {
      favorites = favorites.filter((fav) => fav.name !== place.name);
      setIsFavorite(false);
    } else {
      favorites.push({ name: place.name, lat: place.lat, lon: place.lon });
      setIsFavorite(true);
    }

    localStorage.setItem("favorite-locations", JSON.stringify(favorites));
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between text-center md:text-left rounded-2xl p-9 px-12 text-white bg-indigo-700 dark:bg-blue-700 bg-[url(/images/bg-today-small.svg)] md:bg-[url(/images/bg-today-large.svg)] bg-no-repeat bg-bottom bg-cover bg-blend-screen dark:bg-blend-normal">
        <div>
          <h2 className="text-2xl font-semibold mb-2 relative">
            <span className="sr-only">Current Conditions for</span> {place.name}
            <FavoriteButton
              place={place}
            />
          </h2>
          <p className="text-indigo-100 dark:text-neutral-200">
            {formattedDate}
          </p>
        </div>
        <p className="flex items-center justify-center gap-4">
          <span className="sr-only">{currentWeather[0]}</span>
          <img
            src={`/images/${currentWeather[1]}`}
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
            <h3 className="text-indigo-900 dark:text-neutral-200 mb-4">
              Feels Like
            </h3>
            <p className="text-3xl font-light">
              {Math.round(data.current.apparent_temperature)}°
              <span className="sr-only">{units.temp[0].toUpperCase()}</span>
            </p>
          </div>
        </Panel>
        <Panel>
          <div className="p-2">
            <h3 className="text-indigo-900 dark:text-neutral-200 mb-4">
              Humidity
            </h3>
            <p className="text-3xl font-light">
              {Math.round(data.current.relative_humidity_2m)}%
            </p>
          </div>
        </Panel>
        <Panel>
          <div className="p-2">
            <h3 className="text-indigo-900 dark:text-neutral-200 mb-4">Wind</h3>
            <p className="text-3xl font-light">
              {Math.round(data.current.wind_speed_10m)} {units.wind}
            </p>
          </div>
        </Panel>
        <Panel>
          <div className="p-2">
            <h3 className="text-indigo-900 dark:text-neutral-200 mb-4">
              Precipitation
            </h3>
            <p className="text-3xl font-light">
              {data.current.precipitation} {units.precip}
            </p>
          </div>
        </Panel>
      </ul>
    </section>
  );
}
