import { useEffect, useState, useRef } from "react";
import {
  translateWeatherCode,
  translateDateName,
  handleClickOutside,
} from "../helperFunctions";

const getLocalDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function DailyForecast({
  data,
  units,
}: {
  data: any;
  units: { temp: string; wind: string; precip: string };
}) {
  const [displayDays, setDisplayDays] = useState(false);
  const [hourlyDate, setHourlyDate] = useState<string>(getLocalDate());
  const [hourlyDay, setHourlyDay] = useState<string>("");
  const listRef = useRef<HTMLUListElement>(null);

  // set the day for the hourly forecast
  useEffect(() => {
    setHourlyDay(translateDateName(hourlyDate));
  }, [hourlyDate]);

  // scroll the hourly forecast to the current hour
  useEffect(() => {
    if (!listRef.current) return;

    const now = new Date();
    const currentHour = now.getHours();

    const items = listRef.current.querySelectorAll("li[data-hour]");
    const target = Array.from(items).find(
      (li) => Number(li.getAttribute("data-hour")) === currentHour
    );

    if (target && listRef.current) {
      const containerTop = listRef.current.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      const scrollOffset = targetTop - containerTop;

      listRef.current.scrollTo({
        top: listRef.current.scrollTop + scrollOffset,
        behavior: "smooth",
      });
    }
  }, [data]);

  // close the day selector if clicking outside of it
  useEffect(() => {
    if (displayDays) {
      document.addEventListener("mousedown", (event: MouseEvent) =>
        handleClickOutside(event, "day-picker", setDisplayDays)
      );
    } else {
      document.removeEventListener("mousedown", (event: MouseEvent) =>
        handleClickOutside(event, "day-picker", setDisplayDays)
      );
    }
    return () => {
      document.removeEventListener("mousedown", (event: MouseEvent) =>
        handleClickOutside(event, "day-picker", setDisplayDays)
      );
    };
  }, [displayDays]);

  return (
    <section className="bg-neutral-800 border border-neutral-600 rounded-xl p-4 pe-0 min-h-full">
      <div className="flex items-center justify-between gap-4 relative pe-4">
        <h2 className="text-lg">Hourly forecast</h2>
        <button
          aria-controls="day-picker"
          aria-expanded={displayDays}
          onClick={() => setDisplayDays(!displayDays)}
          className="flex items-center justify-center gap-2 bg-neutral-600 py-2 px-4 rounded-md cursor-pointer outline-white outline-offset-4"
        >
          {hourlyDay}
          <svg
            className="btn-arrow"
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
          <fieldset
            id="day-picker"
            className="absolute right-0 top-12 min-w-55 border border-neutral-600 bg-neutral-800 p-2 rounded-xl outline-white outline-offset-4 focus-within:outline-2 shadow-lg shadow-neutral-900/40"
          >
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
      <ul
        ref={listRef}
        className="max-h-137 overflow-y-scroll pe-4 mt-2 outline-white outline-offset-4 rounded-xl"
      >
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
                  <span className="sr-only">{units.temp[0].toUpperCase()}</span>
                </span>
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
}
