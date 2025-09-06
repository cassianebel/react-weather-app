import { useUnits } from "../context/UnitsContext";

export default function Index() {
  const { units } = useUnits();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-display font-extrabold">
        How's the sky looking today?
      </h1>
      <p className="text-white">Currently showing units in {units.temp}</p>
    </div>
  );
}
