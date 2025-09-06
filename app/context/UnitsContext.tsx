// app/context/UnitsContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

export type Units = {
  all: "metric" | "imperial" | "mix";
  temp: "celsius" | "fahrenheit";
  wind: "kmh" | "mph";
  precip: "mm" | "inch";
};

type UnitsContextType = {
  units: Units;
  setUnits: (u: Units) => void;
};

const UnitsContext = createContext<UnitsContextType | undefined>(undefined);

export function UnitsProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<Units>({
    all: "metric",
    temp: "celsius",
    wind: "kmh",
    precip: "mm",
  });

  return (
    <UnitsContext.Provider value={{ units, setUnits }}>
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits() {
  const ctx = useContext(UnitsContext);
  if (!ctx) throw new Error("useUnits must be used inside UnitsProvider");
  return ctx;
}
