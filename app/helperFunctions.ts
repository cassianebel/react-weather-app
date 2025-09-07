import type { Units } from "./context/UnitsContext";

export function buildForecastUrl(lat: number, lon: number, units: Units) {
  const base = "https://api.open-meteo.com/v1/forecast";

  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current:
      "temperature_2m,apparent_temperature,precipitation,weather_code,relative_humidity_2m,wind_speed_10m",
    hourly:
      "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
    temperature_unit: units.temp,
    windspeed_unit: units.wind,
    precipitation_unit: units.precip,
    timezone: "auto",
  });

  return `${base}?${params.toString()}`;
}

export function buildReverseGeocodeURL(lat: number, lon: number) {
  const base = "https://nominatim.openstreetmap.org/reverse";

  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    format: "json",
  });

  return `${base}?${params.toString()}`;
}
