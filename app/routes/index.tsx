import { useUnits } from "../context/UnitsContext";

export default function Index() {
  const { units } = useUnits();

  return (
    <div className="p-4">
      <h1 className="text-5xl font-display font-bold text-center leading-16 mx-[10%] my-4 sm:mx-[20%]">
        How's the sky looking today?
      </h1>
      <p className="text-white">Currently showing units in {units.temp}</p>
    </div>
  );
}
