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

export function handleClickOutside(
  event: MouseEvent,
  divId: String,
  displayMenuHandler: Function
) {
  const target = event.target as HTMLElement;
  if (
    !target.closest(`#${divId}`) &&
    !target.closest(`button[aria-controls='${divId}']`)
  ) {
    displayMenuHandler(false);
  }
}

export function translateWeatherCode(code: number): [string, string] {
  const weatherCodes: { [key: number]: [string, string] } = {
    0: ["Clear sky", "icon-sunny.webp"],
    1: ["Mainly clear", "icon-sunny.webp"],
    2: ["Partly cloudy", "icon-partly-cloudy.webp"],
    3: ["Overcast", "icon-overcast.webp"],
    45: ["Fog", "icon-fog.webp"],
    48: ["Depositing rime fog", "icon-fog.webp"],
    51: ["Light drizzle", "icon-drizzle.webp"],
    53: ["Moderate drizzle", "icon-drizzle.webp"],
    55: ["Dense drizzle", "icon-drizzle.webp"],
    56: ["Light freezing drizzle", "icon-drizzle.webp"],
    57: ["Dense freezing drizzle", "icon-drizzle.webp"],
    61: ["Slight rain", "icon-rain.webp"],
    63: ["Moderate rain", "icon-rain.webp"],
    65: ["Heavy rain", "icon-rain.webp"],
    66: ["Light freezing rain", "icon-rain.webp"],
    67: ["Heavy freezing rain", "icon-rain.webp"],
    71: ["Slight snow fall", "icon-snow.webp"],
    73: ["Moderate snow fall", "icon-snow.webp"],
    75: ["Heavy snow fall", "icon-snow.webp"],
    77: ["Snow grains", "icon-snow.webp"],
    80: ["Slight rain showers", "icon-rain.webp"],
    81: ["Moderate rain showers", "icon-rain.webp"],
    82: ["Violent rain showers", "icon-rain.webp"],
    85: ["Slight snow showers", "icon-snow.webp"],
    86: ["Heavy snow showers", "icon-snow.webp"],
    95: ["Slight or moderate thunderstorm", "icon-storm.webp"],
    96: ["Slight hail thunderstorm", "icon-storm.webp"],
    99: ["Heavy hail thunderstorm", "icon-storm.webp"],
  };
  return weatherCodes[code] || "Unknown";
}
