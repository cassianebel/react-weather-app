import { useEffect, useState } from "react";
import Weather from "~/components/Weather";
import { handleClickOutside } from "~/helperFunctions";

interface Suggestion {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export default function Index() {
  const [coords, setCoords] = useState<{ lat: number; lon: number }>({
    lat: 51.5074,
    lon: -0.1278,
  });
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  // get user's location on initial load
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    const success = (position: GeolocationPosition) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };
    const fail = (err: GeolocationPositionError) => {
      setError(err.message);
    };
    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  // fetch search suggestions as the query changes
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );
      const data = await res.json();
      setSuggestions(data.results || []);
      setDisplaySuggestions(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  // close the search suggestions selector if clicking outside of it
  useEffect(() => {
    if (displaySuggestions) {
      document.addEventListener("mousedown", (event: MouseEvent) => {
        handleClickOutside(event, "suggestions-listbox", setDisplaySuggestions);
      });
    } else {
      document.removeEventListener("mousedown", (event: MouseEvent) => {
        handleClickOutside(event, "suggestions-listbox", setDisplaySuggestions);
      });
    }
    return () => {
      document.removeEventListener("mousedown", (event: MouseEvent) => {
        handleClickOutside(event, "suggestions-listbox", setDisplaySuggestions);
      });
    };
  }, [displaySuggestions]);

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    if (!suggestions.length) {
      setError("Please select a valid city from the suggestions.");
      return;
    }
    const first = suggestions[0];
    setCoords({ lat: first.latitude, lon: first.longitude });
    setQuery(`${first.name}, ${first.admin1 || first.country}`);
    setSuggestions([]);
    setDisplaySuggestions(false);
  }

  return (
    <div className="p-4">
      <h1 className="text-5xl font-display font-bold text-center leading-16 mx-[10%] my-4 sm:mx-[20%]">
        How's the sky looking today?
      </h1>
      <form
        className="flex flex-col md:flex-row gap-3 my-8 max-w-xl mx-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="relative block w-full">
          <input
            type="text"
            name="search"
            aria-label="search for a location"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-neutral-800 rounded-xl p-3 ps-16 text-lg placeholder:text-neutral-200 block w-full bg-[url(../images/icon-search.svg)] bg-no-repeat bg-[1.5rem] outline-white outline-offset-4"
            role="combobox"
            aria-autocomplete="list"
            aria-controls="suggestions-listbox"
            aria-expanded={displaySuggestions}
          />

          {displaySuggestions && suggestions.length > 0 && (
            <div
              id="suggestions-listbox"
              role="listbox"
              className="absolute mt-3 p-3 bg-neutral-800 rounded-xl w-full min-h-40"
            >
              {suggestions.map((suggestion) => (
                <button
                  key={`${suggestion.latitude}-${suggestion.longitude}`}
                  role="option"
                  aria-selected="false"
                  onClick={() => {
                    setCoords({
                      lat: suggestion.latitude,
                      lon: suggestion.longitude,
                    });
                    setQuery(
                      `${suggestion.name}, ${suggestion.admin1 || suggestion.country}`
                    );
                    setDisplaySuggestions(false);
                    setSuggestions([]);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg border border-transparent hover:bg-neutral-700 hover:border-neutral-600 focus:bg-neutral-700 cursor-pointer outline-white outline-offset-4"
                >
                  {suggestion.name}, {suggestion.admin1 || suggestion.country}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-800 outline-blue-500 outline-offset-4 transition-colors duration-300 cursor-pointer rounded-xl p-3 px-6 block w-full md:w-auto text-lg"
        >
          Search
        </button>
      </form>
      <Weather lat={coords.lat} lon={coords.lon} />
    </div>
  );
}
