import { useEffect, useState } from "react";
import Weather from "~/components/Weather";

export default function Index() {
  const [coords, setCoords] = useState<{ lat: number; lon: number }>({
    lat: 51.5074,
    lon: -0.1278,
  });
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="p-4">
      <h1 className="text-5xl font-display font-bold text-center leading-16 mx-[10%] my-4 sm:mx-[20%]">
        How's the sky looking today?
      </h1>
      <Weather lat={coords.lat} lon={coords.lon} />
    </div>
  );
}
