import { useState, useEffect } from "react";
import { useUnits } from "../context/UnitsContext";
import RadioFieldset from "./RadioFieldset";
import { handleClickOutside } from "~/helperFunctions";

export default function UnitsSelector() {
  const [displayUnits, setDisplayUnits] = useState(false);
  const { units, setUnits } = useUnits();

  // close the units selector if clicking outside of it
  useEffect(() => {
    if (displayUnits) {
      document.addEventListener("mousedown", (event: MouseEvent) =>
        handleClickOutside(event, "settings", setDisplayUnits)
      );
    } else {
      document.removeEventListener("mousedown", (event: MouseEvent) =>
        handleClickOutside(event, "settings", setDisplayUnits)
      );
    }
    return () => {
      document.removeEventListener("mousedown", (event: MouseEvent) =>
        handleClickOutside(event, "settings", setDisplayUnits)
      );
    };
  }, [displayUnits]);

  const toggleUnits = () => {
    return () => {
      if (units.all === "imperial") {
        setUnits({
          all: "metric",
          temp: "celsius",
          wind: "kmh",
          precip: "mm",
        });
      } else {
        setUnits({
          all: "imperial",
          temp: "fahrenheit",
          wind: "mph",
          precip: "inch",
        });
      }
    };
  };

  const unitChangeHandler = () => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setUnits({
        ...units,
        [e.target.name]: e.target.value,
        all: "mix",
      });
    };
  };

  return (
    <div className="relative">
      <button
        aria-controls="settings"
        aria-expanded={displayUnits}
        onClick={() => setDisplayUnits(!displayUnits)}
        className="flex items-center justify-center gap-2 bg-indigo-200 hover:bg-indigo-300 text-indigo-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-50 py-2 px-4 rounded-md cursor-pointer outline-indigo-500 dark:outline-white outline-offset-4 transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M14.125 7.406c.031.407.031.813 0 1.188l1 .594a.74.74 0 0 1 .344.843c-.344 1.313-1.063 2.5-2 3.469-.25.219-.625.281-.906.125l-1-.594c-.25.188-.72.469-1.032.594v1.156a.733.733 0 0 1-.562.719A7.765 7.765 0 0 1 6 15.5c-.313-.063-.563-.406-.563-.719v-1.156a5.54 5.54 0 0 1-1.03-.594l-1 .594c-.282.156-.657.094-.907-.125-.938-.969-1.656-2.156-2-3.469a.74.74 0 0 1 .344-.844l1-.593c-.032-.156-.032-.406-.032-.594 0-.156 0-.406.032-.594l-1-.562A.74.74 0 0 1 .5 6c.344-1.313 1.063-2.5 2-3.469.25-.219.625-.281.906-.125l1 .594c.25-.188.719-.469 1.032-.594V1.25c0-.344.218-.625.562-.719a7.766 7.766 0 0 1 3.969 0c.312.063.562.406.562.719v1.156c.313.125.781.406 1.031.594l1-.594c.282-.156.657-.094.907.125.937.969 1.656 2.156 2 3.469a.74.74 0 0 1-.344.844l-1 .562Zm-1.656 2c.25-1.312.25-1.469 0-2.781l1.375-.781c-.188-.563-.688-1.375-1.063-1.813l-1.375.782c-.969-.844-1.125-.938-2.375-1.375V1.843C8.75 1.812 8.281 1.75 8 1.75c-.313 0-.781.063-1.063.094v1.593c-1.25.438-1.375.532-2.375 1.376L3.188 4.03c-.468.532-.812 1.157-1.062 1.813l1.375.781c-.25 1.313-.25 1.469 0 2.781l-1.375.781c.188.563.688 1.376 1.063 1.813l1.374-.781c.97.844 1.125.937 2.375 1.375v1.594c.282.03.75.093 1.063.093.281 0 .75-.062 1.031-.094v-1.593c1.25-.438 1.375-.531 2.375-1.375l1.375.781c.375-.438.875-1.25 1.063-1.813l-1.375-.78ZM8 5c1.625 0 3 1.375 3 3 0 1.656-1.375 3-3 3a3 3 0 0 1-3-3c0-1.625 1.344-3 3-3Zm0 4.5A1.5 1.5 0 0 0 9.5 8c0-.813-.688-1.5-1.5-1.5A1.5 1.5 0 0 0 6.5 8c0 .844.656 1.5 1.5 1.5Z"
          />
        </svg>
        <span>Units</span>
        <svg
          className="btn-arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="8"
          fill="none"
          viewBox="0 0 13 8"
        >
          <path
            fill="currentColor"
            d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"
          />
        </svg>
      </button>
      {displayUnits ? (
        <div
          id="settings"
          className="absolute right-0 min-w-55 border bg-indigo-200 text-indigo-800 border-indigo-300 dark:border-neutral-600 dark:text-neutral-50 dark:bg-neutral-800 mt-2 rounded-xl z-10 shadow-lg dark:shadow-neutral-900/40"
        >
          <button
            onClick={toggleUnits()}
            className="flex justify-self-stretch text-left box-border px-2 py-1 mx-2 my-2 rounded-lg cursor-pointer hover:bg-indigo-300 dark:hover:bg-neutral-700 outline-indigo-500 dark:outline-white outline-offset-4 transition-colors duration-300"
          >
            {units.all === "imperial"
              ? "Switch to Metric"
              : "Switch to Imperial"}
          </button>
          <RadioFieldset
            legend="Temperature"
            changeHandler={unitChangeHandler()}
            options={[
              {
                name: "temp",
                value: "celsius",
                label: "Celsius (°C)",
                checked: units.temp === "celsius",
              },
              {
                name: "temp",
                value: "fahrenheit",
                label: "Fahrenheit (°F)",
                checked: units.temp === "fahrenheit",
              },
            ]}
          />
          <RadioFieldset
            legend="Wind Speed"
            changeHandler={unitChangeHandler()}
            options={[
              {
                name: "wind",
                value: "kmh",
                label: "km/h",
                checked: units.wind === "kmh",
              },
              {
                name: "wind",
                value: "mph",
                label: "mph",
                checked: units.wind === "mph",
              },
            ]}
          />

          <RadioFieldset
            legend="Percipitation"
            changeHandler={unitChangeHandler()}
            options={[
              {
                name: "precip",
                value: "mm",
                label: "Millimeters (mm)",
                checked: units.precip === "mm",
              },
              {
                name: "precip",
                value: "inch",
                label: "Inches (in)",
                checked: units.precip === "inch",
              },
            ]}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
