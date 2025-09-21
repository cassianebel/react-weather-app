import { translateWeatherCode, translateDateName } from "../helperFunctions";
import Panel from "./Panel";

export default function DailyForecast({
  data,
  units,
}: {
  data: any;
  units: { temp: string; wind: string; precip: string };
}) {
  return (
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
                <h3>
                  <span aria-hidden>{translateDateName(day, "short")}</span>
                  <span className="sr-only">
                    {translateDateName(day, "long")}
                  </span>
                </h3>
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
  );
}
