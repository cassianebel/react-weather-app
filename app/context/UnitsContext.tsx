import { createContext, useContext, useState, type ReactNode } from "react";

type Units = {
  temp: "Metric" | "Imperial";
};

type UnitsContextType = {
  units: Units;
  setUnits: (u: Units) => void;
};

const UnitsContext = createContext<UnitsContextType | undefined>(undefined);

export function UnitsProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<Units>({ temp: "Imperial" });

  return (
    <UnitsContext.Provider value={{ units, setUnits }}>
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits() {
  const context = useContext(UnitsContext);
  if (!context) {
    throw new Error("useUnits must be used within a UnitsProvider");
  }
  return context;
}
